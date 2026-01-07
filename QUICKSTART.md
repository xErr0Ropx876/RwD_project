# Quick Start Guide

## Step-by-Step Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
- Download and install from https://www.mongodb.com/try/download/community
- MongoDB will start automatically on default port 27017

**Option B: MongoDB Atlas (Cloud - Free)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new free cluster
3. Get your connection string

### 3. Configure Environment
```bash
# Create .env file
cp .env.example .env

# Edit .env file and update:
MONGODB_URI=mongodb://localhost:27017/studyhub
# Or for Atlas: mongodb+srv://user:pass@cluster.mongodb.net/studyhub
JWT_SECRET=your_random_secret_key
```

### 4. Seed the Database
```bash
npm run seed
```

### 5. Start the Application
```bash
# Development mode (auto-restart on changes)
npm run dev

# OR Production mode
npm start
```

### 6. Open Browser
```
http://localhost:3000
```

## Test the Application

1. **Browse Collections**: Click "Browse Collections" on the homepage
2. **View Resources**: Click on any collection to see its resources
3. **Sign Up**: Create a new account
4. **Login**: Login with your credentials
5. **Save Items**: Save collections and resources
6. **Dashboard**: View your saved items in the dashboard

## Default Port

The application runs on port 3000. To change it, update the `PORT` in `.env` file.

## Troubleshooting

### MongoDB Connection Error
- Check MongoDB is running: `mongod --version`
- Verify MONGODB_URI in `.env`
- For Atlas: Check IP whitelist and credentials

### Port Already in Use
- Change PORT in `.env` file
- Or kill the process using port 3000

### Seed Script Fails
- Ensure MongoDB is running
- Check connection string in .env
- Try running `npm run seed` again

## Next Steps

- Add your own collections and resources
- Customize the design in `public/styles.css`
- Add more features based on your needs

Enjoy using StudyHub! 🚀
