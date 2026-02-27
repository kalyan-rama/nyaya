// src/components/ComplaintScreen.jsx
import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';

const STATES = ['Andhra Pradesh','Telangana','Tamil Nadu','Karnataka','Maharashtra','Delhi','Uttar Pradesh','West Bengal','Kerala','Gujarat','Rajasthan','Madhya Pradesh','Odisha','Punjab','Bihar','Other'];
const CATEGORIES = ['Police Misconduct','Domestic Violence','Cyber Crime','Fraud / Cheating','Workplace Harassment','Tenant / Property Dispute','Consumer Complaint','Corruption / Bribery','Missing Person','Labour Dispute','Other'];

function genId() { return 'NYA-' + Math.random().toString(36).substr(2, 5).toUpperCase(); }

export default function ComplaintScreen() {
  const { navigate, addComplaint, showToast } = useApp();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', state: '',
    category: '', date: '', location: '', description: '',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const next = () => {
    if (step === 1) {
      if (!form.name.trim()) { showToast('Please enter your full name'); return; }
      if (!form.email.trim() || !form.email.includes('@')) { showToast('Please enter a valid email'); return; }
      if (!form.phone.trim() || form.phone.length < 10) { showToast('Please enter a valid phone number'); return; }
    }
    if (step === 2) {
      if (!form.category) { showToast('Please select a category'); return; }
      if (!form.date) { showToast('Please select the incident date'); return; }
      if (!form.location.trim()) { showToast('Please enter incident location'); return; }
      if (form.description.trim().length < 20) { showToast('Please describe the incident in more detail'); return; }
    }
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files.map(f => ({ name: f.name, size: f.size }))]);
    showToast(`${files.length} file(s) attached`);
  };

  const submit = () => {
    setUploading(true);
    setTimeout(() => {
      const id = genId();
      const complaint = {
        id, ...form,
        submittedAt: new Date().toISOString(),
        status: 'enquiry',
        files: uploadedFiles,
        timeline: [
          { l: 'Complaint Submitted',       s: 'Registered in NYAYA system',        done: true,  dt: new Date().toLocaleString() },
          { l: 'Forwarded to Police Portal', s: 'Police station notified',           done: true,  dt: new Date().toLocaleString() },
          { l: 'Enquiry Officer Assigned',   s: 'Officer will verify your location', done: false, dt: '' },
          { l: 'Field Investigation',        s: 'On-ground survey being conducted',  done: false, dt: '' },
          { l: 'Complaint Resolved',         s: 'Resolution communicated via email', done: false, dt: '' },
        ],
      };
      addComplaint(complaint);
      setTrackingId(id);
      setSubmitted(true);
      setUploading(false);
      showToast('✅ Complaint submitted! ID: ' + id);
    }, 1800);
  };

  const reset = () => {
    setStep(1); setSubmitted(false); setTrackingId(''); setUploadedFiles([]);
    setForm({ name: '', email: '', phone: '', state: '', category: '', date: '', location: '', description: '' });
    window.scrollTo(0, 0);
  };

  if (submitted) return (
    <div style={S.page}>
      <div style={S.topbar}>
        <button style={S.back} onClick={() => navigate('home')}>‹</button>
        <div><div style={S.ttl}>📝 Complaint Filed</div></div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={S.successBox}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, marginBottom: 8 }}>Complaint Submitted!</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 20 }}>
            Your complaint is registered and forwarded to the police enquiry portal and government dashboard.
          </p>
          <div style={S.tidBox}>
            <div style={S.tidLabel}>Your Tracking ID</div>
            <div style={S.tidVal}>{trackingId}</div>
          </div>
          <div style={S.sentRow}>📧 Confirmation sent to <strong style={{ color: '#FF6B00', marginLeft: 4 }}>{form.email}</strong></div>
          <div style={S.sentRow}>👮 Police enquiry officer notified</div>
          <div style={S.sentRow}>🏛️ Government oversight portal updated</div>
          <div style={S.statusBadge}>🟡 Status: Under Police Enquiry</div>
          <button style={S.primaryBtn} onClick={() => navigate('tracking')}>📍 Track My Complaint</button>
          <button style={S.ghostBtn} onClick={reset}>+ File Another Complaint</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={S.page}>
      <div style={S.topbar}>
        <button style={S.back} onClick={() => navigate('home')}>‹</button>
        <div>
          <div style={S.ttl}>📝 File Complaint</div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>Sent to police + government portal</div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Step indicators */}
        <div style={S.steps}>
          {[1, 2, 3, 4].map((n, i) => (
            <React.Fragment key={n}>
              <div style={{ ...S.stepDot, ...(step > n ? S.stepDone : step === n ? S.stepOn : {}) }}>{step > n ? '✓' : n}</div>
              {i < 3 && <div style={{ ...S.stepLine, ...(step > n ? { background: '#059669' } : {}) }} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1 — Personal Details */}
        {step === 1 && (
          <div style={S.card}>
            <div style={S.cardTitle}>Your Details</div>
            <div style={S.cardSub}>Required for complaint registration &amp; updates</div>
            <Label>Full Name *</Label>
            <input style={S.inp} placeholder="Enter your full name" value={form.name} onChange={e => set('name', e.target.value)} />
            <Label>Email Address *</Label>
            <input style={S.inp} type="email" placeholder="Confirmation will be sent here" value={form.email} onChange={e => set('email', e.target.value)} />
            <Label>Mobile Number *</Label>
            <input style={S.inp} type="tel" placeholder="10-digit mobile number" value={form.phone} onChange={e => set('phone', e.target.value)} />
            <Label>State</Label>
            <select style={S.sel} value={form.state} onChange={e => set('state', e.target.value)}>
              <option value="">Select State</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
            <button style={S.primaryBtn} onClick={next}>Continue → Step 2</button>
          </div>
        )}

        {/* Step 2 — Complaint Details */}
        {step === 2 && (
          <div style={S.card}>
            <div style={S.cardTitle}>Complaint Details</div>
            <div style={S.cardSub}>Describe clearly for police enquiry</div>
            <Label>Category *</Label>
            <select style={{ ...S.sel, marginBottom: 14 }} value={form.category} onChange={e => set('category', e.target.value)}>
              <option value="">Select Category</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <Label>Date of Incident *</Label>
            <input style={S.inp} type="date" value={form.date} onChange={e => set('date', e.target.value)} />
            <Label>Location of Incident *</Label>
            <input style={S.inp} placeholder="Street, Area, City" value={form.location} onChange={e => set('location', e.target.value)} />
            <Label>Description *</Label>
            <textarea style={S.ta} placeholder="Describe what happened in detail..." value={form.description} onChange={e => set('description', e.target.value)} />
            <button style={S.ghostBtn} onClick={() => setStep(1)}>← Back</button>
            <button style={S.primaryBtn} onClick={next}>Continue → Step 3</button>
          </div>
        )}

        {/* Step 3 — Evidence Upload */}
        {step === 3 && (
          <>
            <div style={S.card}>
              <div style={S.cardTitle}>Upload Evidence</div>
              <div style={S.cardSub}>Photos, documents, screenshots (optional)</div>
              <div style={S.uploadArea} onClick={() => document.getElementById('fup').click()}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📎</div>
                <p style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 600 }}>Tap to upload photos / documents</p>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>JPG, PNG, PDF — Max 10MB each</p>
                <input id="fup" type="file" multiple accept="image/*,.pdf" style={{ display: 'none' }} onChange={handleUpload} />
              </div>
              {uploadedFiles.length > 0 && (
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {uploadedFiles.map((f, i) => (
                    <div key={i} style={S.fileRow}>📎 {f.name} <span style={{ color: '#9CA3AF', fontWeight: 400, marginLeft: 4 }}>({(f.size / 1024).toFixed(0)}KB)</span></div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ ...S.card, background: '#EFF6FF', border: '2px solid #BFDBFE' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#1D4ED8', marginBottom: 6 }}>📧 What Happens After Submission?</div>
              <div style={{ fontSize: 12, color: '#1D4ED8', lineHeight: 1.8 }}>
                ✅ Complaint forwarded to <strong>Police Station Portal</strong><br />
                ✅ Confirmation email sent to <strong>your address</strong><br />
                ✅ Unique <strong>Tracking ID</strong> generated<br />
                ✅ Enquiry officer assigned &amp; location verified<br />
                ✅ Also forwarded to <strong>Government Portal</strong>
              </div>
            </div>
            <button style={S.ghostBtn} onClick={() => setStep(2)}>← Back</button>
            <button style={S.primaryBtn} onClick={next}>Review &amp; Submit →</button>
          </>
        )}

        {/* Step 4 — Review */}
        {step === 4 && (
          <>
            <div style={S.card}>
              <div style={S.cardTitle}>Review Your Complaint</div>
              <div style={{ fontSize: 12, color: '#4B5563', lineHeight: 1.9 }}>
                <div><b>Name:</b> {form.name}</div>
                <div><b>Email:</b> {form.email}</div>
                <div><b>Phone:</b> {form.phone}</div>
                <div><b>State:</b> {form.state || 'Not specified'}</div>
                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '6px 0' }} />
                <div><b>Category:</b> {form.category}</div>
                <div><b>Date:</b> {form.date}</div>
                <div><b>Location:</b> {form.location}</div>
                <div><b>Description:</b> {form.description}</div>
                {uploadedFiles.length > 0 && <div><b>Files:</b> {uploadedFiles.length} attached</div>}
              </div>
            </div>
            <button style={S.ghostBtn} onClick={() => setStep(3)}>← Edit Details</button>
            <button style={{ ...S.primaryBtn, opacity: uploading ? 0.7 : 1 }} onClick={submit} disabled={uploading}>
              {uploading ? '⏳ Submitting...' : '🚀 Submit Complaint'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Label({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 800, color: '#1A1A2E', marginBottom: 8, marginTop: 14 }}>{children}</div>;
}

const S = {
  page: { background: '#F8F5F0', minHeight: '100vh', paddingBottom: 100 },
  topbar: { background: 'white', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #E5E7EB', position: 'sticky', top: 0, zIndex: 50 },
  back: { width: 36, height: 36, borderRadius: '50%', background: '#F8F5F0', border: 'none', cursor: 'pointer', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  ttl: { fontSize: 18, fontWeight: 800 },
  steps: { display: 'flex', alignItems: 'center', marginBottom: 20 },
  stepDot: { width: 28, height: 28, borderRadius: '50%', border: '2px solid #E5E7EB', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#9CA3AF', flexShrink: 0, transition: 'all 0.3s' },
  stepDone: { background: '#059669', borderColor: '#059669', color: 'white' },
  stepOn: { background: '#FF6B00', borderColor: '#FF6B00', color: 'white' },
  stepLine: { flex: 1, height: 2, background: '#E5E7EB', transition: 'background 0.3s' },
  card: { background: 'white', borderRadius: 16, padding: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: 16 },
  cardTitle: { fontSize: 16, fontWeight: 800, color: '#1A1A2E', marginBottom: 4 },
  cardSub: { fontSize: 12, color: '#9CA3AF', marginBottom: 4 },
  inp: { width: '100%', border: '2px solid #E5E7EB', borderRadius: 10, padding: '12px 14px', fontSize: 14, fontFamily: "'Nunito',sans-serif", color: '#1A1A2E', background: '#F8F5F0', boxSizing: 'border-box', marginBottom: 4, outline: 'none', transition: 'border-color 0.2s' },
  sel: { width: '100%', border: '2px solid #E5E7EB', borderRadius: 10, padding: '12px 14px', fontSize: 14, fontFamily: "'Nunito',sans-serif", color: '#1A1A2E', background: '#F8F5F0', boxSizing: 'border-box', outline: 'none' },
  ta: { width: '100%', border: '2px solid #E5E7EB', borderRadius: 10, padding: '12px 14px', fontSize: 14, fontFamily: "'Nunito',sans-serif", color: '#1A1A2E', background: '#F8F5F0', minHeight: 100, resize: 'vertical', boxSizing: 'border-box', outline: 'none', marginBottom: 4 },
  uploadArea: { border: '2px dashed #E5E7EB', borderRadius: 12, padding: '24px 16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', background: '#FAFAFA' },
  fileRow: { background: '#F8F5F0', borderRadius: 8, padding: '10px 12px', fontSize: 12, fontWeight: 700, color: '#374151' },
  primaryBtn: { width: '100%', padding: 16, background: 'linear-gradient(135deg,#FF6B00,#F59E0B)', border: 'none', borderRadius: 12, color: 'white', fontSize: 15, fontWeight: 800, fontFamily: "'Nunito',sans-serif", cursor: 'pointer', marginTop: 8, boxShadow: '0 4px 20px rgba(255,107,0,0.3)' },
  ghostBtn: { width: '100%', padding: 14, background: '#F8F5F0', border: '2px solid #E5E7EB', borderRadius: 12, color: '#2D2D2D', fontSize: 15, fontWeight: 800, fontFamily: "'Nunito',sans-serif", cursor: 'pointer', marginTop: 8 },
  successBox: { background: 'linear-gradient(135deg,#1A1A2E,#16213E)', borderRadius: 20, padding: 28, textAlign: 'center', color: 'white', boxShadow: '0 12px 40px rgba(0,0,0,0.2)' },
  tidBox: { background: 'rgba(255,107,0,0.15)', border: '2px solid rgba(255,107,0,0.4)', borderRadius: 12, padding: 16, marginBottom: 16 },
  tidLabel: { fontSize: 11, fontWeight: 800, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  tidVal: { fontSize: 28, fontWeight: 900, color: 'white', letterSpacing: 3, fontFamily: "'Playfair Display',serif" },
  sentRow: { display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: '10px 14px', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 8, textAlign: 'left' },
  statusBadge: { display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(5,150,105,0.2)', border: '1px solid rgba(5,150,105,0.4)', borderRadius: 100, padding: '5px 14px', fontSize: 12, fontWeight: 800, color: '#10B981', marginBottom: 20 },
};
