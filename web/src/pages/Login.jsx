import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth, db, isConfigured, signInWithEmailAndPassword, doc, getDoc } from '../services/firebase.js'
import usePageMeta from '../hooks/usePageMeta.js'

const ROLE_REDIRECT = {
  sponsor:     '/sponsor',
  student:     '/student',
  facilitator: '/facilitator',
  connector:   '/connector',
  platform:    '/platform',
}

export default function Login() {
  usePageMeta("Sign In", "Sign in to your DOWNFLOW dashboard.")

  const navigate  = useNavigate()
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!isConfigured) {
      setError('Firebase is not connected. Contact your administrator.')
      return
    }
    setLoading(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass)
      const snap = await getDoc(doc(db, 'users', cred.user.uid))
      const role = snap.exists() ? snap.data().role : 'student'
      navigate(ROLE_REDIRECT[role] || '/')
    } catch (err) {
      const msg = {
        'auth/invalid-credential': 'Wrong email or password.',
        'auth/user-not-found':     'No account found with that email.',
        'auth/wrong-password':     'Incorrect password.',
        'auth/too-many-requests':  'Too many attempts. Try again later.',
        'auth/invalid-email':      'Please enter a valid email address.',
      }
      setError(msg[err.code] || 'Sign in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Brand */}
        <div className="login-brand">
          <span className="brand-down">DOWN</span><span className="brand-flow">FLOW</span>
          <p className="login-brand-sub">School of Life</p>
        </div>

        {/* Status */}
        <div className={`login-status-banner ${isConfigured ? 'connected' : ''}`}>
          <span className={`login-status-dot ${isConfigured ? 'live' : 'demo'}`} />
          <span>{isConfigured ? 'Live — connected to Firebase' : 'Demo mode'}</span>
        </div>

        {/* Login form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">Email</label>
          <input
            className="login-input" type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@downflow.app"
            required autoComplete="email"
          />

          <label className="login-label">Password</label>
          <input
            className="login-input" type="password" value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="••••••••"
            required autoComplete="current-password"
          />

          {error && <p className="login-error">{error}</p>}

          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{' '}
          <Link to="/join" className="login-setup-link">Apply to join</Link>
        </p>

        <p className="login-footer" style={{ marginTop: '0.25rem' }}>
          <Link to="/" className="login-setup-link">← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
