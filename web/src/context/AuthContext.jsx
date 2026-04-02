import { createContext, useContext, useState, useEffect } from 'react'
import { auth, isConfigured, onAuthStateChanged } from '../services/firebase.js'
import { mockUsers } from '../services/mockData.js'

const AuthContext = createContext(null)

// Demo personas for role-switching (shown in Layout header)
export const DEMO_PERSONAS = [
  { id:'user-s01', label:'Sponsor',   icon:'💼', role:'sponsor',     name:'Vingroup Education' },
  { id:'user-001', label:'Student',   icon:'🎓', role:'student',     name:'Nguyen Van An' },
  { id:'user-f01', label:'Facilitator',icon:'🧭', role:'facilitator', name:'Dr. Hoa Nguyen' },
  { id:'user-c01', label:'Connector', icon:'🔗', role:'connector',   name:'Bach Nguyen' },
  { id:'platform', label:'Platform',  icon:'⚡', role:'platform',    name:'Platform Admin' },
]

export function AuthProvider({ children }) {
  // If Firebase is configured, use real auth. Otherwise use mock persona.
  const [user, setUser]           = useState(null)
  const [persona, setPersona]     = useState(DEMO_PERSONAS[0]) // default: Sponsor view
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    if (isConfigured) {
      const unsub = onAuthStateChanged(auth, firebaseUser => {
        setUser(firebaseUser)
        setLoading(false)
      })
      return unsub
    } else {
      // Mock mode — no auth needed
      setLoading(false)
    }
  }, [])

  const switchPersona = (personaId) => {
    const p = DEMO_PERSONAS.find(p => p.id === personaId)
    if (p) setPersona(p)
  }

  const value = {
    user,
    persona,
    switchPersona,
    isConfigured,
    loading,
    // The "current role" — from real Firebase user or from demo persona
    role: user?.role || persona?.role,
    displayName: user?.displayName || persona?.name,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
