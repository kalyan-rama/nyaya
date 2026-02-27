// src/components/RightsScreen.jsx — FIXED: Full multilingual support
import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { UI_TEXT, RIGHTS_CATEGORIES, RIGHTS_HELP_CARD } from '../data/translations';
import { RIGHTS_DATA } from '../data/legalData';

export default function RightsScreen() {
  const { lang, navigate } = useApp();
  const T = UI_TEXT[lang] || UI_TEXT.en;
  const HelpCard = RIGHTS_HELP_CARD[lang] || RIGHTS_HELP_CARD.en;

  // Use translated categories — fallback to English
  const CATEGORIES = RIGHTS_CATEGORIES[lang] || RIGHTS_CATEGORIES.en;

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState(null);

  // Reset search when language changes
  useEffect(() => { setSearch(''); }, [lang]);

  // Expose openCategory globally (for HomeScreen quick links)
  useEffect(() => {
    window.__nyayaOpenCategory = (cat) => setSelectedCat(cat);
    return () => { delete window.__nyayaOpenCategory; };
  }, []);

  const filtered = CATEGORIES.filter(c =>
    !search || c.label.toLowerCase().includes(search.toLowerCase())
  );

  // ── Detail view ──────────────────────────────────────────────────────────
  if (selectedCat) {
    const data = RIGHTS_DATA[selectedCat];
    if (!data) return null;
    return (
      <div style={styles.container}>
        <div style={styles.topbar}>
          <button style={styles.backBtn} onClick={() => setSelectedCat(null)}>‹</button>
          <h2 style={styles.topTitle}>{data.title}</h2>
        </div>
        <div style={styles.body}>
          {data.items.map((item, i) => (
            <div key={i} style={styles.rdItem}>
              <h4 style={styles.rdH}>{item.h}</h4>
              <p style={styles.rdP}>{item.p}</p>
              <div style={styles.rdLaw}>📜 {item.lr}</div>
            </div>
          ))}

          {/* Help card — fully translated */}
          <div style={styles.helpCard}>
            <div style={styles.helpTitle}>{HelpCard.title}</div>
            <div style={styles.helpChips}>
              <button style={styles.chip} onClick={() => navigate('finder')}>{HelpCard.findOffice}</button>
              <button style={styles.chip} onClick={() => navigate('chat')}>{HelpCard.askAI}</button>
              <button style={styles.chip} onClick={() => navigate('lawyer')}>{HelpCard.freeLawyer}</button>
            </div>
          </div>
          <div style={{height:100}} />
        </div>
      </div>
    );
  }

  // ── Category grid ────────────────────────────────────────────────────────
  return (
    <div style={styles.container}>
      <div style={styles.topbar}>
        <button style={styles.backBtn} onClick={() => navigate('home')}>‹</button>
        <h2 style={styles.topTitle}>{T.rightsTitle}</h2>
      </div>
      <div style={styles.body}>
        <div style={styles.searchBar}>
          <span style={{fontSize:16}}>🔍</span>
          <input
            style={styles.searchInput}
            placeholder={T.rightsSearch}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={styles.catGrid}>
          {filtered.map(cat => (
            <div key={cat.key} style={styles.catCard} onClick={() => setSelectedCat(cat.key)}>
              <span style={styles.catEm}>{cat.icon}</span>
              <div style={styles.catT}>{cat.label}</div>
              <div style={styles.catCount}>{cat.count} ★</div>
            </div>
          ))}
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
  topTitle: { fontSize: 18, fontWeight: 800 },
  body: { padding: 16, flex: 1 },
  searchBar: { display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '2px solid #E5E7EB', borderRadius: 50, padding: '11px 16px', marginBottom: 16 },
  searchInput: { flex: 1, border: 'none', outline: 'none', fontSize: 14, fontFamily: "'Nunito', sans-serif", background: 'transparent', color: '#2D2D2D' },
  catGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  catCard: { background: 'white', borderRadius: 16, padding: 18, cursor: 'pointer', transition: 'all 0.25s', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', border: '2px solid transparent', position: 'relative', overflow: 'hidden' },
  catEm: { fontSize: 34, marginBottom: 10, display: 'block' },
  catT: { fontSize: 13, fontWeight: 800, marginBottom: 3, lineHeight: 1.4 },
  catCount: { fontSize: 10, color: '#FF6B00', fontWeight: 700, marginTop: 6 },
  rdItem: { background: 'white', borderRadius: 16, padding: 18, marginBottom: 10, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', borderLeft: '4px solid #FF6B00' },
  rdH: { fontSize: 14, fontWeight: 800, color: '#FF6B00', marginBottom: 6 },
  rdP: { fontSize: 13, color: '#6B7280', lineHeight: 1.65 },
  rdLaw: { fontSize: 11, color: '#F59E0B', fontWeight: 700, marginTop: 8 },
  helpCard: { background: '#FFF0E6', border: '1.5px solid #FFD4B3', borderRadius: 16, padding: 16, marginTop: 8 },
  helpTitle: { fontSize: 13, fontWeight: 800, color: '#FF6B00', marginBottom: 10 },
  helpChips: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  chip: { background: 'white', border: '1.5px solid #E5E7EB', borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 700, fontFamily: "'Nunito', sans-serif", cursor: 'pointer', color: '#2D2D2D' },
};
