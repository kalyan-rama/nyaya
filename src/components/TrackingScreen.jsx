// src/components/TrackingScreen.jsx
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';

const STATUS_META = {
  pending:   { cls: { background: '#FFF7ED', color: '#C2410C' }, label: '🟡 Pending' },
  enquiry:   { cls: { background: '#EFF6FF', color: '#1D4ED8' }, label: '🔵 Police Enquiry' },
  confirmed: { cls: { background: '#ECFDF5', color: '#065F46' }, label: '🟢 Confirmed' },
  resolved:  { cls: { background: '#F3F4F6', color: '#374151' }, label: '✅ Resolved' },
};

function ComplaintCard({ c }) {
  const meta = STATUS_META[c.status] || STATUS_META.pending;
  return (
    <div style={S.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#FF6B00', letterSpacing: 1 }}>{c.id}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A2E', marginTop: 2 }}>{c.category}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{c.location} · {c.date}</div>
        </div>
        <div style={{ ...S.badge, ...meta.cls }}>{meta.label}</div>
      </div>
      <div style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.5, marginBottom: 12, padding: 8, background: '#F9FAFB', borderRadius: 8 }}>
        {(c.description || '').slice(0, 120)}{c.description?.length > 120 ? '...' : ''}
      </div>
      {/* Timeline */}
      {(c.timeline || []).map((t, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, marginTop: 3, border: '2px solid #E5E7EB', background: t.done ? '#059669' : 'white', borderColor: t.done ? '#059669' : '#E5E7EB' }} />
            {i < c.timeline.length - 1 && <div style={{ width: 2, flex: 1, background: t.done ? '#059669' : '#E5E7EB', marginTop: 2 }} />}
          </div>
          <div style={{ paddingBottom: i < c.timeline.length - 1 ? 8 : 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.done ? '#1A1A2E' : '#9CA3AF' }}>{t.l}</div>
            <div style={{ fontSize: 11, color: '#9CA3AF' }}>{t.s}</div>
            {t.dt && <div style={{ fontSize: 10, color: '#FF6B00', fontWeight: 700, marginTop: 1 }}>{t.dt}</div>}
          </div>
        </div>
      ))}
      <div style={{ marginTop: 10, padding: 8, background: '#EFF6FF', borderRadius: 8, fontSize: 11, color: '#1D4ED8', fontWeight: 700 }}>
        📧 Updates → {c.email}
      </div>
    </div>
  );
}

export default function TrackingScreen() {
  const { navigate, complaints } = useApp();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const search = () => {
    const id = query.trim().toUpperCase();
    if (!id) return;
    setSearched(true);
    setResult(complaints.find(c => c.id === id) || null);
  };

  return (
    <div style={S.page}>
      {/* Dark header */}
      <div style={S.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <button style={S.back} onClick={() => navigate('home')}>‹</button>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>📍 Complaint Tracker</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Real-time police enquiry updates</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input style={S.searchIn}
            placeholder="Enter Tracking ID (e.g. NYA-AB3K9)"
            value={query}
            onChange={e => setQuery(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && search()}
          />
          <button style={S.searchBtn} onClick={search}>Track</button>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Search result */}
        {searched && (
          result
            ? <><div style={S.sectionTitle}>Result for {query}</div><ComplaintCard c={result} /></>
            : <div style={S.notFound}><div style={{ fontSize: 28, marginBottom: 8 }}>❌</div><div style={{ fontWeight: 800, color: '#DC2626' }}>Tracking ID Not Found</div></div>
        )}

        {/* All complaints */}
        <div style={S.sectionTitle}>My Complaints</div>
        {complaints.length === 0
          ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9CA3AF' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>No complaints filed yet</div>
              <button style={{ marginTop: 16, background: '#FF6B00', color: 'white', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 800, fontFamily: "'Nunito',sans-serif", cursor: 'pointer' }} onClick={() => navigate('complaint')}>
                📝 File Complaint
              </button>
            </div>
          )
          : [...complaints].reverse().map(c => <ComplaintCard key={c.id} c={c} />)
        }
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}

const S = {
  page: { background: '#F8F5F0', minHeight: '100vh' },
  header: { background: 'linear-gradient(135deg,#1A1A2E,#16213E)', padding: 20, borderRadius: '0 0 20px 20px', marginBottom: 16 },
  back: { background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  searchIn: { flex: 1, border: '2px solid rgba(255,255,255,0.2)', borderRadius: 10, padding: '11px 14px', fontSize: 14, color: 'white', background: 'rgba(255,255,255,0.1)', fontFamily: "'Nunito',sans-serif", outline: 'none' },
  searchBtn: { background: '#FF6B00', color: 'white', border: 'none', borderRadius: 10, padding: '11px 18px', fontSize: 14, fontWeight: 800, fontFamily: "'Nunito',sans-serif", cursor: 'pointer', flexShrink: 0 },
  sectionTitle: { fontSize: 13, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  card: { background: 'white', borderRadius: 16, padding: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: 12, borderLeft: '4px solid #FF6B00', animation: 'fadeUp 0.3s ease' },
  badge: { fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 100, flexShrink: 0 },
  notFound: { background: '#FEF2F2', borderRadius: 12, padding: 20, textAlign: 'center', marginBottom: 16 },
};
