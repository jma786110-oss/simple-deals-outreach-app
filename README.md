# Simple Deals — SEO Outreach Agent

A full standalone web app to find link building prospects, write outreach emails with AI, send via your company email, and track follow-ups.

---

## What this app does

1. **Find Prospects** — Searches Australian furniture, baby, appliances & outdoor sites (blogs, directories, niche sites)
2. **Compose Emails** — AI writes tailored emails for each prospect (guest post, directory, backlink types)
3. **Send via SMTP** — Sends directly from `admin@simpledeals.com.au` through your deployed API
4. **Follow-Up Tracker** — Auto-writes follow-up emails for contacts with no reply after 5 days
5. **Full Pipeline Dashboard** — Stats, recent activity, export to CSV

---

## Deploy to Render (free static site — no cost)

### Step 1 — Push to GitHub
1. Create a new GitHub repo (e.g. `simple-deals-outreach-app`)
2. Upload all these files to the repo

### Step 2 — Deploy on Render
1. Go to https://render.com → New → **Web Service**
2. Connect your GitHub repo
3. Set these values:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free
4. Click **Deploy Web Service**
5. You'll get a live URL like `https://simple-deals-outreach.onrender.com`

---

## Configure the app (first time)

Once deployed, open the app in your browser and go to **Settings**:

1. **API Base URL** — paste your backend API URL (e.g. `https://emailservicesapii-1.onrender.com`)
2. **API Key** — paste the `API_KEY` value from your backend Render environment variables
3. **From email** — `admin@simpledeals.com.au`
4. **Email password** — your SMTP password (or app password) for `admin@simpledeals.com.au`
5. Click **Test connection** — should show green tick
6. Click **Save settings**

---

## File structure

```
simple-deals-seo-outreach/
├── public/
│   ├── index.html      ← Main app HTML
│   ├── style.css       ← All styles
│   └── app.js          ← All app logic
├── server.js           ← Node.js static server
├── package.json        ← Dependencies
└── README.md
```

---

## Notes

- All settings are saved in your browser (localStorage) — no database needed
- The app connects to the FastAPI backend your developer built on Render
- Your SMTP password is stored locally in your browser only, never sent anywhere except the API
- Works on desktop and mobile

---

## Support

Built for Simple Deals | simpledeals.com.au
📞 1300 456 786 | admin@simpledeals.com.au
