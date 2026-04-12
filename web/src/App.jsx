import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// Eagerly load small/critical pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import RoleLanding from './pages/RoleLanding.jsx'

// Lazy load all dashboard + heavy pages
const SponsorDashboard      = lazy(() => import('./pages/SponsorDashboard.jsx'))
const StudentDashboard      = lazy(() => import('./pages/StudentDashboard.jsx'))
const FacilitatorDashboard  = lazy(() => import('./pages/FacilitatorDashboard.jsx'))
const ConnectorDashboard    = lazy(() => import('./pages/ConnectorDashboard.jsx'))
const PlatformDashboard     = lazy(() => import('./pages/PlatformDashboard.jsx'))
const Curriculum            = lazy(() => import('./pages/Curriculum.jsx'))
const ContentEngine         = lazy(() => import('./pages/ContentEngine.jsx'))
const Payments              = lazy(() => import('./pages/Payments.jsx'))
const News                  = lazy(() => import('./pages/News.jsx'))
const TeacherAssistants     = lazy(() => import('./pages/TeacherAssistants.jsx'))
const PaymentEngine         = lazy(() => import('./pages/PaymentEngine.jsx'))
const Funding               = lazy(() => import('./pages/Funding.jsx'))
const ModelFilm             = lazy(() => import('./pages/ModelFilm.jsx'))
const FacilitatorFilm       = lazy(() => import('./pages/FacilitatorFilm.jsx'))
const ConnectorFilm         = lazy(() => import('./pages/ConnectorFilm.jsx'))
const FacilitatorApp        = lazy(() => import('./pages/FacilitatorApp.jsx'))
const FacilitatorOnboarding = lazy(() => import('./pages/FacilitatorOnboarding.jsx'))
const SocialAds             = lazy(() => import('./pages/SocialAds.jsx'))
const AutoFunnel            = lazy(() => import('./pages/AutoFunnel.jsx'))
const Integrations          = lazy(() => import('./pages/Integrations.jsx'))
const SessionRecordings     = lazy(() => import('./pages/SessionRecordings.jsx'))
const FundingProposal       = lazy(() => import('./pages/FundingProposal.jsx'))
const Support             = lazy(() => import('./pages/Support.jsx'))
const Legal               = lazy(() => import('./pages/Legal.jsx'))
const EarningsWallet      = lazy(() => import('./pages/EarningsWallet.jsx'))
const BackupSystem        = lazy(() => import('./pages/BackupSystem.jsx'))
const BusinessMetrics     = lazy(() => import('./pages/BusinessMetrics.jsx'))
const Referrals           = lazy(() => import('./pages/Referrals.jsx'))
const MarketingEngine     = lazy(() => import('./pages/MarketingEngine.jsx'))
const GrowthSystem        = lazy(() => import('./pages/GrowthSystem.jsx'))
const LeadIntelligence    = lazy(() => import('./pages/LeadIntelligence.jsx'))
const AdminDashboard      = lazy(() => import('./pages/AdminDashboard.jsx'))
const ParentDashboard     = lazy(() => import('./pages/ParentDashboard.jsx'))
const SessionBooking      = lazy(() => import('./pages/SessionBooking.jsx'))
const CellActivation      = lazy(() => import('./pages/CellActivation.jsx'))
const About               = lazy(() => import('./pages/About.jsx'))
const Pricing             = lazy(() => import('./pages/Pricing.jsx'))
const NewsArticle         = lazy(() => import('./pages/NewsArticle.jsx'))
const StudentProgress     = lazy(() => import('./pages/StudentProgress.jsx'))
const Onboarding          = lazy(() => import('./pages/Onboarding.jsx'))

