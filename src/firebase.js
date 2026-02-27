// src/firebase.js
// ⚠️ REPLACE WITH YOUR FIREBASE PROJECT CREDENTIALS
// Go to: https://console.firebase.google.com → Project Settings → Your Apps → Firebase SDK snippet

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

// ⚠️ Replace with your Firebase config OR use .env variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAU6j9NI3Jeb8-t8PRp4g_pJdqN0AEP7I0",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "nyaya-react.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "nyaya-react",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "nyaya-react.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "731339457582",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:731339457582:web:e6327bb80d97c248914bbf"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Save chat message to Firestore (keeps last 3 days by default)
export async function saveChatMessage(sessionId, role, content, lang) {
  try {
    await addDoc(collection(db, 'chats'), {
      sessionId,
      role,
      content,
      lang,
      timestamp: serverTimestamp(),
      createdAt: Date.now()
    });
  } catch (e) {
    console.warn('Firebase save failed:', e.message);
  }
}

// Load recent chat messages for a session (last 3 days)
export async function loadChatHistory(sessionId) {
  try {
    const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000);
    const q = query(
      collection(db, 'chats'),
      orderBy('createdAt', 'asc'),
      limit(100)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(d => d.sessionId === sessionId && d.createdAt > threeDaysAgo);
  } catch (e) {
    console.warn('Firebase load failed:', e.message);
    return [];
  }
}
