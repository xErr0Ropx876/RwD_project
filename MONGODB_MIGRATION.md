# MongoDB Migration Guide

## Changes Made

Your application has been successfully migrated from MySQL to MongoDB! Here's what was changed:

### Files Created:
- `models/User.js` - Mongoose model for users
- `models/Collection.js` - Mongoose model for collections
- `models/Resource.js` - Mongoose model for resources
- `database/seed.js` - Script to populate the database with sample data

### Files Updated:
- `config/database.js` - Now connects to MongoDB using Mongoose
- `server.js` - Calls MongoDB connection function
- `controllers/authController.js` - Uses Mongoose models instead of SQL queries
- `controllers/collectionController.js` - Uses Mongoose models instead of SQL queries
- `controllers/resourceController.js` - Uses Mongoose models instead of SQL queries
- `controllers/userController.js` - Uses Mongoose models instead of SQL queries
- `package.json` - Replaced mysql2 with mongoose

## Setup Instructions

### 1. Install MongoDB

**Option A: MongoDB Community Server (Local Installation)**
- Download from: https://www.mongodb.com/try/download/community
- Install and run MongoDB locally on port 27017 (default)

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Go to: https://www.mongodb.com/cloud/atlas
- Create a free account
- Create a new cluster
- Get your connection string

### 2. Update Environment Variables

Update your `.env` file:

```env
# Remove old MySQL variables:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=studyhub

# Add MongoDB connection string:
MONGODB_URI=mongodb://localhost:27017/studyhub

# Or if using MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studyhub

# Keep your other variables:
JWT_SECRET=your_secret_key_here
PORT=3000
```

### 3. Install Dependencies

```bash
npm install
```

This will install mongoose (replacing mysql2).

### 4. Seed the Database

Run the seed script to populate your MongoDB database with sample data:

```bash
npm run seed
```

### 5. Start the Server

```bash
npm start
# or for development with auto-reload:
npm run dev
```

## Key Differences from MySQL

### Data Structure Changes:
- **IDs**: MongoDB uses `_id` (ObjectId) instead of auto-increment integers
- **Embedded Data**: User saved collections, resources, and progress are now embedded in the User document
- **Field Names**: Snake_case fields (like `is_featured`) changed to camelCase (`isFeatured`)

### Benefits of MongoDB:
- No need to manage JOIN operations
- Flexible schema - easy to add new fields
- Better performance for nested data
- Scalability for large datasets
- JSON-like document structure matches JavaScript objects

## Troubleshooting

**Connection Issues:**
- Make sure MongoDB is running (if using local installation)
- Check your MONGODB_URI in the .env file
- For Atlas, ensure your IP is whitelisted in the cluster settings

**Seed Data Issues:**
- Make sure MongoDB is running before running `npm run seed`
- The seed script will clear existing data and insert fresh sample data

## MongoDB Compass (Optional GUI)

For easier database management, install MongoDB Compass:
- Download from: https://www.mongodb.com/try/download/compass
- Connect using your MONGODB_URI
- View and edit your collections visually

## Next Steps

Your application is now fully migrated to MongoDB! All API endpoints remain the same, so your frontend code doesn't need any changes.
