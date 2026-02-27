// src/components/HomeScreen.jsx
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { UI_TEXT } from '../data/translations';

const QUICK_ACTIONS = [
  { icon: '🚨', label: 'Emergency', screen: 'emergency', color: '#FEF2F2', border: '#FECACA', textColor: '#DC2626' },
  { icon: '💬', label: 'Ask AI',     screen: 'chat' },
  { icon: '📝', label: 'Complain',   screen: 'complaint' },
  { icon: '📍', label: 'Track Case', screen: 'tracking' },
];

const CATEGORIES = [
  { icon: '👮', label: 'Police' }, { icon: '💼', label: 'Labour' },
  { icon: '🏠', label: 'Tenant' }, { icon: '👩', label: 'Women' },
  { icon: '🌾', label: 'Farmer' }, { icon: '🎓', label: 'Student' },
  { icon: '🛒', label: 'Consumer' }, { icon: '💻', label: 'Cyber' },
];

export default function HomeScreen() {
  const { lang, navigate } = useApp();
  const T = UI_TEXT[lang] || UI_TEXT.en;
  const h = new Date().getHours();

  const handleSearch = (q) => {
    navigate('chat');
    setTimeout(() => { if (window.__nyayaSendQ) window.__nyayaSendQ(q); }, 300);
  };

  const handleCatClick = (cat) => {
    navigate('rights');
    setTimeout(() => { if (window.__nyayaOpenCategory) window.__nyayaOpenCategory(cat.label.toLowerCase()); }, 300);
  };

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topbar}>
        <div style={styles.tbRow}>
          <div style={styles.tbLogo}>
            <div style={styles.tbIcon}>N</div>
            <div>
              <div style={styles.tbName}>NYAYA</div>
              <div style={styles.tbSub}>न्याय · JUSTICE FOR ALL</div>
            </div>
          </div>
          <button style={styles.emergBtn} onClick={() => navigate('emergency')}>{T.emergBtn}</button>
        </div>
        <div style={styles.greeting}>{T.greeting(h)}</div>
        <div style={styles.headline}>{T.headline}</div>
      </div>

      {/* Search Bar */}
      <div style={styles.searchWrap}>
        <div style={styles.searchBar} onClick={() => navigate('chat')}>
          <span style={{ fontSize: 18 }}>🔍</span>
          <span style={styles.searchPlaceholder}>{T.searchPlaceholder}</span>
          <button style={styles.micBtn} onClick={e => { e.stopPropagation(); navigate('chat'); }}>🎙️</button>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>{T.quickTitle}</div>
        <div style={styles.quickGrid}>
          {QUICK_ACTIONS.map((qa, i) => (
            <button key={i}
              style={{ ...styles.qaItem, ...(qa.color ? { background: qa.color, border: `2px solid ${qa.border}` } : {}) }}
              onClick={() => navigate(qa.screen)}>
              <span style={styles.qaEmoji}>{qa.icon}</span>
              <span style={{ ...styles.qaLabel, ...(qa.textColor ? { color: qa.textColor } : {}) }}>
                {i === 0 ? (T.emergBtn?.replace('🚨 ', '') || 'Emergency') : qa.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Browse by Category */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>{T.browseTitle}</div>
        <div style={styles.catScroll}>
          {CATEGORIES.map((cat, i) => (
            <button key={i} style={styles.catPill} onClick={() => handleCatClick(cat)}
              onMouseEnter={e => { e.currentTarget.style.background = '#FF6B00'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#FF6B00'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#2D2D2D'; e.currentTarget.style.borderColor = '#E5E7EB'; }}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>{T.featuresTitle}</div>
        <div style={styles.featureGrid}>
          {/* AI Chat — full width */}
          <div style={{ ...styles.featCard, ...styles.featOrange, gridColumn: 'span 2' }} onClick={() => navigate('chat')}>
            <span style={styles.featBadgeAI}>AI</span>
            <span style={styles.featIcon}>💬</span>
            <div style={styles.featTitle}>Ask NYAYA AI</div>
            <div style={styles.featDesc}>Powered by Gemini — 24/7 free legal advice in your language · Voice enabled</div>
          </div>
          {/* Know Rights */}
          <div style={styles.featCard} onClick={() => navigate('rights')}>
            <span style={styles.featIcon}>📜</span>
            <div style={styles.featTitle}>Know Rights</div>
            <div style={styles.featDesc}>Police, labour, tenant, women rights</div>
          </div>
          {/* Find Office */}
          <div style={styles.featCard} onClick={() => navigate('finder')}>
            <span style={styles.featBadgeFree}>FREE</span>
            <span style={styles.featIcon}>🗺️</span>
            <div style={styles.featTitle}>Find Office</div>
            <div style={styles.featDesc}>Nearest legal offices & courts</div>
          </div>
          {/* File Complaint — NEW */}
          <div style={styles.featCard} onClick={() => navigate('complaint')}>
            <span style={{ ...styles.featBadgeAI, background: '#7C3AED' }}>NEW</span>
            <span style={styles.featIcon}>📝</span>
            <div style={styles.featTitle}>File Complaint</div>
            <div style={styles.featDesc}>Submit with tracking ID + police portal</div>
          </div>
          {/* Track Status — NEW */}
          <div style={styles.featCard} onClick={() => navigate('tracking')}>
            <span style={{ ...styles.featBadgeAI, background: '#7C3AED' }}>NEW</span>
            <span style={styles.featIcon}>📍</span>
            <div style={styles.featTitle}>Track Status</div>
            <div style={styles.featDesc}>Real-time police enquiry updates</div>
          </div>
          {/* Get Letters */}
          <div style={styles.featCard} onClick={() => navigate('docs')}>
            <span style={styles.featIcon}>📋</span>
            <div style={styles.featTitle}>Get Letters</div>
            <div style={styles.featDesc}>Ready complaint templates to print</div>
          </div>
          {/* Free Lawyer */}
          <div style={{ ...styles.featCard, ...styles.featDark }} onClick={() => navigate('lawyer')}>
            <span style={styles.featIcon}>🤝</span>
            <div style={styles.featTitle}>Free Lawyer</div>
            <div style={styles.featDesc}>Article 39A — FREE for eligible</div>
          </div>
          {/* Govt Portal — full width */}
          <div style={{ ...styles.featCard, background: 'linear-gradient(135deg, #1D4ED8, #1E40AF)', color: 'white', gridColumn: 'span 2' }} onClick={() => navigate('govt')}>
            <span style={styles.featIcon}>🏛️</span>
            <div style={styles.featTitle}>Government Portal</div>
            <div style={styles.featDesc}>Oversight dashboard — all complaints tracked by authorities</div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div style={{ ...styles.section, paddingBottom: 100 }}>
        <div style={styles.sectionTitle}>Common Problems</div>
        <div style={styles.suggWrap}>
          {(T.suggestions || []).map((s, i) => (
            <button key={i} style={styles.suggItem}
              onClick={() => handleSearch(s.q)}
              onMouseEnter={e => { e.currentTarget.style.background = '#FF6B00'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#2D2D2D'; }}>
              {s.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#F8F5F0', minHeight: '100vh' },
  topbar: { background: '#16213E', padding: '16px 20px 24px', borderRadius: '0 0 24px 24px' },
  tbRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  tbLogo: { display: 'flex', alignItems: 'center', gap: 8 },
  tbIcon: { width: 34, height: 34, background: 'linear-gradient(135deg,#FF6B00,#F59E0B)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 900, color: 'white' },
  tbName: { fontSize: 18, fontWeight: 900, fontFamily: "'Playfair Display',serif", background: 'linear-gradient(90deg,#FF6B00,#F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  tbSub: { fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: 1 },
  emergBtn: { background: '#DC2626', color: 'white', border: 'none', borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 800, fontFamily: "'Nunito',sans-serif", cursor: 'pointer', animation: 'emergPulse 2s infinite' },
  greeting: { color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 4 },
  headline: { color: 'white', fontSize: 18, fontWeight: 800, lineHeight: 1.4 },
  searchWrap: { padding: '0 16px', marginTop: '-12px', position: 'relative', zIndex: 10 },
  searchBar: { display: 'flex', alignItems: 'center', gap: 10, background: 'white', border: '2px solid #E5E7EB', borderRadius: 50, padding: '12px 16px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', cursor: 'pointer' },
  searchPlaceholder: { flex: 1, fontSize: 14, color: '#6B7280', userSelect: 'none' },
  micBtn: { width: 36, height: 36, background: 'linear-gradient(135deg,#FF6B00,#F59E0B)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, border: 'none' },
  section: { padding: '16px 16px 0' },
  sectionTitle: { fontSize: 13, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },
  quickGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 },
  qaItem: { background: 'white', borderRadius: 16, padding: '14px 8px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', border: '2px solid transparent', fontFamily: "'Nunito',sans-serif" },
  qaEmoji: { fontSize: 26, display: 'block', marginBottom: 5 },
  qaLabel: { fontSize: 10, fontWeight: 700, color: '#2D2D2D', lineHeight: 1.3 },
  catScroll: { display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' },
  catPill: { display: 'flex', alignItems: 'center', gap: 6, background: 'white', border: '2px solid #E5E7EB', borderRadius: 50, padding: '9px 16px', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', flexShrink: 0, fontSize: 13, fontWeight: 700, color: '#2D2D2D', fontFamily: "'Nunito',sans-serif" },
  featureGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  featCard: { background: 'white', borderRadius: 16, padding: 18, cursor: 'pointer', transition: 'all 0.25s', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden', border: '2px solid transparent' },
  featOrange: { background: 'linear-gradient(135deg,#FF6B00,#FF8C42)', color: 'white' },
  featDark: { background: 'linear-gradient(135deg,#1A1A2E,#16213E)', color: 'white' },
  featIcon: { fontSize: 28, marginBottom: 10, display: 'block' },
  featTitle: { fontSize: 14, fontWeight: 800, marginBottom: 3 },
  featDesc: { fontSize: 11, lineHeight: 1.5, opacity: 0.7 },
  featBadgeAI: { position: 'absolute', top: 12, right: 12, background: '#2563EB', color: 'white', fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 100 },
  featBadgeFree: { position: 'absolute', top: 12, right: 12, background: '#059669', color: 'white', fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 100 },
  suggWrap: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  suggItem: { background: 'white', border: '1.5px solid #E5E7EB', borderRadius: 20, padding: '8px 14px', fontSize: 12, fontWeight: 700, fontFamily: "'Nunito',sans-serif", cursor: 'pointer', color: '#2D2D2D', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
};
