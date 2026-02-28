# TaskFlow - Installation & Setup Scripts

## 🚀 Quick Installation (Windows)

### Option 1: Automated Installation

1. **Install Backend:**
   ```bash
   cd server
   install.bat
   ```

2. **Install Frontend:**
   ```bash
   cd client
   install.bat
   ```

### Option 2: Manual Installation

**Backend:**
```powershell
cd server
npm install
cp ../.env.example .env
# Edit .env with your settings
npm run seed
npm run dev
```

**Frontend:**
```powershell
cd client
npm install
npm run dev
```

---

## 🚀 Quick Installation (Mac/Linux)

### Backend:
```bash
cd server
npm install
cp ../.env.example .env
# Edit .env with your settings
npm run seed
npm run dev
```

### Frontend:
```bash
cd client
npm install
npm run dev
```

---

## 📝 Complete Setup Commands

### 1. Initial Setup

```bash
# Clone repository (if from git)
git clone <repository-url>
cd TaskFlow

# Install backend dependencies
cd server
npm install

# Create environment file
cp ../.env.example .env

# Edit .env file (use your preferred editor)
notepad .env  # Windows
nano .env     # Mac/Linux

# Install frontend dependencies
cd ../client
npm install
```

### 2. Database Setup

```bash
# Make sure MongoDB is running
# Windows: MongoDB runs as service automatically
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Verify MongoDB is running
mongosh

# Seed admin user
cd server
npm run seed
```

### 3. Start Application

**Terminal 1 (Backend):**
```bash
cd server
npm run dev

# You should see:
# ✅ MongoDB Connected: localhost
# 📦 Database: taskflow
# 🚀 Server running on port 5000 in development mode
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev

# You should see:
# ➜  Local:   http://localhost:3000/
# ➜  Network: use --host to expose
```

---

## 🔧 NPM Scripts Reference

### Backend (server/)

| Command | Description |
|---------|-------------|
| `npm start` | Start production server (node server.js) |
| `npm run dev` | Start development server with nodemon |
| `npm run seed` | Create initial admin user |

### Frontend (client/)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## ✅ Verification Steps

After installation, verify everything works:

1. **Check Backend:**
   - Open: http://localhost:5000/api/health
   - Should see: `{"status":"success","message":"TaskFlow API is running"}`

2. **Check Frontend:**
   - Open: http://localhost:3000
   - Should see login page

3. **Test Login:**
   - Email: `admin@taskflow.com`
   - Password: `admin123`
   - Should redirect to dashboard

---

## 🐛 Troubleshooting

### MongoDB Connection Failed

**Error:** `MongoDB connection failed`

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not running:
# Windows: Start-Service MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Mac/Linux
lsof -ti:5000 | xargs kill -9

# Or change port in server/.env
PORT=5001
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
cd server
rm -rf node_modules package-lock.json
npm install

# Or for client
cd client
rm -rf node_modules package-lock.json
npm install
```

### Admin Seed Already Exists

**Error:** `⚠️ Admin already exists`

**Solution:**
- This is normal if you've run seed before
- You can still use existing credentials
- To reset: Delete admin from MongoDB and run seed again

---

## 🔄 Reset Everything

To start completely fresh:

```bash
# Stop all running processes (Ctrl+C in terminals)

# Delete node_modules and reinstall
cd server
rm -rf node_modules package-lock.json
npm install

cd ../client
rm -rf node_modules package-lock.json
npm install

# Clear MongoDB database
mongosh
use taskflow
db.dropDatabase()
exit

# Re-seed admin
cd server
npm run seed

# Restart servers
npm run dev  # Terminal 1

cd ../client
npm run dev  # Terminal 2
```

---

## 📦 Production Build

### Build Frontend

```bash
cd client
npm run build

# Output will be in: client/dist/
```

### Start Production Server

```bash
cd server
NODE_ENV=production npm start
```

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Start everything (run in separate terminals)
cd server && npm run dev
cd client && npm run dev

# Seed admin user
cd server && npm run seed

# Build for production
cd client && npm run build

# Check MongoDB
mongosh

# View logs
cd server && npm run dev  # logs appear in terminal

# Kill processes
# Windows: Ctrl+C
# Mac/Linux: Ctrl+C or kill -9 <PID>
```

---

## 📊 Default Configuration

| Setting | Value | Change In |
|---------|-------|-----------|
| Backend Port | 5000 | server/.env (PORT) |
| Frontend Port | 3000 | client/vite.config.js |
| MongoDB URI | mongodb://localhost:27017/taskflow | server/.env (MONGODB_URI) |
| JWT Secret | (random) | server/.env (JWT_SECRET) |
| JWT Expiry | 1h | server/.env (JWT_EXPIRE) |
| Admin Email | admin@taskflow.com | server/.env (ADMIN_EMAIL) |
| Admin Password | admin123 | server/.env (ADMIN_PASSWORD) |
| Max File Size | 5MB | server/.env (MAX_FILE_SIZE) |

---

## 🎉 Success!

If you see:
- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:3000
- ✅ MongoDB connected
- ✅ Can login with admin credentials

**You're all set! Start using TaskFlow! 🚀**

---

## 📞 Need Help?

1. Check [README.md](README.md) for detailed documentation
2. Review [QUICKSTART.md](QUICKSTART.md) for fast setup
3. See [TESTING_GUIDE.md](TESTING_GUIDE.md) for testing procedures
4. Check [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
