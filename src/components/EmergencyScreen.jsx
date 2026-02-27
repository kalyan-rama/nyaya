// src/components/EmergencyScreen.jsx
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { UI_TEXT } from '../data/translations';

const EMERGENCY_NUMBERS = [
  { num: '112', name: 'All Emergency' },
  { num: '100', name: 'Police' },
  { num: '102', name: 'Ambulance' },
  { num: '181', name: 'Women Help' },
  { num: '15100', name: 'Legal Aid' },
  { num: '1930', name: 'Cyber Crime' },
  { num: '14433', name: 'Human Rights' },
  { num: '1800-11-4000', name: 'Consumer' },
];

const STEPS = [
  { title: 'Stay Calm', desc: 'Take a deep breath. You have rights. Help is available.' },
  { title: 'Call Emergency', desc: 'Dial 112 for immediate police/ambulance. Stay on line.' },
  { title: 'Know Your Rights', desc: 'Police must identify themselves. You may remain silent.' },
  { title: 'Call Legal Aid', desc: 'Dial 15100 for free lawyer — available 24/7 in all languages.' },
  { title: 'Document Everything', desc: 'Note time, place, names, badge numbers. Take photos if safe.' },
];

export default function EmergencyScreen() {
  const { lang, navigate } = useApp();
  const T = UI_TEXT[lang] || UI_TEXT.en;

  return (
    <div style={styles.container}>
      <div style={styles.topbar}>
        <button style={styles.backBtn} onClick={() => navigate('home')}>‹</button>
        <h2 style={styles.title}>{T.emergencyTitle || 'Emergency Help'}</h2>
      </div>

      <div style={styles.body}>
        {/* Pulse Icon */}
        <div style={styles.pulseWrap}>
          <div style={styles.pulseIcon}>🚨</div>
          <div style={styles.mainTitle}>{T.emergencyHeadline || 'Get Help RIGHT NOW'}</div>
          <div style={styles.mainSub}>{T.emergencySub || 'All calls are FREE · Available 24/7'}</div>
        </div>

        {/* Emergency Numbers Grid */}
        <div style={styles.numGrid}>
          {EMERGENCY_NUMBERS.map(em => (
            <a key={em.num} style={styles.numCard} href={`tel:${em.num.replace(/[^0-9]/g,'')}`}>
              <div style={styles.num}>{em.num}</div>
              <div style={styles.numName}>{em.name}</div>
            </a>
          ))}
        </div>

        {/* Steps */}
        <div style={styles.stepsTitle}>📋 What To Do Right Now</div>
        {STEPS.map((step, i) => (
          <div key={i} style={styles.step}>
            <div style={styles.stepNum}>{i + 1}</div>
            <div>
              <h4 style={styles.stepH}>{step.title}</h4>
              <p style={styles.stepP}>{step.desc}</p>
            </div>
          </div>
        ))}

        {/* AI Help */}
        <button
          style={styles.aiBtn}
          onClick={() => { navigate('chat'); setTimeout(() => window.__nyayaSendQ && window.__nyayaSendQ('I need emergency legal help'), 300); }}
        >
          💬 Chat with NYAYA AI for Legal Help
        </button>

        <div style={{height:80}} />
      </div>
    </div>
  );
}

const styles = {
  container: { background: 'linear-gradient(160deg, #7F1D1D, #991B1B, #B91C1C)', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  topbar: { padding: '20px 16px 14px', display: 'flex', alignItems: 'center', gap: 12 },
  backBtn: { background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  title: { color: 'white', fontSize: 18, fontWeight: 800 },
  body: { padding: '8px 16px 40px', flex: 1, overflowY: 'auto' },
  pulseWrap: { textAlign: 'center', marginBottom: 24 },
  pulseIcon: { width: 72, height: 72, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 16px', animation: 'emergPulse 2s infinite' },
  mainTitle: { color: 'white', fontSize: 22, fontWeight: 900, marginBottom: 4, fontFamily: "'Playfair Display', serif" },
  mainSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  numGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 24 },
  numCard: { background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)', borderRadius: 16, padding: '16px 12px', textAlign: 'center', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s', display: 'block' },
  num: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: 'white' },
  numName: { fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 3, fontWeight: 600 },
  stepsTitle: { color: 'white', fontSize: 16, fontWeight: 800, marginBottom: 12 },
  step: { background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 14, marginBottom: 8, display: 'flex', gap: 14 },
  stepNum: { width: 28, height: 28, background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: 'white', flexShrink: 0 },
  stepH: { fontSize: 13, fontWeight: 800, color: 'white', marginBottom: 3 },
  stepP: { fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 },
  aiBtn: { width: '100%', padding: 16, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 16, color: 'white', fontSize: 14, fontWeight: 800, fontFamily: "'Nunito', sans-serif", cursor: 'pointer', marginTop: 16, transition: 'all 0.2s' },
};
