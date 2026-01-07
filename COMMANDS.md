# Command Cheat Sheet

## Installation

```bash
# Install all dependencies
npm install
```

## Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database and import schema
CREATE DATABASE studyhub;
USE studyhub;
SOURCE database/schema.sql;
```

## Running the Application

```bash
# Development mode (auto-restart on file changes)
npm run dev

# Production mode
npm start
```

## Environment Configuration

```bash
# Create .env file from example
cp .env.example .env

# Edit .env (update your MySQL password)
# You can use notepad or any text editor
notepad .env
```

## Testing Endpoints

```bash
# Test if server is running
curl http://localhost:3000

# Test API endpoint (example)
curl http://localhost:3000/api/collections
```

## Common Tasks

### Reset Database
```sql
-- Drop and recreate database
DROP DATABASE IF EXISTS studyhub;
CREATE DATABASE studyhub;
USE studyhub;
SOURCE database/schema.sql;
```

### Change Server Port
```bash
# Edit .env file and change PORT value
PORT=4000
```

### View Server Logs
Server logs will appear in the terminal where you ran `npm start` or `npm run dev`

## Troubleshooting Commands

### Check if MySQL is running (Windows)
```bash
# Check MySQL service
sc query MySQL80

# Start MySQL service
net start MySQL80
```

### Check if port 3000 is in use
```bash
# Windows
netstat -ano | findstr :3000

# Kill process by PID (if needed)
taskkill /PID <PID> /F
```

### Clear node_modules (if issues)
```bash
# Remove node_modules and reinstall
rmdir /s /q node_modules
npm install
```

## Quick Browser Test URLs

- Homepage: http://localhost:3000
- Collections: http://localhost:3000/collections.html
- Login: http://localhost:3000/login.html
- Signup: http://localhost:3000/signup.html
- Dashboard: http://localhost:3000/dashboard.html (requires login)

## Sample User Creation (via API)

```bash
# Using curl to create a test user
curl -X POST http://localhost:3000/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

## Development Tips

### Watch for file changes
```bash
# Use nodemon (already configured in package.json)
npm run dev
```

### Check package.json scripts
```bash
# View all available scripts
npm run
```

## Git Commands (if using version control)

```bash
# Initialize git repository
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit - StudyHub application"
```

## Useful MySQL Commands

```sql
-- Show all databases
SHOW DATABASES;

-- Use studyhub database
USE studyhub;

-- Show all tables
SHOW TABLES;

-- View collections
SELECT * FROM collections;

-- View resources
SELECT * FROM resources;

-- View users (without passwords)
SELECT id, name, email, created_at FROM users;
```

## Performance

### View server response time
Open browser DevTools (F12) → Network tab → Check request timing

### Monitor memory usage
Check terminal where server is running for any memory warnings

## Production Deployment Checklist

- [ ] Change JWT_SECRET to a strong random value
- [ ] Update DB credentials
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Setup proper CORS origins
- [ ] Add rate limiting
- [ ] Setup logging
- [ ] Configure backups

## Support

For issues or questions:
1. Check README.md
2. Check QUICKSTART.md
3. Review code comments
4. Check browser console for errors
5. Check server terminal for errors

---

Keep this file handy for quick reference! 🚀
