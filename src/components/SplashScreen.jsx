// src/components/SplashScreen.jsx
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { UI_TEXT } from '../data/translations';

const LANGUAGES = [
  { code: 'en', flag: '🇮🇳', name: 'English' },
  { code: 'hi', flag: '🇮🇳', name: 'हिंदी' },
  { code: 'te', flag: '🇮🇳', name: 'తెలుగు' },
  { code: 'ta', flag: '🇮🇳', name: 'தமிழ்' },
  { code: 'kn', flag: '🇮🇳', name: 'ಕನ್ನಡ' },
  { code: 'ml', flag: '🇮🇳', name: 'മലയ' },
  { code: 'mr', flag: '🇮🇳', name: 'मराठी' },
  { code: 'bn', flag: '🇮🇳', name: 'বাংলা' },
];

export default function SplashScreen() {
  const { lang, setLang, navigate } = useApp();
  const T = UI_TEXT[lang] || UI_TEXT.en;

  return (
    <div style={styles.container}>
      <div style={styles.bg}>
        <div style={{...styles.circle, width:400,height:400,top:-100,right:-100}} />
        <div style={{...styles.circle, width:250,height:250,bottom:50,left:-80}} />
        <div style={{...styles.circle, width:150,height:150,top:'40%',left:'30%',background:'rgba(245,158,11,0.06)'}} />
      </div>
      <div style={styles.content}>
        <div style={styles.logo}>
          <span style={styles.logoN}>N</span>
        </div>
        <div style={styles.title}>NYAYA <span style={styles.titleSpan}>न्याय</span></div>
        <div style={styles.sub}>Your free AI legal advisor.<br/>Know your rights. Get justice.</div>
        <div style={styles.badge}>
          <span style={styles.liveDot} />
          24/7 FREE · ALL LANGUAGES
        </div>

        <div style={styles.langLabel}>{T.splashLangLabel}</div>
        <div style={styles.langGrid}>
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              style={{ ...styles.langBtn, ...(lang === l.code ? styles.langBtnSel : {}) }}
              onClick={() => setLang(l.code)}
            >
              <span style={styles.langFlag}>{l.flag}</span>
              <span style={styles.langName}>{l.name}</span>
            </button>
          ))}
        </div>

        <button style={styles.startBtn} onClick={() => navigate('home')}>
          {T.splashBtn}
        </button>
        <div style={styles.tagline}>FREE · ALL LANGUAGES · ARTICLE 39A</div>
      </div>
    </div>
  );
}

const styles = {
  container: { background: 'linear-gradient(160deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  bg: { position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' },
  circle: { position: 'absolute', borderRadius: '50%', opacity: 0.06, background: '#FF6B00' },
  content: { position: 'relative', zIndex: 1, textAlign: 'center', padding: '40px 32px', width: '100%', maxWidth: 420 },
  logo: { width: 90, height: 90, background: 'linear-gradient(135deg, #FF6B00, #F59E0B)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 20px 60px rgba(255,107,0,0.4)' },
  logoN: { fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: 'white' },
  title: { fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 900, color: 'white', marginBottom: 8 },
  titleSpan: { background: 'linear-gradient(90deg, #FF6B00, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  sub: { color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.6, marginBottom: 24 },
  badge: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(5,150,105,0.15)', border: '1px solid rgba(5,150,105,0.3)', borderRadius: 100, padding: '4px 12px', fontSize: 11, fontWeight: 800, color: '#059669', letterSpacing: '0.5px', marginBottom: 28 },
  liveDot: { width: 7, height: 7, background: '#059669', borderRadius: '50%', display: 'inline-block', marginRight: 4, animation: 'pulse 1.5s infinite' },
  langLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  langGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 28 },
  langBtn: { background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '12px 6px', cursor: 'pointer', textAlign: 'center', color: 'white', transition: 'all 0.2s', fontFamily: "'Nunito', sans-serif" },
  langBtnSel: { background: 'rgba(255,107,0,0.25)', borderColor: '#FF6B00' },
  langFlag: { fontSize: 20, display: 'block', marginBottom: 3 },
  langName: { fontSize: 11, fontWeight: 600, display: 'block' },
  startBtn: { width: '100%', padding: 18, background: 'linear-gradient(135deg, #FF6B00, #F59E0B)', border: 'none', borderRadius: 16, color: 'white', fontSize: 17, fontWeight: 800, fontFamily: "'Nunito', sans-serif", cursor: 'pointer', boxShadow: '0 8px 32px rgba(255,107,0,0.4)', transition: 'transform 0.2s', marginBottom: 16 },
  tagline: { color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: 1 }
};
