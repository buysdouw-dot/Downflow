#!/usr/bin/env python3
"""
Extract audio from each 6-sec clip → transcribe with Vosk → burn SRT subtitles back onto video.
Outputs subtitled videos to /web/public/sponsor/videos/subtitled/
"""
import os, json, subprocess, wave, struct
from vosk import Model, KaldiRecognizer, SetLogLevel

SetLogLevel(-1)

VIDEOS_DIR = "/home/user/app/web/public/sponsor/videos"
OUT_DIR    = f"{VIDEOS_DIR}/subtitled"
MODEL_DIR  = "/home/user/app/vosk-model/vosk-model-small-en-us-0.15"
FONT       = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

os.makedirs(OUT_DIR, exist_ok=True)

model = Model(MODEL_DIR)

def extract_audio_pcm(video_path):
    """Extract mono 16kHz PCM wav from video."""
    wav_path = video_path.replace(".mp4", "_audio.wav")
    subprocess.run([
        "ffmpeg", "-y", "-i", video_path,
        "-ac", "1", "-ar", "16000",
        "-vn", wav_path
    ], capture_output=True, check=True)
    return wav_path

def transcribe(wav_path, duration):
    """Run Vosk on wav, return list of {start, end, text} word segments."""
    rec = KaldiRecognizer(model, 16000)
    rec.SetWords(True)

    words = []
    with wave.open(wav_path, "rb") as wf:
        while True:
            data = wf.readframes(4000)
            if not data:
                break
            if rec.AcceptWaveform(data):
                res = json.loads(rec.Result())
                if "result" in res:
                    words.extend(res["result"])
    res = json.loads(rec.FinalResult())
    if "result" in res:
        words.extend(res["result"])

    os.remove(wav_path)
    return words

def words_to_subtitle_lines(words, max_chars=32, max_gap=0.4):
    """Group words into subtitle lines by character count and pause gaps."""
    if not words:
        return []

    lines = []
    cur_words = []
    cur_start = None

    for i, w in enumerate(words):
        text = w.get("word", "")
        start = w.get("start", 0)
        end   = w.get("end",   0)

        if cur_start is None:
            cur_start = start
        cur_words.append(text)

        # Check if we should break
        joined = " ".join(cur_words)
        is_last = i == len(words) - 1
        next_gap = (words[i+1]["start"] - end) > max_gap if not is_last else False
        too_long = len(joined) > max_chars

        if is_last or next_gap or too_long:
            lines.append({
                "start": cur_start,
                "end":   end,
                "text":  " ".join(cur_words).upper()
            })
            cur_words = []
            cur_start = None

    return lines

def secs_to_ts(s):
    h = int(s // 3600)
    m = int((s % 3600) // 60)
    sec = s % 60
    return f"{h:02d}:{m:02d}:{sec:06.3f}".replace(".", ",")

def write_srt(lines, srt_path):
    with open(srt_path, "w") as f:
        for i, line in enumerate(lines, 1):
            f.write(f"{i}\n")
            f.write(f"{secs_to_ts(line['start'])} --> {secs_to_ts(line['end'])}\n")
            f.write(f"{line['text']}\n\n")

def burn_subtitles(video_path, srt_path, out_path):
    """Burn subtitles onto video using ffmpeg drawtext via subtitles filter."""
    # Use ASS subtitles via subtitles filter for styled rendering
    subprocess.run([
        "ffmpeg", "-y", "-i", video_path,
        "-vf", (
            f"subtitles={srt_path}:force_style='"
            "FontName=DejaVu Sans Bold,"
            "FontSize=14,"
            "PrimaryColour=&H00FFFFFF,"
            "OutlineColour=&H00000000,"
            "BackColour=&H80000000,"
            "Bold=1,"
            "Outline=2,"
            "Shadow=1,"
            "Alignment=2,"       # bottom-center
            "MarginV=20"
            "'"
        ),
        "-c:v", "libx264", "-preset", "fast", "-crf", "20",
        "-c:a", "aac", "-b:a", "128k",
        out_path
    ], capture_output=True)

# ── Main loop ──────────────────────────────────────────────────────────────────
results = []
for i in range(1, 21):
    vid_id = f"vid-{i:02d}"
    vid_path = f"{VIDEOS_DIR}/{vid_id}.mp4"
    srt_path = f"{OUT_DIR}/{vid_id}.srt"
    out_path = f"{OUT_DIR}/{vid_id}_sub.mp4"

    if not os.path.exists(vid_path):
        print(f"  SKIP {vid_id} — not found")
        continue

    print(f"[{i:02d}/20] {vid_id} ...", end=" ", flush=True)

    try:
        # 1. Extract audio
        wav = extract_audio_pcm(vid_path)

        # 2. Get duration
        dur_result = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration",
             "-of", "csv=p=0", vid_path],
            capture_output=True, text=True
        )
        duration = float(dur_result.stdout.strip())

        # 3. Transcribe
        words = transcribe(wav, duration)

        if not words:
            print(f"NO SPEECH DETECTED — skipping subtitle burn")
            # Copy original unchanged
            import shutil; shutil.copy(vid_path, out_path)
            results.append({"id": vid_id, "text": "[no speech]", "lines": 0})
            continue

        full_text = " ".join(w["word"] for w in words)
        print(f'"{full_text[:60]}{"..." if len(full_text)>60 else ""}"', end=" ")

        # 4. Build subtitle lines
        lines = words_to_subtitle_lines(words)
        write_srt(lines, srt_path)

        # 5. Burn
        burn_subtitles(vid_path, srt_path, out_path)
        print(f"→ {len(lines)} subtitle(s) ✓")

        results.append({"id": vid_id, "text": full_text, "lines": len(lines)})

    except Exception as e:
        print(f"ERROR: {e}")
        results.append({"id": vid_id, "text": f"ERROR: {e}", "lines": 0})

# Save transcript summary
with open(f"{OUT_DIR}/transcripts.json", "w") as f:
    json.dump(results, f, indent=2)

print(f"\n✓ Done. Subtitled videos in: {OUT_DIR}")
print(f"  Transcripts saved to: {OUT_DIR}/transcripts.json")

# Print summary
print("\n─── TRANSCRIPT SUMMARY ───")
for r in results:
    print(f"  {r['id']}: {r['lines']} sub(s) — {r['text'][:80]}")
