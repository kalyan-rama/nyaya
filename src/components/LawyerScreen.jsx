// src/components/LawyerScreen.jsx
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { UI_TEXT } from '../data/translations';

const QUALIFIERS = [
  'Annual income below ₹3 lakh',
  'Women — for any case',
  'SC / ST persons',
  'Persons with disabilities',
  'Children under 18',
  'Anyone who is in custody',
  'Victims of trafficking',
  'Industrial workmen',
];

const DLSA_OFFICES = [
  { city: 'Hyderabad', addr: 'District Court, Nampally', phone: '040-23214233', hours: 'Mon–Sat 10AM–5PM', lat: 17.3810, lng: 78.4740 },
  { city: 'Mumbai', addr: 'City Civil Court, Fort, Mumbai', phone: '022-22621234', hours: 'Mon–Fri 10AM–5PM', lat: 18.9333, lng: 72.8358 },
  { city: 'Delhi', addr: 'Patiala House Courts, New Delhi', phone: '011-23387013', hours: 'Mon–Sat 10AM–5PM', lat: 28.6213, lng: 77.2400 },
  { city: 'Chennai', addr: 'High Court Campus, Chennai', phone: '044-25340404', hours: 'Mon–Fri 10AM–5PM', lat: 13.0523, lng: 80.2802 },
];

export default function LawyerScreen() {
  const { lang, navigate } = useApp();
  const T = UI_TEXT[lang] || UI_TEXT.en;

  const openDirections = (office) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}&travelmode=driving&dir_action=navigate`;
    window.open(url, '_blank');
  };

  return (
    <div style={styles.container}>
      <div style={styles.topbar} className="no-print">
        <button style={styles.backBtn} onClick={() => navigate('home')}>‹</button>
        <h2 style={styles.title}>{T.lawyerTitle}</h2>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <h2 style={styles.heroH2}>{T.lawyerH2}</h2>
        <p style={styles.heroP}>{T.lawyerP}</p>
        <a style={styles.callBtn} href="tel:15100">
          {T.lawyerCall}
        </a>
      </div>

      <div style={styles.body}>
        {/* Qualifier List */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>{T.lawyerWho}</h3>
          {QUALIFIERS.map((q, i) => (
            <div key={i} style={styles.qualRow}>
              <span style={styles.check}>✅</span>
              <span style={styles.qualText}>{q}</span>
            </div>
          ))}
        </div>

        {/* DLSA Offices */}
        <div style={styles.sectionTitle}>DLSA Offices Near You</div>
        {DLSA_OFFICES.map((o, i) => (
          <div key={i} style={styles.dlsaCard}>
            <div style={styles.dlsaCity}>📍 {o.city} DLSA</div>
            <div style={styles.dlsaAddr}>{o.addr}</div>
            <div style={styles.dlsaInfo}>📞 {o.phone} &nbsp; ⏰ {o.hours}</div>
            <div style={styles.dlsaActions}>
              <a style={styles.dlsaCall} href={`tel:${o.phone.replace(/[^0-9]/g,'')}`}>📞 Call</a>
              <button style={styles.dlsaDir} onClick={() => openDirections(o)}>🗺️ Directions</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{height:100}} />
    </div>
  );
}

const styles = {
  container: { background: '#F8F5F0', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  topbar: { background: 'white', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 50 },
  backBtn: { width: 36, height: 36, borderRadius: '50%', background: '#F8F5F0', border: 'none', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 800 },
  hero: { background: 'linear-gradient(135deg, #FF6B00, #F59E0B)', padding: '24px 20px', textAlign: 'center', color: 'white' },
  heroH2: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, marginBottom: 8 },
  heroP: { fontSize: 13, opacity: 0.9, lineHeight: 1.6, marginBottom: 16 },
  callBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)', borderRadius: 50, padding: '14px 24px', fontSize: 16, fontWeight: 900, color: 'white', textDecoration: 'none', cursor: 'pointer' },
  body: { padding: 16 },
  card: { background: 'white', borderRadius: 16, padding: 16, marginBottom: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' },
  cardTitle: { fontSize: 14, fontWeight: 800, color: '#059669', marginBottom: 12 },
  qualRow: { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13 },
  check: { fontSize: 16, flexShrink: 0 },
  qualText: { color: '#2D2D2D' },
  sectionTitle: { fontSize: 14, fontWeight: 800, marginBottom: 10 },
  dlsaCard: { background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: 10 },
  dlsaCity: { fontSize: 14, fontWeight: 800, color: '#FF6B00', marginBottom: 4 },
  dlsaAddr: { fontSize: 12, color: '#6B7280', marginBottom: 2 },
  dlsaInfo: { fontSize: 12, color: '#6B7280', marginBottom: 8 },
  dlsaActions: { display: 'flex', gap: 8 },
  dlsaCall: { flex: 1, padding: 8, borderRadius: 8, border: '1.5px solid #FECACA', background: '#FEF2F2', fontSize: 12, fontWeight: 700, fontFamily: "'Nunito', sans-serif", cursor: 'pointer', textDecoration: 'none', textAlign: 'center', display: 'block', color: '#DC2626' },
  dlsaDir: { flex: 1, padding: 8, borderRadius: 8, border: '1.5px solid #BFDBFE', background: '#EFF6FF', fontSize: 12, fontWeight: 700, fontFamily: "'Nunito', sans-serif", cursor: 'pointer', textAlign: 'center', color: '#2563EB' },
};
