// ============================================================
// DOWNFLOW — School of Life
// Firebase / Antigravity AI backend connection
//
// To connect your Antigravity instance:
// 1. Go to your Firebase Console → Project Settings → General
// 2. Scroll to "Your apps" → Web app → SDK setup
// 3. Copy the firebaseConfig values into .env.local:
//
//   VITE_FIREBASE_API_KEY=...
//   VITE_FIREBASE_AUTH_DOMAIN=...
//   VITE_FIREBASE_PROJECT_ID=...
//   VITE_FIREBASE_STORAGE_BUCKET=...
//   VITE_FIREBASE_MESSAGING_SENDER_ID=...
//   VITE_FIREBASE_APP_ID=...
//
// The app will use real Firebase data when env vars are set.
// Without them it falls back to the mock data layer below.
// ============================================================

import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection, doc,
  getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit,
  serverTimestamp
} from 'firebase/firestore'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

// Only init Firebase if config is present
const isConfigured = Object.values(firebaseConfig).every(Boolean)

let app, db, auth, storage

if (isConfigured) {
  app     = initializeApp(firebaseConfig)
  db      = getFirestore(app)
  auth    = getAuth(app)
  storage = getStorage(app)
}

export { db, auth, storage, isConfigured }
export {
  collection, doc,
  getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit,
  serverTimestamp,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  storageRef, uploadBytesResumable, getDownloadURL, deleteObject
}
