import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

// Protects routes by auth state + optional role restriction.
// Usage: <ProtectedRoute roles={['sponsor','platform']} />
export default function ProtectedRoute({ roles, children }) {
  const { user, profile, isConfigured, loading, role } = useAuth()
  const location = useLocation()

  if (loading) return null

  // In demo mode (no Firebase) allow all access
  if (!isConfigured) return children

  // Must be logged in
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />

  // Role check (if specified)
  if (roles && roles.length > 0 && !roles.includes(role)) {
    return <Navigate to="/login" replace />
  }

  return children
}
