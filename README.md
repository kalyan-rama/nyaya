# ⚖️ NYAYA — न्याय | Legal Literacy Platform for Every Indian

> **"Know Your Rights. Get Justice. For Free."**
> NYAYA is a free, offline-capable legal literacy app built for every Indian citizen —
> regardless of language, education level, or income.

---

## 📋 Table of Contents

1. [What is NYAYA?](#what-is-nyaya)
2. [Why Was NYAYA Built?](#why-was-nyaya-built)
3. [Who Is It For?](#who-is-it-for)
4. [Features — What Can You Do?](#features--what-can-you-do)
5. [How the Chatbot Works](#how-the-chatbot-works)
6. [All 30+ Laws in the Knowledge Base](#all-30-laws-in-the-knowledge-base)
7. [Voice Features](#voice-features)
8. [Languages Supported](#languages-supported)
9. [Emergency Help Screen](#emergency-help-screen)
10. [Complaint Filing System](#complaint-filing-system)
11. [Case Tracking](#case-tracking)
12. [Free Lawyer Finder](#free-lawyer-finder)
13. [Government Portal (Admin Only)](#government-portal-admin-only)
14. [Project File Structure](#project-file-structure)
15. [How to Run Locally](#how-to-run-locally)
16. [How to Deploy Online](#how-to-deploy-online)
17. [Technology Used](#technology-used)
18. [Important Helpline Numbers](#important-helpline-numbers)

---

## What is NYAYA?

**NYAYA** (meaning *Justice* in Sanskrit and Hindi) is a free mobile-first web application that teaches Indian citizens about their legal rights, helps them file complaints, tracks cases, and connects them to free lawyers — all in their own language.

Most Indians do not know their legal rights. When something wrong happens — a police arrest, salary theft, domestic violence, cheating by a company — people feel helpless because they don't know what law protects them or what steps to take.

NYAYA solves this by putting **30+ Indian laws, all rights, remedies, penalties, and helpline numbers** directly in the user's pocket — available 24/7, completely free, with no internet connection needed for the main features.

---

## Why Was NYAYA Built?

India has over 1 billion citizens but legal literacy remains extremely low. Key problems:

- Most people don't know their Fundamental Rights (Articles 14, 19, 21, 22, etc.)
- Legal language is complex and in English — most citizens can't understand it
- Lawyers are expensive — free legal aid exists but people don't know how to access it
- Complaint filing is complicated — people give up before getting justice
- Police and government offices often take advantage of people who don't know the law

**NYAYA bridges this gap** by making the law simple, accessible, multilingual, and voice-friendly.

---

## Who Is It For?

NYAYA is designed for **every Indian citizen**, especially:

| Person | How NYAYA Helps |
|--------|-----------------|
| 👩 Woman facing domestic violence | Explains DV Act, helps file complaint, shares 181 helpline |
| 👷 Worker whose salary wasn't paid | Explains Payment of Wages Act, guides to Labour Commissioner |
| 👮 Person wrongfully arrested | Explains Article 22 rights, connects to free lawyer (15100) |
| 🧒 Child being exploited | Explains POCSO, Child Labour laws, connects to Childline 1098 |
| 🏠 Tenant being illegally evicted | Explains Rent Control Act, guides to Rent Authority |
| 👴 Senior citizen abandoned | Explains Senior Citizens Act, connects to helpline 14567 |
| 🌾 Farmer whose land was taken | Explains Land Acquisition Act 2013, compensation rights |
| 🎓 Student denied RTE admission | Explains Right to Education Act, guides to NCPCR |
| ♿ Disabled person denied rights | Explains RPWD Act 2016, reservation and pension rights |
| 💻 Cyber fraud victim | Explains IT Act, guides to 1930 Cyber Crime helpline |

---

## Features — What Can You Do?

NYAYA has **6 main tabs** accessible from the bottom navigation bar:

### 🏠 Home
The main dashboard where everything starts.
- **Search bar** — type or speak your problem
- **Quick Action buttons** — Emergency, Ask AI, File Complaint, Track Case
- **Browse by Category** — Police, Labour, Women, Tenant, Farmer, Student, Consumer, Cyber
- **Time-based greeting** — Good morning / Good evening in your language

### 💬 Ask AI (Legal Chatbot)
The heart of NYAYA. A 100% offline legal chatbot powered by a massive knowledge base.
- Type or speak your problem in any language
- AI instantly finds and explains the matching Indian law
- Full details: law sections, penalties, remedies, who to call, what steps to take
- Voice output — AI reads the answer aloud in your language
- Works without internet — no API key needed
- 30+ laws covering every major legal issue

### 📜 Rights
Browse legal rights organized by category:
- Police Rights, Labour Rights, Tenant Rights, Women's Rights
- Farmer Rights, Student Rights, Consumer Rights, Emergency Rights
- Each category has detailed cards explaining your rights in simple language

### 📝 File Complaint
A step-by-step complaint filing system:
- **Step 1** — Enter your personal details (name, email, phone)
- **Step 2** — Describe the incident (category, date, location, description)
- **Step 3** — Attach evidence files (photos, documents)
- **Step 4** — Review and submit
- After submitting: You get a unique **Tracking ID** (like NYA-AB12C)
- Complaint is automatically forwarded to the Government Portal

### 📍 Track Case
Track the status of your filed complaint using your Tracking ID.
- Enter your Tracking ID (e.g., NYA-AB12C)
- See the full timeline: Submitted → Forwarded → Enquiry → Investigation → Resolved
- Each step shows date and time of update
- Status badges: Pending 🟡, Enquiry 🔵, Confirmed 🟢, Resolved ✅

### 📋 Documents
Ready-made legal letter templates you can fill in and print:
- RTI Application letter
- Police Complaint letter
- Consumer Forum complaint
- Rental Agreement
- Legal Notice template
- Employment Termination response

---

## How the Chatbot Works

The NYAYA chatbot is **100% offline** — it does not use the internet or any AI API.

When a user types or speaks a message, the chatbot:

1. Takes the user's message (e.g., *"my boss is not paying my salary"*)
2. Runs it through a smart keyword + pattern matching engine
3. Searches through 30+ pre-built legal entries in the knowledge base
4. Scores each entry based on how many keywords match
5. Returns the best matching law with **full details** — sections, penalties, remedies, helplines, and steps

**Example queries and what the chatbot returns:**

| User says... | Chatbot explains... |
|---|---|
| "police arrested me without reason" | Article 22 — Rights on Arrest, D.K. Basu guidelines, free lawyer 15100 |
| "my landlord is forcing me to vacate" | Rent Control Act — tenant rights, eviction rules, how to file complaint |
| "my company didn't deposit PF" | EPF & ESI Act — what employer must do, how to file with EPFO, helpline 1800-11-8005 |
| "someone hacked my account" | IT Act 2000 — Section 66C identity theft, how to report to cybercrime.gov.in, call 1930 |
| "article 21" | Article 21 — complete explanation of Right to Life, all sub-rights (privacy, health, livelihood) |
| "domestic violence" | DV Act 2005 — protection orders, residence rights, 181 helpline, how to file |

If no specific law matches, the chatbot shows a **full menu** of all 30+ laws organized by category.

---

## All 30+ Laws in the Knowledge Base

### 🏛️ Fundamental Rights (Constitution of India)

| Law | What it covers |
|-----|---------------|
| Article 14 | Right to Equality — no arbitrary treatment by government |
| Article 15 | Prohibition of Discrimination — no discrimination on caste, religion, sex |
| Article 16 | Equality in Public Employment — government job rights, reservations |
| Article 19 | Six Freedoms — speech, assembly, movement, profession |
| Article 21 | Right to Life & Privacy — the most important fundamental right |
| Article 22 | Rights on Arrest — 24-hour rule, lawyer right, family information |
| Articles 23-24 | Against Exploitation — no bonded labour, no child labour |
| Articles 25-28 | Religious Freedom — right to practice, manage, propagate religion |
| Article 32 | Constitutional Remedies — all 5 writs: Habeas Corpus, Mandamus, Certiorari, etc. |

### 👩 Women's Rights

| Law | What it covers |
|-----|---------------|
| DV Act 2005 | Domestic Violence — physical, emotional, economic abuse, protection orders |
| Dowry Prohibition Act + 498A | Dowry demand is illegal, cruelty by husband/in-laws, stridhan rights |
| POSH Act 2013 | Workplace sexual harassment, Internal Complaints Committee, how to file |
| Divorce & Maintenance | Hindu, Muslim, Christian laws, mutual consent, alimony, child custody |
| Section 125 CrPC | Maintenance rights for wife, children, and parents |

### 👶 Children's Rights

| Law | What it covers |
|-----|---------------|
| POCSO Act 2012 | Child sexual abuse, mandatory reporting, special courts, penalties |
| Child Labour Act | No work below 14 years, hazardous work ban till 18 |
| RTE Act 2009 | Free education 6-14 years, 25% private school seats, no capitation fee |

### 👷 Labour Rights

| Law | What it covers |
|-----|---------------|
| Payment of Wages Act 1936 | Salary must be paid by 7th of month, deductions limits, compensation |
| Minimum Wages Act 1948 | Employer must pay state minimum wage, penalty for violation |
| EPF & ESI Acts | PF contribution rules, withdrawal rules, ESI health benefits |
| Industrial Disputes Act | Retrenchment compensation, wrongful termination, strike rights |

### 🏠 Land & Property

| Law | What it covers |
|-----|---------------|
| Land Acquisition Act 2013 | Compensation 2x-4x market value, R&R rights, consent requirements |
| Rent Control Acts | Eviction rules, security deposit, rent increase limits, tenant rights |
| Transfer of Property Act | Sale deed, encumbrance certificate, benami prohibition |

### 🛒 Consumer Rights

| Law | What it covers |
|-----|---------------|
| Consumer Protection Act 2019 | 6 consumer rights, complaint forums (District/State/National), e-commerce |
| FSSAI Act 2006 | Food safety, adulteration penalties, labelling rules |

### 📋 Governance & RTI

| Law | What it covers |
|-----|---------------|
| RTI Act 2005 | How to file RTI in 4 steps, timelines, appeals, penalties on PIO |
| Right to Service Acts | Citizens' Charter, CPGRAMS, Lokpal, anti-corruption complaints |

### ⚖️ Criminal Law

| Law | What it covers |
|-----|---------------|
| IPC / BNS 2023 | All major offences and punishments under new criminal code |
| CrPC / BNSS 2023 | FIR rights, bail types, charge sheet timelines, accused rights |

### 💻 Cyber Law

| Law | What it covers |
|-----|---------------|
| IT Act 2000 | Hacking, phishing, identity theft, cyber terrorism, how to report |
| DPDP Act 2023 | Personal data rights, company obligations, data breach reporting |

### Others

| Law | What it covers |
|-----|---------------|
| RPWD Act 2016 | Disability rights — 21 types, 4% govt reservation, education, pension |
| Senior Citizens Act 2007 | Children's legal duty to maintain parents, maintenance tribunal |
| Environmental Laws | Pollution complaints, NGT, CPCB, penalties |
| SC/ST Atrocities Act 1989 | Caste-based offences, mandatory FIR, victim compensation |
| Medical Negligence | Patient rights, emergency treatment, medical council complaints |
| Defamation Laws | Civil and criminal defamation, truth defence, online defamation |
| Police Complaint | How to complain against police — SP, NHRC, Magistrate, High Court |

---

## Voice Features

NYAYA has a full **two-way voice system**:

### 🎙️ Voice Input (Speech to Text)
- Tap the microphone button in the chatbot
- Speak your problem in your language
- The app listens and converts speech to text automatically
- Supported in all 8 languages (Chrome browser required)

### 🔊 Voice Output (Text to Speech)
- Every AI response is **automatically read aloud** in the user's selected language
- A green **🔊 [Language]** button appears on every AI message — tap to hear it again
- Tap **⏹ Stop** to stop reading at any time
- **Auto-speak toggle** (🔊/🔇) in the top bar — turn on/off for all responses
- The status bar shows "Speaking in Telugu..." while voice is playing
- Speech is cleaned before reading — markdown symbols, emojis, bullets are removed for natural voice

---

## Languages Supported

NYAYA supports **8 Indian languages** — the entire interface switches language when selected:

| Language | Code | Voice Code |
|----------|------|------------|
| English | en | en-IN |
| हिंदी (Hindi) | hi | hi-IN |
| తెలుగు (Telugu) | te | te-IN |
| தமிழ் (Tamil) | ta | ta-IN |
| ಕನ್ನಡ (Kannada) | kn | kn-IN |
| മലയാളം (Malayalam) | ml | ml-IN |
| मराठी (Marathi) | mr | mr-IN |
| বাংলা (Bengali) | bn | bn-IN |

Language can be changed at any time from the chat screen or splash screen. The voice input and output automatically switch to the selected language.

---

## Emergency Help Screen

The Emergency Screen is accessible with one tap from the Home screen (red 🚨 button).

**Direct call buttons for all emergency numbers:**

| Number | Service |
|--------|---------|
| **112** | All Emergency (Police + Ambulance + Fire) |
| **100** | Police |
| **102** | Ambulance |
| **181** | Women Helpline |
| **15100** | Free Legal Aid (NALSA) |
| **1930** | Cyber Crime |
| **14433** | Human Rights (NHRC) |
| **1800-11-4000** | Consumer Helpline |

**5-step emergency guide** shown on screen:
1. Stay Calm — you have rights
2. Call Emergency (112)
3. Know your rights — police must identify themselves
4. Call Legal Aid (15100) for free lawyer
5. Document everything — note names, badge numbers, take photos if safe

---

## Complaint Filing System

The complaint system works in **4 clear steps**:

**Step 1 — Personal Details**
- Full name, email address, phone number
- All fields validated before proceeding

**Step 2 — Incident Details**
- Category: Police Misconduct, Domestic Violence, Cyber Crime, Fraud, Workplace Harassment, Tenant Dispute, Consumer Complaint, Corruption, Missing Person, Labour Dispute, Other
- State (16 states listed)
- Incident date, location
- Detailed description (minimum 20 characters required)

**Step 3 — Evidence Upload**
- Attach photos, videos, documents
- Multiple files supported
- Files listed with name and size

**Step 4 — Review & Submit**
- Full preview of all entered information
- Click Submit → unique Tracking ID generated (format: NYA-XXXXX)
- Complaint saved and forwarded to Government Portal

---

## Case Tracking

After filing a complaint, users can track their case at any time.

**How to track:**
1. Go to the Track tab (📍) in the bottom navigation
2. Enter your Tracking ID (e.g., NYA-AB12C)
3. Your complaint details appear with full timeline

**Timeline stages:**

```
✅ Complaint Submitted      → Registered in NYAYA system
✅ Forwarded to Police Portal → Police station notified
⬜ Enquiry Officer Assigned  → Officer will verify your location
⬜ Field Investigation        → On-ground survey being conducted
⬜ Case Resolved              → Matter addressed and closed
```

Green dots = completed. White dots = pending. Each completed step shows date and time.

---

## Free Lawyer Finder

The Lawyer screen (accessible from Home → Free Lawyer button) helps citizens find free legal aid.

**Who qualifies for free legal aid?**
- Annual income below ₹3 lakh
- Women — for any case
- SC/ST persons
- Persons with disabilities
- Children under 18
- Anyone who is in custody
- Victims of trafficking
- Industrial workmen

**DLSA Offices listed with directions:**
- Hyderabad — District Court, Nampally — 040-23214233
- Mumbai — City Civil Court, Fort — 022-22621234
- Delhi — Patiala House Courts — 011-23387013
- Chennai — High Court Campus — 044-25340404

Each office has a **"Get Directions"** button that opens Google Maps navigation directly.

**National Free Legal Aid Helpline: 15100** (24/7, all languages)

---

## Government Portal (Admin Only)

The Government Portal is a **password-protected admin dashboard** for authorised government officers to manage and update complaint statuses.

### How to Access

1. Navigate to Government Portal from the Home screen
2. A **secure login screen** appears — "Ministry of Home Affairs — Restricted Access"
3. Enter the password: **`NYAYA@GOV2024`**
4. Click "🔓 Access Portal"

### Security Features

| Feature | Detail |
|---------|--------|
| Password protection | Required to access any data |
| Failed attempt tracking | 5 red dots show remaining attempts |
| Lockout | After 5 wrong attempts → portal locks for 10 minutes |
| Countdown timer | Live MM:SS timer shown during lockout |
| Password hashing | Never stored as plain text |
| Session lock | Click 🔒 icon to lock portal immediately |
| Auto logout | Navigating away logs out automatically |

### Inside the Dashboard

Once logged in, officers can:
- **View all complaints** filed via NYAYA
- **Search** complaints by name, Tracking ID, category, or state
- **Filter** by status: All / Pending / Enquiry / Confirmed / Resolved
- **Expand** any complaint to see full details (phone, district, description, timeline)
- **Update status** with 4 action buttons: ⏳ Pending, 🔍 Enquiry, ✓ Confirm, ✅ Resolve
- **See statistics** — total, pending, enquiry, resolved counts at a glance

### Changing the Password

Open `src/components/GovtPortalScreen.jsx` and change line 13:
```javascript
const GOVT_PASSWORD = 'NYAYA@GOV2024'; // ← change this
```

---

## Project File Structure

```
nyaya-deploy/
│
├── public/
│   └── index.html              ← Main HTML shell (mobile + desktop layout)
│
├── src/
│   ├── App.jsx                 ← Screen router — connects all screens
│   ├── index.js                ← React entry point
│   │
│   ├── components/
│   │   ├── SplashScreen.jsx    ← Language selection on first open
│   │   ├── HomeScreen.jsx      ← Dashboard — search, quick actions, categories
│   │   ├── ChatScreen.jsx      ← Legal chatbot with voice input + output
│   │   ├── RightsScreen.jsx    ← Browse rights by category
│   │   ├── FinderScreen.jsx    ← Find government offices on map
│   │   ├── DocumentsScreen.jsx ← Legal letter templates
│   │   ├── LawyerScreen.jsx    ← Free legal aid offices + eligibility
│   │   ├── EmergencyScreen.jsx ← Emergency numbers + 5-step guide
│   │   ├── ComplaintScreen.jsx ← 4-step complaint filing form
│   │   ├── TrackingScreen.jsx  ← Track complaint by Tracking ID
│   │   ├── GovtPortalScreen.jsx← Password-protected admin dashboard
│   │   ├── BottomNav.jsx       ← 6-tab bottom navigation bar
│   │   └── Toast.jsx           ← Notification popup component
│   │
│   ├── contexts/
│   │   └── AppContext.js       ← Global state: language, screen, complaints
│   │
│   ├── data/
│   │   ├── legalKnowledgeBase.js ← 30+ Indian laws (2000+ lines, fully offline)
│   │   ├── legalData.js          ← Office locations, letter templates, rights data
│   │   └── translations.js       ← All UI text in 8 languages
│   │
│   ├── services/
│   │   └── geminiApi.js        ← Offline legal engine (no internet needed)
│   │
│   └── firebase.js             ← Optional Firebase integration (chat history)
│
├── server.js                   ← Node.js server (serves built React app)
├── package.json                ← Dependencies and scripts
├── .env.example                ← Environment variable template
├── render.yaml                 ← Render.com deployment config
├── railway.toml                ← Railway.app deployment config
└── vercel.json                 ← Vercel deployment config
```

---

## How to Run Locally

### Prerequisites
- Node.js version 16 or higher
- npm (comes with Node.js)
- A modern web browser (Chrome recommended for voice features)

### Step 1 — Extract the project

Download and extract `NYAYA_Deploy_Ready_v4.zip` to a folder on your computer.

```bash
cd nyaya-deploy
```

### Step 2 — Install dependencies

```bash
npm install
```

This downloads all required packages. Takes about 1-2 minutes.

### Step 3 — Start the app

```bash
npm start
```

This starts the app on your computer.

### Step 4 — Open in browser

Open your browser and go to:
```
http://localhost:3000
```

The app will load. You will see the language selection screen.

> **Note:** No API key or internet connection is required for the chatbot. Everything runs locally on your computer.

### Optional — Run the server separately

```bash
npm run server
```

This starts the backend server on port 3001. Used only for serving the built app in production.

---

## How to Deploy Online

### Option A — Render.com (Recommended — Free)

**Deploy backend (Web Service):**
1. Push project to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo
4. Build Command: `npm install && npm run build`
5. Start Command: `node server.js`
6. Click Deploy

Your app will be live at `https://your-app-name.onrender.com`

**Check it works:**
Visit `https://your-app-name.onrender.com/health` → should show:
```json
{"status":"ok","mode":"offline-legal-engine","chatbot":"100% offline"}
```

### Option B — Netlify (Frontend only)

1. Go to [netlify.com](https://netlify.com) → Add New Site → Import from GitHub
2. Build Command: `npm run build`
3. Publish Directory: `build`
4. Add Redirect Rule: `/* → /index.html → 200`
5. Deploy

### Option C — Vercel (Frontend only)

```bash
npm install -g vercel
vercel --prod
```

Or import from GitHub on [vercel.com](https://vercel.com). Framework: Create React App.

---

## Technology Used

| Technology | Purpose |
|-----------|---------|
| **React 18** | User interface — all screens and components |
| **JavaScript (ES6+)** | Core application logic |
| **Web Speech API** | Voice input (microphone) and voice output (speaker) |
| **SpeechRecognition API** | Converts spoken words to text |
| **SpeechSynthesis API** | Reads AI responses aloud |
| **localStorage** | Stores complaints and settings on device |
| **Node.js** | Backend server for production deployment |
| **Firebase** (optional) | Cloud storage for chat history |
| **CSS-in-JS** | All styling done inline in React components |
| **No external AI API** | Chatbot is 100% offline — no Gemini, no OpenAI |

### Why no internet for the chatbot?

The chatbot works offline because **all 30+ laws are pre-built** into the `legalKnowledgeBase.js` file. When a user asks a question, the app searches this local database using keyword matching — no server call needed. This means:
- Works in areas with poor internet connection
- No API cost — completely free forever
- Instant responses — no network delay
- Data privacy — user questions never leave their device

---

## Important Helpline Numbers

These numbers are embedded throughout the app and shown when relevant:

| Helpline | Number | Available |
|---------|--------|-----------|
| All Emergency | **112** | 24/7 |
| Police | **100** | 24/7 |
| Ambulance | **102** | 24/7 |
| Free Legal Aid (NALSA) | **15100** | 24/7 |
| Women Helpline | **181** | 24/7 |
| Cyber Crime | **1930** | 24/7 |
| Human Rights (NHRC) | **14433** | 24/7 |
| Consumer Helpline | **1800-11-4000** | 24/7 |
| Childline | **1098** | 24/7 |
| Senior Citizens | **14567** | 24/7 |
| Labour Helpline | **1800-11-2004** | 24/7 |
| EPFO | **1800-11-8005** | 24/7 |
| Anti-Human Trafficking | **1800-419-8588** | 24/7 |
| FSSAI Food Safety | **1800-11-2100** | 24/7 |
| Disability Helpline | **1800-11-4515** | 24/7 |

---

## Built With a Purpose 🇮🇳

> *"Article 39A of the Constitution of India directs the State to provide free legal aid to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities."*

NYAYA was built to make this constitutional promise real — to bring legal knowledge to every person, in every village, in every language, at zero cost.

**Free forever. For every Indian.**

---

*NYAYA Platform · Built for India · Article 39A · Justice for All*
