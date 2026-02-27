# NYAYA — Quick Start Guide

## Step 1: Get a FREE Gemini API Key
Go to: https://aistudio.google.com/app/apikey
Click "Create API Key" — it's completely free.

## Step 2: Create your .env file
In the project folder, create a file called `.env` (no extension):
```
REACT_APP_GEMINI_API_KEY=AIza...your-key-here...
```
⚠️ Must start with AIza. No quotes. No spaces.

## Step 3: Install & Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Verify API is working
Open http://localhost:3001/health
You should see: {"status":"ok","model":"gemini-2.0-flash","apiKeySet":true}

## Model Info
Uses: gemini-2.0-flash (free tier, fast, latest)
