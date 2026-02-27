# NYAYA — Deploy Guide 🚀

## What's in this project
- **React frontend** — mobile-first (480px), desktop-compatible with card shadow
- **Node.js backend** — Gemini AI proxy with smart fallback knowledge base
- **6-tab navigation** — Home · Ask AI · Rights · Complain · Track · Docs
- **New features** — Complaint system · Tracking · Government portal

---

## STEP 1 — Get a FREE Gemini API Key (2 minutes)

1. Go to: **https://aistudio.google.com/app/apikey**
2. Sign in with Google account
3. Click **"Create API Key"**
4. Copy the key (starts with `AIza...`)

---

## STEP 2 — Run Locally First (Test before deploy)

```bash
# Clone or extract project, then:
cd nyaya-legal-app

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Open .env and paste your key:
# REACT_APP_GEMINI_API_KEY=AIza...your-key-here...

# Start both server + app together
npm run dev
```

✅ Open **http://localhost:3000** — app should be running  
✅ Open **http://localhost:3001/health** — should show `{"status":"ok","apiKeySet":true}`

---

## OPTION A — Deploy on Render.com (RECOMMENDED — Free tier available)

### Backend (Node server):
1. Go to **https://render.com** → Sign up free
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo (push project to GitHub first)
4. Settings:
   - **Name:** `nyaya-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Under **Environment Variables**, add:
   - Key: `REACT_APP_GEMINI_API_KEY`
   - Value: `AIza...your-key...`
6. Click **"Create Web Service"**
7. Copy your backend URL: `https://nyaya-api.onrender.com`

### Frontend (React app):
1. Click **"New +"** → **"Static Site"**
2. Connect same GitHub repo
3. Settings:
   - **Name:** `nyaya-app`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`
4. Under **Environment Variables**, add:
   - Key: `REACT_APP_GEMINI_API_KEY`
   - Value: same key
5. Click **"Create Static Site"**

### Connect frontend to backend:
In `src/services/geminiApi.js`, update `getProxyURL()`:
```js
function getProxyURL() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://nyaya-api.onrender.com/api/chat'; // your backend URL
  }
  return 'http://localhost:3001/api/chat';
}
```

---

## OPTION B — Deploy on Railway.app (Easiest — 1-click)

1. Go to **https://railway.app** → Sign up with GitHub
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your repo
4. Railway auto-detects Node.js
5. In **Variables** tab, add:
   - `REACT_APP_GEMINI_API_KEY` = your key
6. Railway gives you a URL automatically

> For frontend: deploy via **Vercel** (see Option C) pointing to Railway backend URL

---

## OPTION C — Deploy on Vercel (Frontend) + Render (Backend)

### Frontend on Vercel:
```bash
npm install -g vercel
vercel --prod
# Add env var when prompted: REACT_APP_GEMINI_API_KEY
```

Or via dashboard:
1. **https://vercel.com** → Import GitHub repo
2. Framework: **Create React App**
3. Add env var: `REACT_APP_GEMINI_API_KEY`
4. Deploy

### Backend on Render (same as Option A backend steps)

---

## OPTION D — Deploy on a VPS / Ubuntu Server

```bash
# On your server:
sudo apt update && sudo apt install nodejs npm nginx -y

# Upload project files, then:
cd /var/www/nyaya
npm install

# Create .env
echo "REACT_APP_GEMINI_API_KEY=AIza...your-key..." > .env

# Build React app
npm run build

# Install PM2 (keeps server running)
sudo npm install -g pm2
pm2 start server.js --name nyaya-api
pm2 startup  # auto-start on reboot
pm2 save

# Nginx config: /etc/nginx/sites-available/nyaya
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend (React build)
    root /var/www/nyaya/build;
    index index.html;

    # Backend proxy
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
    }

    # React routing
    location / {
        try_files $uri /index.html;
    }
}

sudo nginx -t && sudo systemctl reload nginx
```

---

## OPTION E — Deploy on AWS / GCP / Azure

### AWS (Elastic Beanstalk):
```bash
npm install -g eb
eb init nyaya-app --platform node.js --region ap-south-1
eb create nyaya-production
eb setenv REACT_APP_GEMINI_API_KEY=AIza...your-key...
npm run build
eb deploy
```

### Google Cloud Run:
```bash
# Build Docker image
docker build -t gcr.io/YOUR_PROJECT/nyaya .
docker push gcr.io/YOUR_PROJECT/nyaya
gcloud run deploy nyaya --image gcr.io/YOUR_PROJECT/nyaya \
  --set-env-vars REACT_APP_GEMINI_API_KEY=AIza... \
  --allow-unauthenticated
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_GEMINI_API_KEY` | ✅ YES | Google Gemini AI key (free at aistudio.google.com) |
| `PORT` | Optional | Server port (default: 3001) |
| `REACT_APP_FIREBASE_API_KEY` | Optional | Firebase for cloud storage |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Optional | Firebase project |
| `REACT_APP_FIREBASE_PROJECT_ID` | Optional | Firebase project ID |

---

## Verify Deployment

After deploying, check:
1. **`/health`** endpoint → should return `{"status":"ok","apiKeySet":true}`
2. Open app → select language → chat with AI
3. File a test complaint → verify tracking ID appears
4. Check Government Portal → complaint should show

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| AI not responding | Check `/health` — is `apiKeySet: true`? |
| CORS error | Ensure backend URL is correct in `geminiApi.js` |
| App loads but blank | Check browser console — likely missing env var |
| Voice not working | Chrome only; check mic permissions |
| Complaint not saving | Uses localStorage — clears on private/incognito |

---

## Project Structure

```
nyaya-legal-app/
├── public/index.html          ← Mobile/desktop layout shell
├── src/
│   ├── App.jsx                ← Screen router (11 screens)
│   ├── components/
│   │   ├── SplashScreen.jsx   ← Language selector
│   │   ├── HomeScreen.jsx     ← Dashboard with all features
│   │   ├── ChatScreen.jsx     ← Gemini AI chat + voice
│   │   ├── RightsScreen.jsx   ← 8 legal categories
│   │   ├── FinderScreen.jsx   ← Office finder + maps
│   │   ├── DocumentsScreen.jsx ← 6 legal letter templates
│   │   ├── LawyerScreen.jsx   ← Free Legal Aid (Article 39A)
│   │   ├── EmergencyScreen.jsx ← Emergency numbers
│   │   ├── ComplaintScreen.jsx ← 4-step complaint form ⭐ NEW
│   │   ├── TrackingScreen.jsx  ← Real-time tracking ⭐ NEW
│   │   ├── GovtPortalScreen.jsx ← Govt dashboard ⭐ NEW
│   │   ├── BottomNav.jsx      ← 6-tab navigation ⭐ UPDATED
│   │   └── Toast.jsx
│   ├── contexts/AppContext.js  ← Global state + complaints ⭐ UPDATED
│   ├── data/
│   │   ├── translations.js    ← 8 languages (all screens)
│   │   └── legalData.js       ← Offices, letters, rights data
│   └── services/geminiApi.js  ← Multilingual AI (strict language)
├── server.js                  ← Gemini proxy + fallback KB
├── .env.example               ← Copy to .env with your key
├── render.yaml                ← Render.com deploy config
├── railway.toml               ← Railway deploy config
├── vercel.json                ← Vercel deploy config
└── DEPLOY.md                  ← This file
```

---

**Built for India 🇮🇳 · Free forever · Article 39A**
