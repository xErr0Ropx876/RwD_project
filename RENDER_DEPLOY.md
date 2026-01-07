# Deployment Guide for Render

## Step 1: Setup MongoDB Atlas (Free Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Create a FREE cluster:
   - Choose AWS
   - Select a free region (closest to you)
   - Cluster Name: StudyHub
4. Create Database User:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `studyhub_user`
   - Password: Generate a secure password (save it!)
5. Whitelist IP Address:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
6. Get Connection String:
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://studyhub_user:YourPassword@cluster0.xxxxx.mongodb.net/studyhub`

## Step 2: Deploy to Render

1. **Sign Up**: Go to https://render.com and sign up with GitHub

2. **New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your repository: `xErr0Ropx876/RwD_project`
   - Click "Connect"

3. **Configure Service**:
   - **Name**: `studyhub` (or any name you want)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: leave blank
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable"
   
   Add these TWO variables:
   
   **Variable 1:**
   - Key: `MONGODB_URI`
   - Value: Your Atlas connection string (from Step 1)
   
   **Variable 2:**
   - Key: `JWT_SECRET`
   - Value: `your_super_secret_jwt_key_for_production_2024`
   
   **Variable 3 (Optional):**
   - Key: `PORT`
   - Value: `3000`

5. **Create Web Service**: Click "Create Web Service"

6. **Wait for Deployment**: 
   - Render will automatically build and deploy (takes 2-3 minutes)
   - You'll see logs in real-time
   - Wait for "Your service is live" message

7. **Seed the Database** (One-time):
   - Go to your service dashboard
   - Click "Shell" tab
   - Run: `npm run seed`
   - This populates your database with sample data

8. **Access Your App**:
   - Your app will be live at: `https://studyhub-xxxx.onrender.com`
   - Click the URL at the top of your dashboard

## Step 3: Update Your GitHub Repo (Optional)

Add the live URL to your README:

```markdown
## 🌐 Live Demo

**Live Site**: https://your-app.onrender.com

**Note**: First request may take 30-60 seconds (free tier spins down after inactivity)
```

## Troubleshooting

**Build Failed?**
- Check that `package.json` has `"engines": { "node": ">=14.0.0" }`

**App Crashes?**
- Check environment variables are set correctly
- Make sure MONGODB_URI is valid
- Check logs in Render dashboard

**Database Connection Error?**
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Double-check connection string password

**App is Slow?**
- Free tier sleeps after 15 min of inactivity
- First request takes 30-60 seconds to wake up

## Important Notes

⚠️ **Free Tier Limitations:**
- Spins down after 15 minutes of inactivity
- 750 hours/month free (enough for one app)
- Slower than paid tiers

✅ **Your app includes:**
- Automatic SSL (HTTPS)
- Automatic deployments on git push
- Environment variables secured
- Free subdomain

🎉 **You're done!** Share your link with anyone!
