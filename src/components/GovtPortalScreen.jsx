// src/components/GovtPortalScreen.jsx
// ─────────────────────────────────────────────────────────────────────────────
// NYAYA — Government Portal with Password Protection
// Password: NYAYA@GOV2024
// Locked after 5 wrong attempts (resets on page refresh)
// Session persists while app is open (cleared on navigate away & return)
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

// ── Password config ──────────────────────────────────────────────────────────
// Change GOVT_PASSWORD to whatever password you want
const GOVT_PASSWORD   = 'NYAYA@GOV2024';
const MAX_ATTEMPTS    = 5;
const LOCKOUT_MINUTES = 10;

// Simple hash — avoids storing plain password in memory after check
function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h.toString(36);
}
const CORRECT_HASH = hashStr(GOVT_PASSWORD);

// Status badge config
const STATUS_META = {
  pending:   { bg: '#FFF7ED', color: '#C2410C', label: 'Pending',   dot: '#F97316' },
  enquiry:   { bg: '#EFF6FF', color: '#1D4ED8', label: 'Enquiry',   dot: '#3B82F6' },
  confirmed: { bg: '#ECFDF5', color: '#065F46', label: 'Confirmed', dot: '#10B981' },
  resolved:  { bg: '#F3F4F6', color: '#374151', label: 'Resolved',  dot: '#9CA3AF' },
};

// ── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onSuccess }) {
  const [pwd, setPwd]         = useState('');
  const [show, setShow]       = useState(false);
  const [error, setError]     = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(null);
  const [shake, setShake]     = useState(false);
  const [checking, setChecking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  // Countdown timer for lockout
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    if (!lockUntil) return;
    const tick = setInterval(() => {
      const left = Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) { setLockUntil(null); setAttempts(0); setError(''); clearInterval(tick); }
    }, 1000);
    return () => clearInterval(tick);
  }, [lockUntil]);

  const isLocked = lockUntil && Date.now() < lockUntil;
  const leftAttempts = MAX_ATTEMPTS - attempts;

  const handleSubmit = async () => {
    if (isLocked || checking) return;
    if (!pwd.trim()) { setError('Please enter the password.'); return; }

    setChecking(true);
    // Small delay for UX realism
    await new Promise(r => setTimeout(r, 500));
    setChecking(false);

    if (hashStr(pwd) === CORRECT_HASH) {
      setError('');
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPwd('');
      setShake(true);
      setTimeout(() => setShake(false), 600);

      if (newAttempts >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_MINUTES * 60 * 1000;
        setLockUntil(until);
        setRemaining(LOCKOUT_MINUTES * 60);
        setError(`Too many failed attempts. Portal locked for ${LOCKOUT_MINUTES} minutes.`);
      } else {
        const left = MAX_ATTEMPTS - newAttempts;
        setError(`Incorrect password. ${left} attempt${left > 1 ? 's' : ''} remaining.`);
      }
    }
  };

  const fmtTime = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <div style={L.page}>
      <style>{`
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .shake{animation:shake 0.5s ease}
        .lock-card{animation:fadeIn 0.4s ease}
        input[type=password]:focus,input[type=text]:focus{outline:none;border-color:#1D4ED8!important;box-shadow:0 0 0 3px rgba(29,78,216,0.15)!important}
      `}</style>

      {/* Background pattern */}
      <div style={L.bg}/>

      <div className="lock-card" style={L.card}>
        {/* Emblem */}
        <div style={L.emblemWrap}>
          <div style={L.emblem}>🏛️</div>
          <div style={L.lockIcon}>{isLocked ? '🔒' : '🔐'}</div>
        </div>

        <div style={L.ministry}>MINISTRY OF HOME AFFAIRS</div>
        <div style={L.title}>Government Portal</div>
        <div style={L.subtitle}>Restricted Access — Authorised Personnel Only</div>

        <div style={L.divider}/>

        {/* Lockout banner */}
        {isLocked ? (
          <div style={L.lockoutBox}>
            <div style={L.lockoutIcon}>⛔</div>
            <div style={L.lockoutTitle}>Portal Temporarily Locked</div>
            <div style={L.lockoutSub}>Too many incorrect attempts detected</div>
            <div style={L.lockoutTimer}>{fmtTime(remaining)}</div>
            <div style={L.lockoutHint}>Please wait before trying again</div>
          </div>
        ) : (
          <>
            {/* Input */}
            <div style={L.fieldLabel}>Access Password</div>
            <div
              className={shake ? 'shake' : ''}
              style={{...L.inputWrap, ...(error ? L.inputWrapErr : {})}}
            >
              <span style={L.inputIcon}>🔑</span>
              <input
                ref={inputRef}
                type={show ? 'text' : 'password'}
                value={pwd}
                onChange={e => { setPwd(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="Enter portal password"
                style={L.input}
                disabled={checking}
                autoComplete="off"
                maxLength={30}
              />
              <button style={L.eyeBtn} onClick={() => setShow(v => !v)} tabIndex={-1}>
                {show ? '🙈' : '👁️'}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={L.errorBox}>
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Attempt dots */}
            {attempts > 0 && !error.includes('locked') && (
              <div style={L.dotsRow}>
                {Array.from({length: MAX_ATTEMPTS}).map((_, i) => (
                  <div key={i} style={{...L.dot, background: i < attempts ? '#EF4444' : '#E5E7EB'}}/>
                ))}
                <span style={L.dotsLabel}>{leftAttempts} attempt{leftAttempts !== 1 ? 's' : ''} left</span>
              </div>
            )}

            {/* Submit */}
            <button
              style={{...L.btn, ...(checking ? L.btnLoading : {})}}
              onClick={handleSubmit}
              disabled={checking || !pwd.trim()}
            >
              {checking
                ? <><span style={{animation:'spin 0.8s linear infinite',display:'inline-block'}}>⏳</span> Verifying...</>
                : '🔓 Access Portal'}
            </button>
          </>
        )}

        <div style={L.footer}>
          <div style={L.footerLine}>🔒 Encrypted · Secured · Authorised Use Only</div>
          <div style={L.footerLine}>NYAYA Platform · Ministry of Home Affairs</div>
        </div>
      </div>
    </div>
  );
}

