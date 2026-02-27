// src/components/Toast.jsx
import React from 'react';
import { useApp } from '../contexts/AppContext';

export default function Toast() {
  const { toast } = useApp();
  return (
    <div style={{
      position: 'fixed', bottom: 100, left: '50%',
      transform: `translateX(-50%) translateY(${toast.show ? 0 : 20}px)`,
      background: '#1A1A2E', color: 'white',
      padding: '12px 20px', borderRadius: 100,
      fontSize: 13, fontWeight: 700,
      zIndex: 999,
      opacity: toast.show ? 1 : 0,
      transition: 'all 0.3s',
      pointerEvents: 'none', whiteSpace: 'nowrap',
      fontFamily: "'Nunito', sans-serif"
    }}>
      {toast.msg}
    </div>
  );
}
