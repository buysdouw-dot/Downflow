import { useState, useRef } from 'react'
import { storage, storageRef, uploadBytesResumable, getDownloadURL, isConfigured } from '../services/firebase.js'
import { submitVideoReview } from '../services/api.js'
import { notifyFacilitatorVideoSubmitted } from '../services/email.js'
import { useAuth } from '../context/AuthContext.jsx'

// VideoUpload — used in StudentDashboard and SessionRecordings
// Props:
//   cellId      — the cell this video belongs to
//   packName    — name of the pack being submitted for
//   weekNum     — session/week number
//   onSuccess   — callback(videoRecord) after upload + Firestore write
//   onClose     — callback to close/dismiss the modal

export default function VideoUpload({ cellId, packName, weekNum, onSuccess, onClose }) {
  const { uid, displayName } = useAuth()
  const [file,      setFile]      = useState(null)
  const [progress,  setProgress]  = useState(0)
  const [status,    setStatus]    = useState('idle') // idle | uploading | saving | done | error
  const [errorMsg,  setErrorMsg]  = useState('')
  const [previewUrl, setPreviewUrl] = useState(null)
  const inputRef = useRef()

  function handleFileChange(e) {
    const f = e.target.files[0]
    if (!f) return
    if (!f.type.startsWith('video/')) {
      setErrorMsg('Please select a video file (mp4, mov, webm, etc.)')
      return
    }
    if (f.size > 500 * 1024 * 1024) {
      setErrorMsg('File must be under 500 MB.')
      return
    }
    setErrorMsg('')
    setFile(f)
    setPreviewUrl(URL.createObjectURL(f))
  }

  async function handleUpload() {
    if (!file) return
    setStatus('uploading')
    setErrorMsg('')

    let downloadURL = null

    if (isConfigured && storage) {
      try {
        const path = `videos/${cellId}/${uid}/week${weekNum}_${Date.now()}_${file.name}`
        const ref  = storageRef(storage, path)
        const task = uploadBytesResumable(ref, file)

        await new Promise((resolve, reject) => {
          task.on('state_changed',
            snap => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
            reject,
            async () => {
              downloadURL = await getDownloadURL(task.snapshot.ref)
              resolve()
            }
          )
        })
      } catch (e) {
        setStatus('error')
        setErrorMsg('Upload failed: ' + e.message)
        return
      }
    } else {
      // Demo mode — simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i)
        await new Promise(r => setTimeout(r, 80))
      }
      downloadURL = previewUrl
    }

    setStatus('saving')
    try {
      const record = await submitVideoReview({
        cellId,
        studentId: uid,
        studentName: displayName,
        week: weekNum,
        pack: packName,
        duration: 0,
        videoUrl: downloadURL,
      })
      setStatus('done')
      // Fire-and-forget email to facilitator
      notifyFacilitatorVideoSubmitted({
        facilitatorEmail: 'facilitator@downflow.app',
        facilitatorName: 'Facilitator',
        studentName: displayName,
        packName,
        weekNum,
        cellId,
      }).catch(() => {})
      if (onSuccess) onSuccess(record)
    } catch (e) {
      setStatus('error')
      setErrorMsg('Saved video but failed to record submission: ' + e.message)
    }
  }

  return (
    <div className="vupload-overlay" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className="vupload-modal">
        <button className="vupload-close" onClick={onClose}>✕</button>
        <h2 className="vupload-title">Submit Video Evidence</h2>
        <p className="vupload-sub">
          {packName && <><strong>{packName}</strong> · </>}
          {weekNum  && <>Week {weekNum}</>}
        </p>

        {status === 'done' ? (
          <div className="vupload-success">
            <div className="vupload-success-icon">✓</div>
            <p>Video submitted successfully!</p>
            <p className="vupload-success-sub">Your facilitator will review it shortly.</p>
            <button className="vupload-btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            {/* Drop zone */}
            <div
              className={`vupload-dropzone ${file ? 'has-file' : ''}`}
              onClick={() => inputRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) { inputRef.current.files = e.dataTransfer.files; handleFileChange({ target: e.dataTransfer }) } }}
            >
              {previewUrl ? (
                <video className="vupload-preview" src={previewUrl} controls />
              ) : (
                <>
                  <div className="vupload-drop-icon">🎬</div>
                  <p className="vupload-drop-text">Click or drag a video file here</p>
                  <p className="vupload-drop-sub">MP4, MOV, WEBM · max 500 MB</p>
                </>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>

            {file && (
              <p className="vupload-filename">
                {file.name} · {(file.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            )}

            {errorMsg && <p className="vupload-error">{errorMsg}</p>}

            {(status === 'uploading' || status === 'saving') && (
              <div className="vupload-progress-wrap">
                <div className="vupload-progress-bar">
                  <div className="vupload-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <p className="vupload-progress-label">
                  {status === 'uploading' ? `Uploading… ${progress}%` : 'Saving submission…'}
                </p>
              </div>
            )}

            <div className="vupload-actions">
              <button className="vupload-btn-secondary" onClick={onClose} disabled={status !== 'idle'}>
                Cancel
              </button>
              <button
                className="vupload-btn-primary"
                onClick={handleUpload}
                disabled={!file || status !== 'idle'}
              >
                {status === 'idle' ? 'Submit Video →' : status === 'uploading' ? 'Uploading…' : 'Saving…'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
