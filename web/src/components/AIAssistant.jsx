import React from 'react'
import { useState } from 'react'
import { generateAIPrompt } from '../services/api.js'

const CONTENT_TYPES = ['Discussion Prompt', 'Feedback Suggestion', 'Session Activity']

export default function AIAssistant({ defaultTopic = '' }) {
  const [contentType, setContentType] = useState('Discussion Prompt')
  const [topic, setTopic]             = useState(defaultTopic)
  const [context, setContext]         = useState('')
  const [result, setResult]           = useState('')
  const [loading, setLoading]         = useState(false)
  const [copied, setCopied]           = useState(false)

  async function handleGenerate() {
    if (!topic.trim()) return
    setLoading(true)
    setResult('')
    try {
      const text = await generateAIPrompt({
        contentType,
        learningTopic: topic,
        studentProgress: context,
      })
      setResult(text)
    } catch (e) {
      setResult('Error generating content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="ai-assistant-wrap">
      <div className="ai-assistant-form">
        <div className="ai-header">
          <span className="ai-icon">🤖</span>
          <div>
            <h3 className="ai-title">AI Learning Assistant</h3>
            <p className="ai-sub">Generate tailored discussion prompts or personalized feedback for your learning cell.</p>
          </div>
        </div>

        <div className="ai-field">
          <label className="ai-label">Content Type</label>
          <div className="ai-type-row">
            {CONTENT_TYPES.map(t => (
              <button
                key={t}
                className={`ai-type-btn${contentType===t?' active':''}`}
                onClick={() => setContentType(t)}
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="ai-field">
          <label className="ai-label">Learning Topic</label>
          <input
            className="db-input"
            placeholder="e.g. Voice & Confidence, Value Creation, Self-Awareness..."
            value={topic}
            onChange={e => setTopic(e.target.value)}
          />
        </div>

        <div className="ai-field">
          <label className="ai-label">Student Progress <span style={{color:'var(--text-soft)',fontWeight:400}}>(optional)</span></label>
          <textarea
            className="db-input ai-textarea"
            placeholder="Provide context about recent activities or specific student challenges..."
            value={context}
            onChange={e => setContext(e.target.value)}
            rows={3}
          />
        </div>

        <button
          className="btn btn-primary ai-generate-btn"
          onClick={handleGenerate}
          disabled={!topic.trim() || loading}
        >
          {loading ? (
            <><span className="ai-spinner"/> Generating...</>
          ) : (
            <>✨ Generate {contentType}</>
          )}
        </button>
      </div>

      <div className="ai-result-panel">
        <div className="ai-result-header">
          <span className="ai-result-label">GENERATED RESULT</span>
          {result && (
            <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
        {result ? (
          <div className="ai-result-text">{result}</div>
        ) : (
          <div className="ai-result-empty">
            <span className="ai-result-empty-icon">✨</span>
            <p>Your AI-generated content will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
