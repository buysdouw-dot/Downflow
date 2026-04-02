import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth, db, isConfigured, signInWithEmailAndPassword, doc, getDoc } from '../services/firebase.js'

// ── demo shortcut credentials ──────────────────────────────
const DEMO_ROLES = [
  { label: '💼 Sponsor',     email: 'sponsor@downflow.app',     role: 'sponsor' },
  { label: '🎓 Student',     email: 'student@downflow.app',     role: 'student' },
  { label: '🧭 Facilitator', email: 'facilitator@downflow.app', role: 'facilitator' },
  { label: '🔗 Connector',   email: 'connector@downflow.app',   role: 'connector' },
  { label: '⚡ Admin',       email: 'admin@downflow.app',       role: 'platform' },
]

const ROLE_REDIRECT = {
  sponsor:     '/sponsor',
  student:     '/student',
  facilitator: '/facilitator',
  connector:   '/connector',
  platform:    '/platform',
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail]     = useState('')
  const [pass,  setPass]      = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!isConfigured) {
      setError('Firebase is not connected yet. See the setup guide below or use the demo buttons.')
      return
    }
    setLoading(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass)
      // Read role from Firestore /users/{uid}
      // db, doc, getDoc already imported at top
      const snap = await getDoc(doc(db, 'users', cred.user.uid))
      const role = snap.exists() ? snap.data().role : 'student'
      navigate(ROLE_REDIRECT[role] || '/')
    } catch (err) {
      const msg = {
        'auth/invalid-credential': 'Wrong email or password.',
        'auth/user-not-found':     'No account found with that email.',
        'auth/wrong-password':     'Incorrect password.',
        'auth/too-many-requests':  'Too many attempts. Try again later.',
      }
      setError(msg[err.code] || err.message)
    } finally {
      setLoading(false)
    }
  }

  async function quickLogin(email) {
    setEmail(email)
    setPass('Demo1234!')
    setError('')
    if (!isConfigured) {
      setError('Firebase not connected yet — add your .env.local credentials to enable real login.')
      return
    }
    setLoading(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, 'Demo1234!')
      // db, doc, getDoc already imported at top
      const snap = await getDoc(doc(db, 'users', cred.user.uid))
      const role = snap.exists() ? snap.data().role : 'student'
      navigate(ROLE_REDIRECT[role] || '/')
    } catch (err) {
      setError(err.message)
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

        {/* Firebase status banner */}
        {!isConfigured && (
          <div className="login-status-banner">
            <span className="login-status-dot demo" />
            <span>Demo mode — <Link to="#setup" className="login-setup-link">connect Firebase</Link> for live data</span>
          </div>
        )}
        {isConfigured && (
          <div className="login-status-banner connected">
            <span className="login-status-dot live" />
            <span>Connected to Firebase — live data</span>
          </div>
        )}

        {/* Quick-role buttons */}
        <div className="login-quick-roles">
          <p className="login-qr-label">Sign in as:</p>
          <div className="login-qr-grid">
            {DEMO_ROLES.map(r => (
              <button key={r.role} className="login-qr-btn"
                onClick={() => quickLogin(r.email)} disabled={loading}>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="login-divider"><span>or enter credentials</span></div>

        {/* Manual form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">Email</label>
          <input className="login-input" type="email" value={email}
            onChange={e => setEmail(e.target.value)} placeholder="you@downflow.app"
            required autoComplete="email" />

          <label className="login-label">Password</label>
          <input className="login-input" type="password" value={pass}
            onChange={e => setPass(e.target.value)} placeholder="••••••••"
            required autoComplete="current-password" />

          {error && <p className="login-error">{error}</p>}

          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/join" className="login-setup-link">Apply to join</Link>
        </p>
      </div>

      {/* Setup guide (shown when Firebase not connected) */}
      {!isConfigured && (
        <div className="login-setup-guide" id="setup">
          <h2 className="login-sg-title">🔥 Connect Firebase in 3 minutes</h2>
          <div className="login-sg-steps">
            <div className="login-sg-step">
              <span className="login-sg-num">1</span>
              <div>
                <strong>Create a Firebase project</strong>
                <p>Go to <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="login-setup-link">console.firebase.google.com</a> → Add project → name it <code>downflow-mvp</code></p>
              </div>
            </div>
            <div className="login-sg-step">
              <span className="login-sg-num">2</span>
              <div>
                <strong>Enable Email/Password Auth</strong>
                <p>Authentication → Sign-in method → Email/Password → Enable</p>
              </div>
            </div>
            <div className="login-sg-step">
              <span className="login-sg-num">3</span>
              <div>
                <strong>Create a Firestore database</strong>
                <p>Firestore Database → Create database → Start in <strong>test mode</strong> (we'll apply security rules after seeding)</p>
              </div>
            </div>
            <div className="login-sg-step">
              <span className="login-sg-num">4</span>
              <div>
                <strong>Add a Web App → copy config</strong>
                <p>Project Settings → Your apps → Web → Register app → copy the <code>firebaseConfig</code> object</p>
              </div>
            </div>
            <div className="login-sg-step">
              <span className="login-sg-num">5</span>
              <div>
                <strong>Create <code>web/.env.local</code></strong>
                <pre className="login-sg-pre">{`VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=downflow-mvp.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=downflow-mvp
VITE_FIREBASE_STORAGE_BUCKET=downflow-mvp.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc`}</pre>
              </div>
            </div>
            <div className="login-sg-step">
              <span className="login-sg-num">6</span>
              <div>
                <strong>Seed the database</strong>
                <p>Download service account key → <code>firebase/serviceAccount.json</code>, then:</p>
                <pre className="login-sg-pre">{`cd /home/user/app
npm install firebase-admin --prefix web
export GOOGLE_APPLICATION_CREDENTIALS=firebase/serviceAccount.json
node firebase/seed.js`}</pre>
              </div>
            </div>
            <div className="login-sg-step">
              <span className="login-sg-num">7</span>
              <div>
                <strong>Deploy Firestore security rules</strong>
                <pre className="login-sg-pre">{`firebase use downflow-mvp
firebase deploy --only firestore:rules`}</pre>
              </div>
            </div>
          </div>
          <p className="login-sg-note">After step 5 + restart dev server — the app auto-connects. Demo buttons above will sign in as real Firebase users.</p>
        </div>
      )}
    </div>
  )
}
