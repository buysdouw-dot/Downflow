import { createContext, useContext, useState, useEffect } from 'react'
import {
  auth, db, isConfigured,
  onAuthStateChanged, signOut,
  doc, getDoc
} from '../services/firebase.js'

const AuthContext = createContext(null)

// Demo personas for role-switching (shown in Layout header when NOT using Firebase)
export const DEMO_PERSONAS = [
  { id:'user-s01', label:'Sponsor',     icon:'💼', role:'sponsor',     name:'Vingroup Education' },
  { id:'user-001', label:'Student',     icon:'🎓', role:'student',     name:'Nguyen Van An' },
  { id:'user-f01', label:'Facilitator', icon:'🧭', role:'facilitator', name:'Dr. Hoa Nguyen' },
  { id:'user-c01', label:'Connector',   icon:'🔗', role:'connector',   name:'Bach Nguyen' },
  { id:'platform', label:'Platform',    icon:'⚡', role:'platform',    name:'Platform Admin' },
]

export function AuthProvider({ children }) {
  const [user,      setUser]      = useState(null)   // Firebase user object
  const [profile,   setProfile]   = useState(null)   // Firestore /users/{uid}
  const [persona,   setPersona]   = useState(DEMO_PERSONAS[0])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    if (!isConfigured) { setLoading(false); return }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        // Pull role + profile data from Firestore
        try {
          const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (snap.exists()) setProfile({ id: snap.id, ...snap.data() })
        } catch (e) {
          console.warn('Could not load user profile:', e)
        }
      } else {
        setUser(null)
        setProfile(null)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  const switchPersona = (personaId) => {
    const p = DEMO_PERSONAS.find(p => p.id === personaId)
    if (p) setPersona(p)
  }

  const logout = async () => {
    if (isConfigured) await signOut(auth)
    setUser(null)
    setProfile(null)
  }

  // "role" — from real Firebase profile, or demo persona
  const role        = profile?.role    || persona?.role
  const displayName = profile?.name    || user?.displayName || persona?.name
  const avatar      = profile?.avatar  || persona?.icon
  const uid         = user?.uid        || persona?.id

  const value = {
    user,
    profile,
    persona,
    switchPersona,
    logout,
    isConfigured,
    loading,
    role,
    displayName,
    avatar,
    uid,
    // Helpers
    isSponsor:     role === 'sponsor',
    isFacilitator: role === 'facilitator',
    isStudent:     role === 'student',
    isConnector:   role === 'connector',
    isPlatform:    role === 'platform',
  }

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#0a0a0a', color:'rgba(255,255,255,0.4)', fontFamily:'monospace', fontSize:'0.85rem' }}>
      Loading…
    </div>
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
