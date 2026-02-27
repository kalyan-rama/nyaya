// src/components/FinderScreen.jsx — FIXED: Full multilingual support
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { UI_TEXT, FINDER_TYPES, EMERGENCY_LABELS, FINDER_LOCATION_BANNER } from '../data/translations';
import { OFFICES } from '../data/legalData';

export default function FinderScreen() {
  const { lang, navigate } = useApp();
  const T = UI_TEXT[lang] || UI_TEXT.en;

  // Translated filter tabs
  const TYPES = FINDER_TYPES[lang] || FINDER_TYPES.en;
  // Translated emergency labels
  const EM = EMERGENCY_LABELS[lang] || EMERGENCY_LABELS.en;
  // Translated location banner
  const BAN = FINDER_LOCATION_BANNER[lang] || FINDER_LOCATION_BANNER.en;

  const [activeType, setActiveType] = useState('labour');

  const openDirections = (office) => {
    if (office.lat && office.lng) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}&travelmode=driving&dir_action=navigate`, '_blank');
    } else if (office.addr && office.addr.includes('.')) {
      window.open('https://' + office.addr, '_blank');
    } else {
      const encoded = encodeURIComponent(office.addr + ', India');
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${encoded}&travelmode=driving&dir_action=navigate`, '_blank');
    }
  };

  const openMap = (office) => {
    if (office.lat && office.lng) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${office.lat},${office.lng}`, '_blank');
    } else {
      const encoded = encodeURIComponent(office.name + ' ' + office.addr);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
    }
  };

  const offices = OFFICES[activeType] || [];

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topbar} className="no-print">
        <button style={styles.backBtn} onClick={() => navigate('home')}>‹</button>
        <h2 style={styles.title}>{T.finderTitle}</h2>
      </div>

      <div style={styles.body}>
        {/* Type Filter — translated */}
        <div style={styles.typeScroll}>
          {TYPES.map(t => (
            <button
              key={t.key}
              style={{ ...styles.typeTag, ...(activeType === t.key ? styles.typeTagSel : {}) }}
              onClick={() => setActiveType(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Location Info Banner — translated */}
        <div style={styles.infoBanner}>
          <span style={{fontSize:16}}>📍</span>
          <div>
            <div style={{fontSize:13,fontWeight:700}}>{BAN.city}</div>
            <div style={{fontSize:11,color:'#6B7280'}}>{BAN.hint}</div>
          </div>
        </div>

        {/* Office Cards */}
        {offices.map((office, i) => (
          <div key={i} style={styles.officeCard}>
            <div style={styles.ocIcon}>{office.icon}</div>
            <div style={styles.ocInfo}>
              <div style={styles.ocName}>{office.name}</div>
              <div style={styles.ocAddr}>📍 {office.addr}</div>
              <div style={styles.ocHours}>⏰ {office.hours} &nbsp; <span style={styles.ocDist}>📏 {office.dist}</span></div>
              <div style={styles.ocDesc}>{office.desc}</div>
              <div style={styles.ocActions}>
                <a
                  style={styles.ocBtnCall}
                  href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}
                >
                  📞 {office.phone}
                </a>
                <button
                  style={styles.ocBtnDir}
                  onClick={() => openDirections(office)}
                  title="Get turn-by-turn directions on Google Maps"
                >
                  {T.directions || '🗺️ Directions'}
                </button>
              </div>
              {office.lat && (
                <button style={styles.mapLink} onClick={() => openMap(office)}>
                  {T.viewMap || '📌 View on Google Maps'}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Emergency Numbers — translated */}
        <div style={styles.emergCard}>
          <div style={styles.emergTitle}>{EM.title}</div>
          <div style={styles.emergGrid}>
            {[
              {num:'100',          name: EM.police},
              {num:'112',          name: EM.all},
              {num:'181',          name: EM.women},
              {num:'15100',        name: EM.legal},
              {num:'1930',         name: EM.cyber},
              {num:'1800-11-4000', name: EM.consumer},
            ].map((em, i) => (
              <a key={i} style={styles.emergItem} href={`tel:${em.num.replace(/[^0-9]/g,'')}`}>
                <div style={styles.emergNum}>{em.num}</div>
                <div style={styles.emergName}>{em.name}</div>
              </a>
            ))}
          </div>
        </div>

        <div style={{height:100}} />
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#F8F5F0', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  topbar: { background: 'white', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 50 },
  backBtn: { width: 36, height: 36, borderRadius: '50%', background: '#F8F5F0', border: 'none', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 800 },
  body: { padding: 16, flex: 1 },
  typeScroll: { display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' },
  typeTag: { background: 'white', border: '2px solid #E5E7EB', borderRadius: 50, padding: '9px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s', flexShrink: 0, fontFamily: "'Nunito', sans-serif", color: '#2D2D2D' },
  typeTagSel: { background: '#FF6B00', borderColor: '#FF6B00', color: 'white' },
  infoBanner: { display: 'flex', alignItems: 'center', gap: 10, background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '10px 14px', marginBottom: 14 },
  officeCard: { background: 'white', borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', display: 'flex', gap: 12 },
  ocIcon: { width: 44, height: 44, background: '#FFF0E6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 },
  ocInfo: { flex: 1 },
  ocName: { fontSize: 14, fontWeight: 800, marginBottom: 3 },
  ocAddr: { fontSize: 12, color: '#6B7280', marginBottom: 2 },
  ocHours: { fontSize: 11, color: '#059669', fontWeight: 700, marginBottom: 3 },
  ocDist: { fontSize: 11, color: '#FF6B00', fontWeight: 700 },
  ocDesc: { fontSize: 11, color: '#6B7280', marginBottom: 8 },
  ocActions: { display: 'flex', gap: 8, marginBottom: 8 },
  ocBtnCall: { flex: 1, padding: 8, borderRadius: 8, border: '1.5px solid #FECACA', background: '#FEF2F2', fontSize: 12, fontWeight: 700, fontFamily: "'Nunito', sans-serif", cursor: 'pointer', textDecoration: 'none', textAlign: 'center', display: 'block', color: '#DC2626' },
  ocBtnDir: { flex: 1, padding: 8, borderRadius: 8, border: '1.5px solid #BFDBFE', background: '#EFF6FF', fontSize: 12, fontWeight: 700, fontFamily: "'Nunito', sans-serif", cursor: 'pointer', textAlign: 'center', color: '#2563EB', transition: 'all 0.2s' },
  mapLink: { background: 'none', border: 'none', fontSize: 11, color: '#2563EB', cursor: 'pointer', fontFamily: "'Nunito', sans-serif", fontWeight: 600, padding: 0, textDecoration: 'underline' },
  emergCard: { background: 'linear-gradient(135deg, #7F1D1D, #991B1B)', borderRadius: 16, padding: 16, marginTop: 8 },
  emergTitle: { color: 'white', fontSize: 15, fontWeight: 800, marginBottom: 12 },
  emergGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 },
  emergItem: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '12px 8px', textAlign: 'center', textDecoration: 'none', display: 'block', transition: 'all 0.2s' },
  emergNum: { fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: 'white' },
  emergName: { fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 2, fontWeight: 600 },
};
