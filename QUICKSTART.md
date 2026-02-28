# TaskFlow - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Step 2: Setup Environment

```bash
# From root directory
cp .env.example server/.env

# Edit server/.env if needed (defaults work for local development)
```

### Step 3: Start MongoDB

```bash
# Make sure MongoDB is running
# Windows: MongoDB should be running as a service
# Mac/Linux: mongod
```

### Step 4: Seed Admin User

```bash
cd server
npm run seed
```

### Step 5: Run Application

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

### Step 6: Access Application

Open browser: `http://localhost:3000`

**Login Credentials:**
- Email: `admin@taskflow.com`
- Password: `admin123`

## ✅ Testing Checklist

1. ✓ Login with admin credentials
2. ✓ Create 2-3 agents
3. ✓ Upload `sample-leads.csv` (provided in root)
4. ✓ View distribution on Dashboard
5. ✓ Check individual agent leads on Upload page

## 🎯 Key URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📝 Sample Test Data

**Agent Examples:**
```
Name: John Doe
Email: john@example.com
Phone: +11234567890
Password: password123
```

**CSV Structure:**
```csv
FirstName,Phone,Notes
John,1234567890,Test note
Jane,9876543210,Another note
```

## ❓ Common Issues

**MongoDB not connecting?**
```bash
# Check if MongoDB is running
mongosh
```

**Port 3000 or 5000 in use?**
```bash
# Kill process on port (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or change port in:
# Backend: server/.env (PORT=5001)
# Frontend: client/vite.config.js (port: 3001)
```

**Admin seed failing?**
```bash
# Make sure MongoDB is running first
# Then run: npm run seed
```

## 🎥 Video Demo

Record a video demonstration showing:
1. Login process
2. Creating agents
3. Uploading CSV file
4. Viewing distribution
5. Checking individual leads

Upload to Google Drive and share the link.

---

**Need help? Check the full README.md for detailed documentation.**
