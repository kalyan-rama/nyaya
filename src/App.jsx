// src/App.jsx
import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import ChatScreen from './components/ChatScreen';
import RightsScreen from './components/RightsScreen';
import FinderScreen from './components/FinderScreen';
import DocumentsScreen from './components/DocumentsScreen';
import EmergencyScreen from './components/EmergencyScreen';
import LawyerScreen from './components/LawyerScreen';
import ComplaintScreen from './components/ComplaintScreen';
import TrackingScreen from './components/TrackingScreen';
import GovtPortalScreen from './components/GovtPortalScreen';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';

const SCREEN_MAP = {
  splash: SplashScreen,
  home: HomeScreen,
  chat: ChatScreen,
  rights: RightsScreen,
  finder: FinderScreen,
  docs: DocumentsScreen,
  emergency: EmergencyScreen,
  lawyer: LawyerScreen,
  complaint: ComplaintScreen,
  tracking: TrackingScreen,
  govt: GovtPortalScreen,
};

function AppContent() {
  const { screen } = useApp();
  const ScreenComponent = SCREEN_MAP[screen] || HomeScreen;

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <style>{`
        @keyframes emergPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.5); }
          50% { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
        }
        @keyframes dotBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes micPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .oc-btn.dir:hover { background: #2563EB !important; color: white !important; }
        textarea:focus { border-color: #FF6B00 !important; }
        button:active { transform: scale(0.97); }
        @media (min-width: 700px) { .desktop-hint { display: flex !important; } }
        *::-webkit-scrollbar { width: 3px; height: 3px; }
        *::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
      `}</style>

      <div className="desktop-hint" style={{
        display: 'none', position: 'fixed', top: 16, right: 16, zIndex: 9999,
        background: 'rgba(26,26,46,0.95)', color: 'white', borderRadius: 12,
        padding: '12px 18px', fontSize: 12, fontWeight: 700, gap: 8,
        alignItems: 'center', maxWidth: 240, backdropFilter: 'blur(8px)'
      }}>
        📱 Best experienced on mobile
      </div>

      <ScreenComponent />
      <BottomNav />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