function PageLoader() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
      height:'60vh', color:'rgba(255,255,255,0.3)', fontFamily:'monospace', fontSize:'0.85rem' }}>
      Loading…
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          {/* Public */}
          <Route path="/"                   element={<Home />} />
          <Route path="/model"              element={<ModelFilm />} />
          <Route path="/facilitator-film"   element={<FacilitatorFilm />} />
          <Route path="/connector-film"     element={<ConnectorFilm />} />
          <Route path="/funding"            element={<Funding />} />
          <Route path="/curriculum"         element={<Curriculum />} />
          <Route path="/join"               element={<RoleLanding />} />
          <Route path="/news"               element={<News />} />

          {/* Sponsor */}
          <Route path="/sponsor" element={
            <ProtectedRoute roles={['sponsor','platform']}><SponsorDashboard /></ProtectedRoute>
          } />
          <Route path="/payment-engine" element={
            <ProtectedRoute roles={['sponsor','platform']}><PaymentEngine /></ProtectedRoute>
          } />
          <Route path="/payments" element={
            <ProtectedRoute roles={['sponsor','platform']}><Payments /></ProtectedRoute>
          } />

          {/* Student */}
          <Route path="/student" element={
            <ProtectedRoute roles={['student','platform']}><StudentDashboard /></ProtectedRoute>
          } />

          {/* Facilitator */}
          <Route path="/facilitator" element={
            <ProtectedRoute roles={['facilitator','platform']}><FacilitatorDashboard /></ProtectedRoute>
          } />
          <Route path="/facilitator-app" element={
            <ProtectedRoute roles={['facilitator','platform']}><FacilitatorApp /></ProtectedRoute>
          } />
          <Route path="/facilitator-onboarding" element={
            <ProtectedRoute roles={['facilitator','platform']}><FacilitatorOnboarding /></ProtectedRoute>
          } />
          <Route path="/recordings" element={
            <ProtectedRoute roles={['facilitator','platform','student']}><SessionRecordings /></ProtectedRoute>
          } />
          <Route path="/assistants" element={
            <ProtectedRoute roles={['facilitator','platform']}><TeacherAssistants /></ProtectedRoute>
          } />

          {/* Connector */}
          <Route path="/connector" element={
            <ProtectedRoute roles={['connector','platform']}><ConnectorDashboard /></ProtectedRoute>
          } />
          <Route path="/auto-funnel" element={
            <ProtectedRoute roles={['connector','platform']}><AutoFunnel /></ProtectedRoute>
          } />
          <Route path="/social-ads" element={
            <ProtectedRoute roles={['connector','platform']}><SocialAds /></ProtectedRoute>
          } />

          {/* Platform admin */}
          <Route path="/platform" element={
            <ProtectedRoute roles={['platform']}><PlatformDashboard /></ProtectedRoute>
          } />
          <Route path="/content" element={
            <ProtectedRoute roles={['platform','facilitator']}><ContentEngine /></ProtectedRoute>
          } />
          <Route path="/integrations" element={
            <ProtectedRoute roles={['platform']}><Integrations /></ProtectedRoute>
          } />

          {/* Shared authenticated */}
          <Route path="/funding-proposal" element={<ProtectedRoute><FundingProposal /></ProtectedRoute>} />
          <Route path="/support"          element={<Support />} />
          <Route path="/legal"            element={<Legal />} />
          <Route path="/earnings"         element={<ProtectedRoute roles={['facilitator','platform']}><EarningsWallet /></ProtectedRoute>} />
          <Route path="/backup-system"    element={<ProtectedRoute roles={['platform']}><BackupSystem /></ProtectedRoute>} />
          <Route path="/metrics"          element={<ProtectedRoute roles={['platform']}><BusinessMetrics /></ProtectedRoute>} />
          <Route path="/referrals"        element={<ProtectedRoute><Referrals /></ProtectedRoute>} />
          <Route path="/marketing"        element={<ProtectedRoute roles={['platform','connector']}><MarketingEngine /></ProtectedRoute>} />
          <Route path="/growth-system"    element={<ProtectedRoute roles={['platform']}><GrowthSystem /></ProtectedRoute>} />
          <Route path="/lead-intelligence" element={<ProtectedRoute roles={['platform']}><LeadIntelligence /></ProtectedRoute>} />
          <Route path="/admin"            element={<ProtectedRoute roles={['platform']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/parent-dashboard" element={<ProtectedRoute roles={['platform','parent']}><ParentDashboard /></ProtectedRoute>} />

          {/* New pages */}
          <Route path="/booking"   element={<SessionBooking />} />
          <Route path="/activate"  element={<CellActivation />} />
          <Route path="/about"     element={<About />} />
          <Route path="/pricing"   element={<Pricing />} />
          <Route path="/news/:slug" element={<NewsArticle />} />
          <Route path="/progress"  element={<ProtectedRoute roles={['student','platform']}><StudentProgress /></ProtectedRoute>} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
