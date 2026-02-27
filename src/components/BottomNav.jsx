// src/components/BottomNav.jsx
import React from 'react';
import { useApp } from '../contexts/AppContext';
import { UI_TEXT } from '../data/translations';

const NAV_ITEMS = [
  { screen: 'home',      icon: '🏠', labelKey: 'navHome' },
  { screen: 'chat',      icon: '💬', labelKey: 'navChat' },
  { screen: 'rights',    icon: '📜', labelKey: 'navRights' },
  { screen: 'complaint', icon: '📝', labelKey: 'navComplain' },
  { screen: 'tracking',  icon: '📍', labelKey: 'navTrack' },
  { screen: 'docs',      icon: '📋', labelKey: 'navDocs' },
];

export default function BottomNav() {
  const { lang, screen, navigate } = useApp();
  const T = UI_TEXT[lang] || UI_TEXT.en;

  if (['splash', 'emergency'].includes(screen)) return null;

  return (
    <nav style={styles.nav} className="no-print">
      {NAV_ITEMS.map(item => {
        const isActive = screen === item.screen;
        return (
          <button
            key={item.screen}
            style={{ ...styles.navItem, ...(isActive ? styles.navItemActive : {}) }}
            onClick={() => navigate(item.screen)}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            <span style={{ ...styles.navLabel, ...(isActive ? styles.navLabelActive : {}) }}>
              {T[item.labelKey] || item.screen}
            </span>
            {isActive && <span style={styles.navDot} />}
          </button>
        );
      })}
    </nav>
  );
}

const styles = {
  nav: { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, background: 'white', borderTop: '1px solid #E5E7EB', display: 'flex', padding: '6px 0 18px', zIndex: 100, boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' },
  navItem: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, cursor: 'pointer', padding: '5px 2px', transition: 'all 0.2s', border: 'none', background: 'transparent', fontFamily: "'Nunito', sans-serif" },
  navItemActive: {},
  navIcon: { fontSize: 20, lineHeight: 1 },
  navLabel: { fontSize: 9, fontWeight: 700, color: '#6B7280' },
  navLabelActive: { color: '#FF6B00' },
  navDot: { width: 4, height: 4, borderRadius: '50%', background: '#FF6B00', marginTop: 1 },
};
