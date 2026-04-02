#!/usr/bin/env python3
"""
Burn narration/presentation script text onto each 6-sec clip as styled subtitles.
Maps 20 clips → 10 scenes (from the DOWNFLOW model breakdown).
Output: /web/public/sponsor/videos/narrated/vid-XX_narrated.mp4
"""
import os, subprocess

VIDEOS_DIR = "/home/user/app/web/public/sponsor/videos"
OUT_DIR    = f"{VIDEOS_DIR}/narrated"
FONT_B     = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_R     = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

os.makedirs(OUT_DIR, exist_ok=True)

# ── Scene-by-scene narration mapping ──────────────────────────────────────────
# Each entry: (vid_id, scene_label, line1, line2_or_None)
# Text is split across 2 lines max to fit the portrait frame (464 wide)
CLIPS = [
    # SCENE 1 — HOOK
    ("vid-01", "SCENE 1 · HOOK",
     "Education doesn't fail",
     "because of students…"),
    ("vid-02", "SCENE 1 · HOOK",
     "Education doesn't fail",
     "because of students…"),

    # SCENE 2 — PROBLEM
    ("vid-03", "SCENE 2 · PROBLEM",
     "It fails because",
     "value doesn't flow."),
    ("vid-04", "SCENE 2 · PROBLEM",
     "It fails because",
     "value doesn't flow."),

    # SCENE 3 — THE SHIFT
    ("vid-05", "SCENE 3 · THE SHIFT",
     "So we redesigned the system.",
     None),
    ("vid-06", "SCENE 3 · THE SHIFT",
     "Students don't consume learning —",
     "they produce value."),

    # SCENE 4 — THE CELL MODEL
    ("vid-07", "SCENE 4 · THE CELL",
     "Small learning cells.",
     None),
    ("vid-08", "SCENE 4 · THE CELL",
     "High engagement.",
     "Real output."),

    # SCENE 5 — SPONSOR ENTRY
    ("vid-09", "SCENE 5 · SPONSOR",
     "A sponsor activates one cell —",
     None),
    ("vid-10", "SCENE 5 · SPONSOR",
     "Fully visible.",
     "Fully measurable."),

    # SCENE 6 — THE GUIDER SYSTEM (4 clips — longer scene)
    ("vid-11", "SCENE 6 · GUIDER SYSTEM",
     "Then the system compounds.",
     None),
    ("vid-12", "SCENE 6 · GUIDER SYSTEM",
     "A student who completes",
     "becomes a guider."),
    ("vid-13", "SCENE 6 · GUIDER SYSTEM",
     "Their results are tied to",
     "the students below them."),
    ("vid-14", "SCENE 6 · GUIDER SYSTEM",
     "Students are no longer just learners.",
     "They are responsible for outcomes."),

    # SCENE 7 — ACCOUNTABILITY LOOP
    ("vid-15", "SCENE 7 · ACCOUNTABILITY",
     "Every layer",
     "influences the next."),
    ("vid-16", "SCENE 7 · ACCOUNTABILITY",
     "Every result",
     "flows back up."),

    # SCENE 8 — COINS / VALUE SYSTEM
    ("vid-17", "SCENE 8 · VALUE SYSTEM",
     "Performance is shared.",
     "Cells are graded together."),
    ("vid-18", "SCENE 8 · VALUE SYSTEM",
     "Value is distributed.",
     "Effort becomes visible."),

    # SCENE 9 — COMPOUNDING
    ("vid-19", "SCENE 9 · COMPOUNDING",
     "One cell becomes many.",
     "Without losing structure."),

    # SCENE 10 — CLOSE
    ("vid-20", "SCENE 10 · CLOSE",
     "Fund one cell.",
     "Watch it grow."),
]

def build_filter(line1, line2, scene_label, w=464, h=688):
    """
    Build an ffmpeg filtergraph that draws:
      - Scene label (top strip, small, gold)
      - Line 1 (big white bold, bottom area)
      - Line 2 (if present, just below line 1)
    All with dark semi-transparent background boxes.
    """
    esc = lambda s: s.replace("'", "\u2019").replace(":", r"\:")

    parts = []

    # ── Scene label strip (top) ──
    parts.append(
        f"drawtext="
        f"fontfile={FONT_R}:"
        f"text='{esc(scene_label)}':"
        f"fontsize=13:"
        f"fontcolor=0xd2ad44:"
        f"x=(w-text_w)/2:"
        f"y=16:"
        f"box=1:boxcolor=0x00000088:boxborderw=8"
    )

    # ── Line 1 (main narration) ──
    y1 = h - 90 if line2 else h - 70
    parts.append(
        f"drawtext="
        f"fontfile={FONT_B}:"
        f"text='{esc(line1)}':"
        f"fontsize=22:"
        f"fontcolor=white:"
        f"x=(w-text_w)/2:"
        f"y={y1}:"
        f"box=1:boxcolor=0x00000099:boxborderw=10:"
        f"shadowcolor=0x000000CC:shadowx=2:shadowy=2"
    )

    # ── Line 2 (if present) ──
    if line2:
        y2 = y1 + 36
        parts.append(
            f"drawtext="
            f"fontfile={FONT_B}:"
            f"text='{esc(line2)}':"
            f"fontsize=22:"
            f"fontcolor=white:"
            f"x=(w-text_w)/2:"
            f"y={y2}:"
            f"box=1:boxcolor=0x00000099:boxborderw=10:"
            f"shadowcolor=0x000000CC:shadowx=2:shadowy=2"
        )

    return ",".join(parts)


results = []
for vid_id, scene_label, line1, line2 in CLIPS:
    in_path  = f"{VIDEOS_DIR}/{vid_id}.mp4"
    out_path = f"{OUT_DIR}/{vid_id}_narrated.mp4"

    if not os.path.exists(in_path):
        print(f"  SKIP {vid_id} — not found")
        continue

    print(f"  {vid_id}  [{scene_label}]  \"{line1}{'  /  ' + line2 if line2 else ''}\" ...", end=" ", flush=True)

    vf = build_filter(line1, line2, scene_label)

    result = subprocess.run([
        "ffmpeg", "-y", "-i", in_path,
        "-vf", vf,
        "-c:v", "libx264", "-preset", "fast", "-crf", "20",
        "-c:a", "aac", "-b:a", "128k",
        out_path
    ], capture_output=True, text=True)

    if result.returncode == 0:
        print("✓")
        results.append({"id": vid_id, "scene": scene_label, "line1": line1, "line2": line2 or ""})
    else:
        print(f"ERROR")
        # Show last few lines of stderr for debugging
        print("  " + "\n  ".join(result.stderr.strip().split("\n")[-4:]))
        results.append({"id": vid_id, "scene": scene_label, "error": True})

print(f"\n✓ Done. {len([r for r in results if 'error' not in r])}/20 narrated videos in: {OUT_DIR}")
