import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import SponsorDashboard from './pages/SponsorDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'
import FacilitatorDashboard from './pages/FacilitatorDashboard.jsx'
import ConnectorDashboard from './pages/ConnectorDashboard.jsx'
import PlatformDashboard from './pages/PlatformDashboard.jsx'
import Curriculum from './pages/Curriculum.jsx'
import ContentEngine from './pages/ContentEngine.jsx'
import Payments from './pages/Payments.jsx'
import News from './pages/News.jsx'
import TeacherAssistants from './pages/TeacherAssistants.jsx'
import PaymentEngine from './pages/PaymentEngine.jsx'
import Funding from './pages/Funding.jsx'
import ModelFilm from './pages/ModelFilm.jsx'
import FacilitatorFilm from './pages/FacilitatorFilm.jsx'
import ConnectorFilm from './pages/ConnectorFilm.jsx'
import FacilitatorApp from './pages/FacilitatorApp.jsx'
import FacilitatorOnboarding from './pages/FacilitatorOnboarding.jsx'
import SocialAds from './pages/SocialAds.jsx'
import RoleLanding from './pages/RoleLanding.jsx'
import AutoFunnel from './pages/AutoFunnel.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/model" element={<ModelFilm />} />
        <Route path="/facilitator-film" element={<FacilitatorFilm />} />
        <Route path="/connector-film" element={<ConnectorFilm />} />
        <Route path="/funding" element={<Funding />} />
        <Route path="/sponsor" element={<SponsorDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/facilitator" element={<FacilitatorDashboard />} />
        <Route path="/connector" element={<ConnectorDashboard />} />
        <Route path="/platform" element={<PlatformDashboard />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/content" element={<ContentEngine />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/news" element={<News />} />
        <Route path="/assistants" element={<TeacherAssistants />} />
        <Route path="/payment-engine" element={<PaymentEngine />} />
        <Route path="/facilitator-app" element={<FacilitatorApp />} />
        <Route path="/facilitator-onboarding" element={<FacilitatorOnboarding />} />
        <Route path="/social-ads" element={<SocialAds />} />
        <Route path="/join" element={<RoleLanding />} />
        <Route path="/auto-funnel" element={<AutoFunnel />} />
      </Route>
    </Routes>
  )
}
