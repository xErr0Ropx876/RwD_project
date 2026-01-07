# Vercel Deployment Guide

## 🚀 Deploy to Vercel (Easiest Method!)

### Step 1: Setup MongoDB Atlas (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free) and create a FREE cluster
3. Create database user:
   - Database Access → Add New User
   - Username: `studyhub_user`
   - Password: Generate secure password (save it!)
4. Whitelist IP:
   - Network Access → Add IP Address
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Get connection string:
   - Database → Connect → Connect your application
   - Copy string: `mongodb+srv://studyhub_user:PASSWORD@cluster.mongodb.net/studyhub`

### Step 2: Deploy to Vercel (2 minutes)

1. **Sign Up**: Go to https://vercel.com
   - Click "Sign Up"
   - Choose "Continue with GitHub"

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import from GitHub: `xErr0Ropx876/RwD_project`
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Other (or leave as detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: Leave empty or `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   Click "Environment Variables" and add:
   
   **Variable 1:**
   - Name: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
   
   **Variable 2:**
   - Name: `JWT_SECRET`
   - Value: `2ff78eff3322bffd5308cc36d89e823f43b8f90a4c0b21c6967a56026a050ab20441a62359057ebef7fa103c5541aee00ed1ac41b712cd4d584c528853fa83f9`
   
   **Variable 3:**
   - Name: `PORT`
   - Value: `3000`

5. **Deploy**: Click "Deploy" button

6. **Wait**: Deployment takes 1-2 minutes

### Step 3: Seed Database

After deployment:
1. Copy your Vercel URL (e.g., `https://rwd-project.vercel.app`)
2. Open the URL + `/api/seed` route, OR
3. Use Vercel CLI to run seed:
   ```bash
   npm i -g vercel
   vercel login
   vercel env pull
   npm run seed
   ```

Alternatively, create a simple seed endpoint (optional):
- Add a route in your server that runs the seed script when visited

### Your Live URLs:
- **Homepage**: `https://your-project.vercel.app`
- **API**: `https://your-project.vercel.app/api/*`

## ✨ Vercel Benefits:

✅ **Completely FREE**
✅ **Automatic deployments** on git push
✅ **Global CDN** (super fast)
✅ **Automatic HTTPS**
✅ **GitHub integration**
✅ **Easy to use**
✅ **Better free tier than Render** (no sleep time!)

## Important Notes:

⚠️ **Serverless Functions**: Vercel uses serverless architecture
- Each request starts a new function (cold starts possible)
- Generally faster than Render's free tier

🎯 **Custom Domain** (Optional):
- Go to Vercel Dashboard → Project → Settings → Domains
- Add your own domain for free!

## Troubleshooting:

**Build Failed?**
- Check `vercel.json` is in root directory
- Verify `package.json` has correct scripts

**Database Connection Error?**
- Verify MongoDB Atlas connection string
- Check IP whitelist (0.0.0.0/0)
- Ensure environment variables are set

**Routes Not Working?**
- Make sure `vercel.json` configuration is correct
- Check server.js exports properly

## Alternative: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

🎉 **Done!** Your app is live and auto-deploys on every GitHub push!
