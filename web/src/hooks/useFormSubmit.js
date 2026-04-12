/**
 * useFormSubmit — thin wrapper around EmailJS
 *
 * Usage:
 *   const { send, status } = useFormSubmit()
 *   await send({ templateId: 'template_booking', params: { name, email, ... } })
 *
 * status: 'idle' | 'sending' | 'sent' | 'error'
 *
 * Configuration:
 *   Set VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID in .env
 *   (falls back to demo placeholders so the UI still works in dev)
 */
import { useState } from 'react'
import emailjs from '@emailjs/browser'

const PUBLIC_KEY   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'DEMO_KEY'
const SERVICE_ID   = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'DEMO_SERVICE'

export function useFormSubmit() {
  const [status, setStatus] = useState('idle')   // 'idle'|'sending'|'sent'|'error'
  const [error,  setError]  = useState(null)

  async function send({ templateId, params }) {
    setStatus('sending')
    setError(null)

    // In demo mode (no real keys) — simulate a 1s network call then succeed
    if (PUBLIC_KEY === 'DEMO_KEY' || SERVICE_ID === 'DEMO_SERVICE') {
      await new Promise(r => setTimeout(r, 900))
      setStatus('sent')
      return { ok: true, demo: true }
    }

    try {
      await emailjs.send(SERVICE_ID, templateId, params, PUBLIC_KEY)
      setStatus('sent')
      return { ok: true }
    } catch (err) {
      setError(err?.text || 'Something went wrong. Please try again.')
      setStatus('error')
      return { ok: false, err }
    }
  }

  function reset() {
    setStatus('idle')
    setError(null)
  }

  return { send, status, error, reset }
}
