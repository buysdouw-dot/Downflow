import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastProvider } from './components/Toast.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
/* ── Modular CSS ─────────────────────────── */
import './styles/tokens.css'
import './styles/dashboard-shell.css'
import './styles/curriculum.css'
import './styles/shared-components.css'
import './styles/inverted-edu.css'
import './styles/sponsor-model.css'
import './styles/my-voice.css'
import './styles/content-engine.css'
import './styles/funding-proposal.css'
import './styles/model-film.css'
import './styles/facilitator-film.css'
import './styles/facilitator-app.css'
import './styles/facilitator-onboarding.css'
import './styles/social-ads.css'
import './styles/role-landing.css'
import './styles/facilitator-app-v2.css'
import './styles/auto-funnel.css'
import './styles/connector-film.css'
import './styles/social-ads-v2.css'
import './styles/role-pages.css'
import './styles/login.css'
import './styles/dashboard-shell-v2.css'
import './styles/social-ads-engine.css'
import './styles/topbar-integrations.css'
import './styles/integrations.css'
import './styles/session-recordings.css'
import './styles/new-pages.css'
import './styles/marketing.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