// ── Login Styles ─────────────────────────────────────────────────────────────
const L = {
  page:{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,#0F172A 0%,#1E3A8A 50%,#1D4ED8 100%)',padding:'20px',boxSizing:'border-box',position:'relative',overflow:'hidden'},
  bg:{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 20% 50%,rgba(255,255,255,0.03) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(255,255,255,0.05) 0%,transparent 40%)',pointerEvents:'none'},
  card:{background:'white',borderRadius:24,padding:'36px 32px',width:'100%',maxWidth:400,boxShadow:'0 25px 80px rgba(0,0,0,0.4)',position:'relative',zIndex:1},
  emblemWrap:{display:'flex',justifyContent:'center',alignItems:'flex-end',marginBottom:16,position:'relative'},
  emblem:{fontSize:56,lineHeight:1},
  lockIcon:{position:'absolute',right:'calc(50% - 40px)',bottom:-4,fontSize:20,background:'white',borderRadius:'50%',padding:2},
  ministry:{fontSize:10,fontWeight:900,letterSpacing:2.5,color:'#6B7280',textAlign:'center',textTransform:'uppercase',marginBottom:6},
  title:{fontSize:22,fontWeight:900,color:'#1A1A2E',textAlign:'center',fontFamily:"'Playfair Display',serif",marginBottom:4},
  subtitle:{fontSize:11,color:'#9CA3AF',textAlign:'center',marginBottom:16},
  divider:{height:1,background:'linear-gradient(to right,transparent,#E5E7EB,transparent)',marginBottom:20},
  fieldLabel:{fontSize:12,fontWeight:800,color:'#374151',marginBottom:8,letterSpacing:0.5},
  inputWrap:{display:'flex',alignItems:'center',border:'2px solid #E5E7EB',borderRadius:12,overflow:'hidden',background:'#F9FAFB',marginBottom:12,transition:'all 0.2s'},
  inputWrapErr:{borderColor:'#FCA5A5',background:'#FFF5F5'},
  inputIcon:{padding:'0 12px',fontSize:18},
  input:{flex:1,border:'none',background:'transparent',padding:'13px 8px',fontSize:14,fontFamily:"'Nunito',sans-serif",color:'#1A1A2E',outline:'none'},
  eyeBtn:{background:'none',border:'none',cursor:'pointer',padding:'0 12px',fontSize:18},
  errorBox:{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:10,padding:'10px 14px',fontSize:12,color:'#DC2626',fontWeight:700,marginBottom:12,display:'flex',alignItems:'center',gap:6},
  dotsRow:{display:'flex',alignItems:'center',gap:6,marginBottom:14},
  dot:{width:10,height:10,borderRadius:'50%',transition:'background 0.3s'},
  dotsLabel:{fontSize:11,color:'#9CA3AF',fontWeight:700,marginLeft:4},
  btn:{width:'100%',padding:'14px',background:'linear-gradient(135deg,#1D4ED8,#1E40AF)',color:'white',border:'none',borderRadius:12,fontSize:14,fontWeight:800,cursor:'pointer',fontFamily:"'Nunito',sans-serif",transition:'all 0.2s',boxShadow:'0 4px 16px rgba(29,78,216,0.35)',display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:20},
  btnLoading:{opacity:0.8,cursor:'not-allowed'},
  lockoutBox:{background:'#FEF2F2',border:'1.5px solid #FECACA',borderRadius:16,padding:'24px 20px',textAlign:'center',marginBottom:20},
  lockoutIcon:{fontSize:40,marginBottom:10},
  lockoutTitle:{fontSize:15,fontWeight:900,color:'#DC2626',marginBottom:4},
  lockoutSub:{fontSize:12,color:'#9CA3AF',marginBottom:14},
  lockoutTimer:{fontSize:36,fontWeight:900,color:'#1A1A2E',fontFamily:'monospace',letterSpacing:2,marginBottom:6},
  lockoutHint:{fontSize:11,color:'#9CA3AF'},
  footer:{borderTop:'1px solid #F3F4F6',paddingTop:16,display:'flex',flexDirection:'column',gap:4},
  footerLine:{fontSize:10,color:'#D1D5DB',textAlign:'center',fontWeight:600,letterSpacing:0.5},
};

// ── Government Dashboard ─────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const { navigate, complaints, updateComplaintStatus } = useApp();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expandId, setExpandId] = useState(null);

  const total    = complaints.length;
  const pending  = complaints.filter(c => c.status === 'pending').length;
  const enquiry  = complaints.filter(c => c.status === 'enquiry').length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;

  const filtered = [...complaints]
    .reverse()
    .filter(c => filter === 'all' || c.status === filter)
    .filter(c => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (c.name||'').toLowerCase().includes(q)
        || (c.id||'').toLowerCase().includes(q)
        || (c.category||'').toLowerCase().includes(q)
        || (c.state||'').toLowerCase().includes(q);
    });

  return (
    <div style={D.page}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .row-card{animation:fadeUp 0.2s ease}
        .filt-btn:hover{opacity:0.8}
        .act-btn:hover{opacity:0.75}
        input:focus{outline:none;border-color:#1D4ED8!important}
      `}</style>

      {/* Header */}
      <div style={D.header}>
        <div style={D.headerTop}>
          <button style={D.back} onClick={() => { onLogout(); navigate('home'); }}>‹</button>
          <div style={D.headerIcon}>🏛️</div>
          <div style={D.headerText}>
            <div style={D.headerTitle}>Government Portal</div>
            <div style={D.headerSub}>Ministry of Home Affairs · Complaint Oversight</div>
          </div>
          <button style={D.logoutBtn} onClick={onLogout} title="Lock portal">🔒</button>
        </div>

        {/* Stats */}
        <div style={D.statsGrid}>
          {[
            {label:'Total',    val:total,    icon:'📊', bg:'rgba(255,255,255,0.15)', col:'white'},
            {label:'Pending',  val:pending,  icon:'⏳', bg:'rgba(249,115,22,0.3)',  col:'#FED7AA'},
            {label:'Enquiry',  val:enquiry,  icon:'🔍', bg:'rgba(59,130,246,0.3)',  col:'#BFDBFE'},
            {label:'Resolved', val:resolved, icon:'✅', bg:'rgba(16,185,129,0.3)',  col:'#A7F3D0'},
          ].map(s => (
            <div key={s.label} style={{...D.stat, background:s.bg}}>
              <div style={{fontSize:18}}>{s.icon}</div>
              <div style={{fontSize:20,fontWeight:900,color:s.col,fontFamily:"'Playfair Display',serif"}}>{s.val}</div>
              <div style={{fontSize:9,color:'rgba(255,255,255,0.7)',fontWeight:700}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Session badge */}
        <div style={D.sessionBadge}>
          🔓 Authenticated Session · {new Date().toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})}
        </div>
      </div>

      {/* Controls */}
      <div style={D.controls}>
        {/* Search */}
        <div style={D.searchWrap}>
          <span style={{padding:'0 10px',fontSize:16}}>🔍</span>
          <input
            type="text"
            placeholder="Search by name, ID, category, state..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={D.searchInput}
          />
          {search && (
            <button style={D.clearBtn} onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        {/* Filter tabs */}
        <div style={D.filterRow}>
          {['all','pending','enquiry','confirmed','resolved'].map(f => (
            <button
              key={f}
              className="filt-btn"
              style={{...D.filtBtn, ...(filter===f ? D.filtBtnActive : {})}}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase()+f.slice(1)}
              {f !== 'all' && (
                <span style={{...D.filtCount, ...(filter===f?{background:'white',color:'#1D4ED8'}:{})}}>
                  {complaints.filter(c => c.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Complaint list */}
      <div style={{padding:'0 16px'}}>
        <div style={D.listHeader}>
          {filtered.length} complaint{filtered.length !== 1 ? 's' : ''}
          {search && ` matching "${search}"`}
        </div>

        {filtered.length === 0 ? (
          <div style={D.empty}>
            <div style={{fontSize:48,marginBottom:12}}>📭</div>
            <div style={{fontSize:14,fontWeight:700,color:'#374151'}}>No complaints found</div>
            <div style={{fontSize:12,color:'#9CA3AF',marginTop:6}}>
              {complaints.length === 0
                ? 'Complaints filed via NYAYA will appear here'
                : 'Try changing filters or search term'}
            </div>
          </div>
        ) : (
          filtered.map(c => {
            const meta = STATUS_META[c.status] || STATUS_META.pending;
            const isExpanded = expandId === c.id;
            return (
              <div key={c.id} className="row-card" style={D.row}>
                {/* Row header */}
                <div style={D.rowHeader} onClick={() => setExpandId(isExpanded ? null : c.id)}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={D.complaintId}>{c.id}</div>
                    <div style={D.complaintName}>{c.name} · {c.state || '—'}</div>
                    <div style={D.complaintMeta}>{c.category} · {new Date(c.submittedAt).toLocaleDateString('en-IN')}</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:6,flexShrink:0}}>
                    <div style={{...D.badge, background:meta.bg, color:meta.color}}>
                      <span style={{width:6,height:6,borderRadius:'50%',background:meta.dot,display:'inline-block'}}/>
                      {meta.label}
                    </div>
                    <span style={D.expandIcon}>{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div style={D.expandBody}>
                    <div style={D.detailGrid}>
                      <div style={D.detailItem}><span style={D.detailLabel}>Phone</span><span style={D.detailVal}>{c.phone||'—'}</span></div>
                      <div style={D.detailItem}><span style={D.detailLabel}>District</span><span style={D.detailVal}>{c.district||'—'}</span></div>
                      <div style={D.detailItem}><span style={D.detailLabel}>Category</span><span style={D.detailVal}>{c.category||'—'}</span></div>
                      <div style={D.detailItem}><span style={D.detailLabel}>Filed</span><span style={D.detailVal}>{new Date(c.submittedAt).toLocaleString('en-IN')}</span></div>
                    </div>
                    {c.description && (
                      <div style={D.description}>
                        <div style={D.descLabel}>Description</div>
                        <div style={D.descText}>{c.description}</div>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div style={D.actionRow}>
                      <div style={D.actionLabel}>Update Status:</div>
                      <div style={D.actionBtns}>
                        {[
                          {status:'pending',   label:'⏳ Pending',   bg:'#FFF7ED', col:'#C2410C', bdr:'#FED7AA'},
                          {status:'enquiry',   label:'🔍 Enquiry',   bg:'#EFF6FF', col:'#1D4ED8', bdr:'#BFDBFE'},
                          {status:'confirmed', label:'✓ Confirm',    bg:'#ECFDF5', col:'#065F46', bdr:'#6EE7B7'},
                          {status:'resolved',  label:'✅ Resolve',   bg:'#F3F4F6', col:'#374151', bdr:'#D1D5DB'},
                        ].map(a => (
                          <button
                            key={a.status}
                            className="act-btn"
                            style={{
                              ...D.actBtn,
                              background: c.status===a.status ? a.col : a.bg,
                              color: c.status===a.status ? 'white' : a.col,
                              border: `1.5px solid ${a.bdr}`,
                              fontWeight: c.status===a.status ? 900 : 700,
                            }}
                            onClick={() => updateComplaintStatus(c.id, a.status)}
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
        <div style={{height:90}}/>
      </div>
    </div>
  );
}

// ── Dashboard styles ──────────────────────────────────────────────────────────
const D = {
  page:{background:'#F0F4FF',minHeight:'100vh'},
  header:{background:'linear-gradient(135deg,#0F172A,#1E3A8A,#1D4ED8)',padding:'20px 16px 16px',borderRadius:'0 0 24px 24px',marginBottom:12},
  headerTop:{display:'flex',alignItems:'center',gap:10,marginBottom:14},
  back:{background:'rgba(255,255,255,0.15)',border:'none',color:'white',width:36,height:36,borderRadius:'50%',cursor:'pointer',fontSize:20,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0},
  headerIcon:{width:44,height:44,background:'rgba(255,255,255,0.15)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0},
  headerText:{flex:1},
  headerTitle:{fontSize:17,fontWeight:900,color:'white',fontFamily:"'Playfair Display',serif"},
  headerSub:{fontSize:10,color:'rgba(255,255,255,0.6)',marginTop:2},
  logoutBtn:{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',color:'white',width:36,height:36,borderRadius:'50%',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0},
  statsGrid:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:10},
  stat:{borderRadius:10,padding:'10px 6px',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center',gap:2},
  sessionBadge:{background:'rgba(255,255,255,0.08)',borderRadius:8,padding:'6px 12px',fontSize:10,color:'rgba(255,255,255,0.5)',textAlign:'center',fontWeight:600,letterSpacing:0.3},
  controls:{padding:'0 16px',marginBottom:12},
  searchWrap:{display:'flex',alignItems:'center',background:'white',borderRadius:12,border:'1.5px solid #E5E7EB',marginBottom:10,overflow:'hidden'},
  searchInput:{flex:1,border:'none',background:'transparent',padding:'11px 4px',fontSize:13,fontFamily:"'Nunito',sans-serif",color:'#1A1A2E'},
  clearBtn:{background:'none',border:'none',cursor:'pointer',padding:'0 12px',fontSize:14,color:'#9CA3AF'},
  filterRow:{display:'flex',gap:6,flexWrap:'wrap'},
  filtBtn:{border:'1.5px solid #E5E7EB',borderRadius:20,padding:'6px 14px',fontSize:11,fontWeight:700,cursor:'pointer',background:'white',color:'#6B7280',fontFamily:"'Nunito',sans-serif",display:'flex',alignItems:'center',gap:5,transition:'all 0.15s'},
  filtBtnActive:{background:'#1D4ED8',color:'white',borderColor:'#1D4ED8'},
  filtCount:{background:'#E5E7EB',borderRadius:20,padding:'1px 6px',fontSize:10,fontWeight:900},
  listHeader:{fontSize:12,color:'#9CA3AF',fontWeight:700,marginBottom:10,letterSpacing:0.3},
  empty:{textAlign:'center',padding:'48px 20px',color:'#9CA3AF'},
  row:{background:'white',borderRadius:14,boxShadow:'0 2px 16px rgba(0,0,0,0.06)',marginBottom:10,overflow:'hidden'},
  rowHeader:{padding:'14px 16px',display:'flex',alignItems:'flex-start',gap:10,cursor:'pointer'},
  complaintId:{fontSize:10,fontWeight:900,color:'#1D4ED8',letterSpacing:1,marginBottom:3},
  complaintName:{fontSize:13,fontWeight:800,color:'#1A1A2E',marginBottom:2},
  complaintMeta:{fontSize:11,color:'#9CA3AF'},
  badge:{display:'flex',alignItems:'center',gap:4,fontSize:10,fontWeight:800,padding:'4px 10px',borderRadius:100},
  expandIcon:{fontSize:10,color:'#9CA3AF',marginTop:2},
  expandBody:{borderTop:'1px solid #F3F4F6',padding:'14px 16px',background:'#FAFBFF'},
  detailGrid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12},
  detailItem:{display:'flex',flexDirection:'column',gap:2},
  detailLabel:{fontSize:9,fontWeight:900,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:0.5},
  detailVal:{fontSize:12,fontWeight:700,color:'#1A1A2E'},
  description:{background:'white',borderRadius:10,padding:'10px 12px',marginBottom:12,border:'1px solid #E5E7EB'},
  descLabel:{fontSize:10,fontWeight:900,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:0.5,marginBottom:4},
  descText:{fontSize:12,color:'#374151',lineHeight:1.6},
  actionRow:{display:'flex',flexDirection:'column',gap:8},
  actionLabel:{fontSize:10,fontWeight:900,color:'#9CA3AF',textTransform:'uppercase',letterSpacing:0.5},
  actionBtns:{display:'flex',gap:6,flexWrap:'wrap'},
  actBtn:{borderRadius:8,padding:'7px 12px',fontSize:11,cursor:'pointer',fontFamily:"'Nunito',sans-serif",transition:'all 0.15s'},
};

// ── Main export: gate portal behind login ────────────────────────────────────
export default function GovtPortalScreen() {
  const [authed, setAuthed] = useState(false);
  return authed
    ? <Dashboard onLogout={() => setAuthed(false)} />
    : <LoginScreen onSuccess={() => setAuthed(true)} />;
}
