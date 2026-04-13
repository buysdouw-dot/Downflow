import React from 'react'
// ============================================================
// Legal — Terms & Conditions + Privacy Policy
// Required before public launch. Covers:
// - Global users (VN, DE, RU)
// - Children's data (COPPA / GDPR-K)
// - Subscription / payment disputes
// ============================================================
import { useState } from 'react'
import usePageMeta from '../hooks/usePageMeta.js'

export default function Legal() {
  usePageMeta('Legal — Terms & Privacy', 'DOWNFLOW Terms of Service and Privacy Policy.')

  const [activeTab, setActiveTab] = useState('terms')

  return (
    <div className="legal-page">
      <div className="legal-hero">
        <span className="kicker">Legal</span>
        <h1>Terms & Privacy</h1>
        <p>Last updated: April 2026</p>
      </div>

      <div className="legal-tabs">
        <button className={`legal-tab ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>
          📄 Terms of Service
        </button>
        <button className={`legal-tab ${activeTab === 'privacy' ? 'active' : ''}`} onClick={() => setActiveTab('privacy')}>
          🔒 Privacy Policy
        </button>
      </div>

      {activeTab === 'terms' && (
        <div className="legal-doc">
          <h2>Terms of Service</h2>

          <div className="legal-section">
            <h3>1. About DOWNFLOW</h3>
            <p>DOWNFLOW — School of Life ("DOWNFLOW", "we", "us") is an education network platform that connects sponsors, facilitators, students, and connectors in structured learning cells. By using DOWNFLOW, you agree to these Terms.</p>
          </div>

          <div className="legal-section">
            <h3>2. Roles and Responsibilities</h3>
            <p><strong>Sponsors</strong> fund learning cells and receive impact reports. Funding is non-refundable after Week 1 of a cycle begins.</p>
            <p><strong>Facilitators</strong> lead sessions and are responsible for following the standardised lesson structure. Going off-script, manipulating students, or misusing the platform results in immediate removal.</p>
            <p><strong>Students</strong> participate in good faith. Cheating the coin system, falsifying video reps, or disruptive behaviour may result in removal.</p>
            <p><strong>Connectors</strong> recruit students and facilitators. Misrepresenting the platform or applying pressure tactics violates these Terms.</p>
          </div>

          <div className="legal-section">
            <h3>3. Payments</h3>
            <p>All sponsorship payments are processed via Wise bank transfer in USD, EUR, or VND. Payment is confirmed manually by a platform admin within 24 hours of funds clearing.</p>
            <p><strong>Refunds:</strong> Available before Week 1 begins. No refunds after cycle start except in documented cases of platform failure or consent withdrawal by a legal guardian.</p>
            <p>DOWNFLOW does not store credit card numbers. All payment processing is handled by Wise.</p>
          </div>

          <div className="legal-section">
            <h3>4. Children and Minors</h3>
            <p>DOWNFLOW serves students aged 5–14. A parent or legal guardian must consent to the student's participation. Facilitators may not contact students or parents outside the DOWNFLOW platform. All communication goes through ClassDojo within the platform's communication system.</p>
            <p>We comply with GDPR (EU), COPPA (US), and Vietnamese child protection regulations. If you believe a child's data has been mishandled, contact us immediately at privacy@downflow.app.</p>
          </div>

          <div className="legal-section">
            <h3>5. Intellectual Property</h3>
            <p>All lesson plans, curriculum packs, platform design, and system architecture are the intellectual property of DOWNFLOW. Facilitators and connectors may not reproduce, sell, or distribute DOWNFLOW content outside the platform.</p>
          </div>

          <div className="legal-section">
            <h3>6. Ethical Enforcement</h3>
            <p>DOWNFLOW operates an automated ethical monitoring system. Any detected overwork, manipulation, consent violations, payment pressure, or unequal participation triggers a review. Confirmed violations result in immediate suspension.</p>
          </div>

          <div className="legal-section">
            <h3>7. Termination</h3>
            <p>We reserve the right to suspend or terminate any account that violates these Terms, without notice. Sponsors are not refunded for cycles terminated due to facilitator or student misconduct that violates these Terms.</p>
          </div>

          <div className="legal-section">
            <h3>8. Governing Law</h3>
            <p>These Terms are governed by Vietnamese law for users in Vietnam, German law for EU users, and South African law for other users. Disputes are resolved through mediation before any legal proceedings.</p>
          </div>

          <div className="legal-section">
            <h3>9. Contact</h3>
            <p>Email: legal@downflow.app</p>
          </div>
        </div>
      )}

      {activeTab === 'privacy' && (
        <div className="legal-doc">
          <h2>Privacy Policy</h2>

          <div className="legal-section">
            <h3>1. What We Collect</h3>
            <ul>
              <li><strong>Account data:</strong> Name, email, role, region</li>
              <li><strong>Usage data:</strong> Session attendance, video submissions, coin transactions, progress logs</li>
              <li><strong>Payment data:</strong> Invoice references (not card numbers — we never store those)</li>
              <li><strong>Feedback data:</strong> Post-session ratings and written feedback</li>
              <li><strong>Support data:</strong> Tickets submitted and their content</li>
            </ul>
          </div>

          <div className="legal-section">
            <h3>2. How We Use Your Data</h3>
            <ul>
              <li>To run learning cells and track student progress</li>
              <li>To calculate facilitator earnings and process payouts</li>
              <li>To send session reminders and notifications (only if you have an account)</li>
              <li>To detect ethical violations and protect students</li>
              <li>To generate sponsor impact reports</li>
            </ul>
            <p>We do not sell your data. We do not use your data for advertising.</p>
          </div>

          <div className="legal-section">
            <h3>3. Children's Data</h3>
            <p>Students under 13 require verified parental consent before their data is processed. Parental consent is collected during cell enrollment by the connector and verified by the platform admin.</p>
            <p>Children's data is never used for profiling or advertising. It is stored securely in Firebase (Google Cloud) with access restricted to the child's facilitator, connector, and platform admins.</p>
          </div>

          <div className="legal-section">
            <h3>4. Data Storage</h3>
            <p>All data is stored in Google Firebase (Firestore + Storage), hosted on Google Cloud infrastructure. Data for Vietnamese users is processed in compliance with Vietnam's Cybersecurity Law. EU users' data is processed in compliance with GDPR.</p>
          </div>

          <div className="legal-section">
            <h3>5. Your Rights</h3>
            <ul>
              <li><strong>Access:</strong> Request a copy of all data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your account and all data (except legally required records)</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
            </ul>
            <p>Submit any of these requests to: privacy@downflow.app</p>
          </div>

          <div className="legal-section">
            <h3>6. Cookies</h3>
            <p>DOWNFLOW uses Firebase Authentication cookies (session-only). We do not use third-party tracking cookies or advertising cookies.</p>
          </div>

          <div className="legal-section">
            <h3>7. Data Retention</h3>
            <p>Active accounts: data retained while the account is active. Deleted accounts: personal data removed within 30 days. Payment records: retained for 7 years for legal compliance.</p>
          </div>

          <div className="legal-section">
            <h3>8. Contact</h3>
            <p>Data protection questions: privacy@downflow.app</p>
            <p>Data Protection Officer (EU users): dpo@downflow.app</p>
          </div>
        </div>
      )}
    </div>
  )
}
