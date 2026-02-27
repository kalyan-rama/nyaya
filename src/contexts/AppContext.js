// src/contexts/AppContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [screen, setScreen] = useState('splash');
  const [toast, setToast] = useState({ msg: '', show: false });
  const [chatMessages, setChatMessages] = useState([]);
  const [sessionId] = useState(() => 'session_' + Date.now());

  const [complaints, setComplaints] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nyaya_complaints') || '[]'); } catch { return []; }
  });

  const addComplaint = useCallback((complaint) => {
    setComplaints(prev => {
      const updated = [...prev, complaint];
      try { localStorage.setItem('nyaya_complaints', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const updateComplaintStatus = useCallback((id, status) => {
    setComplaints(prev => {
      const updated = prev.map(c => {
        if (c.id !== id) return c;
        const tl = [...(c.timeline || [])];
        if (status === 'confirmed' && tl[2]) { tl[2] = { ...tl[2], done: true, dt: new Date().toLocaleString() }; }
        if (status === 'resolved') {
          [2, 3, 4].forEach(i => { if (tl[i]) tl[i] = { ...tl[i], done: true, dt: new Date().toLocaleString() }; });
        }
        return { ...c, status, timeline: tl };
      });
      try { localStorage.setItem('nyaya_complaints', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const showToast = useCallback((msg, duration = 2800) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), duration);
  }, []);

  const navigate = useCallback((s) => {
    setScreen(s);
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppContext.Provider value={{
      lang, setLang,
      screen, navigate,
      toast, showToast,
      chatMessages, setChatMessages,
      sessionId,
      complaints, addComplaint, updateComplaintStatus,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};
