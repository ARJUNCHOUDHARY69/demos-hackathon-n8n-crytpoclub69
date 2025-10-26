# 🔑 Update Your Dropbox Token

## Your current token has EXPIRED!

### Step 1: Get New Token
1. Go to https://www.dropbox.com/developers/apps
2. Click on your app
3. Go to "Settings" tab
4. Click "Generate" under "Access token"
5. Copy the new token

### Step 2: Update .env.local
Replace the token in your `.env.local` file:

```
DROPBOX_ACCESS_TOKEN=your_new_token_here
```

### Step 3: Update Vercel
1. Go to https://vercel.com/dashboard
2. Click on your crypto-club-69 project
3. Go to Settings → Environment Variables
4. Edit the DROPBOX_ACCESS_TOKEN variable
5. Paste your new token
6. Save

### Step 4: Test Locally
Run this to test:
```bash
node scripts/download-all-files.js
```

### Step 5: Redeploy
Push your changes and redeploy to Vercel.

## ⚠️ Important Notes:
- Dropbox tokens can expire
- Always use the latest token
- Keep your tokens secure
- Don't share tokens publicly
