# TaskFlow - Complete File Structure

## 📁 Project Directory Tree

```
TaskFlow/
│
├── 📄 .gitignore                          # Git ignore rules
├── 📄 .env.example                        # Environment variables template
├── 📄 README.md                           # Main documentation
├── 📄 QUICKSTART.md                       # 5-minute setup guide
├── 📄 DEPLOYMENT.md                       # Production deployment guide
├── 📄 TESTING_GUIDE.md                    # Comprehensive testing checklist
├── 📄 VIDEO_DEMO_SCRIPT.md                # Video recording script
├── 📄 PROJECT_SUMMARY.md                  # Project overview and decisions
├── 📄 FILE_STRUCTURE.md                   # This file
├── 📄 sample-leads.csv                    # Sample CSV for testing
│
├── 📁 server/                             # Backend (Node.js + Express)
│   ├── 📄 .env                            # Environment variables (excluded from git)
│   ├── 📄 package.json                    # Backend dependencies
│   ├── 📄 server.js                       # Entry point
│   │
│   ├── 📁 src/
│   │   ├── 📄 app.js                      # Express application setup
│   │   │
│   │   ├── 📁 config/                     # Configuration files
│   │   │   ├── 📄 database.js             # MongoDB connection
│   │   │   └── 📄 multer.js               # File upload configuration
│   │   │
│   │   ├── 📁 controllers/                # Request handlers
│   │   │   ├── 📄 auth.controller.js      # Authentication logic
│   │   │   ├── 📄 agent.controller.js     # Agent CRUD operations
│   │   │   └── 📄 upload.controller.js    # File upload and distribution
│   │   │
│   │   ├── 📁 middleware/                 # Custom middleware
│   │   │   ├── 📄 auth.middleware.js      # JWT verification
│   │   │   ├── 📄 error.middleware.js     # Error handling
│   │   │   └── 📄 validate.middleware.js  # Input validation
│   │   │
│   │   ├── 📁 models/                     # Mongoose models
│   │   │   ├── 📄 Admin.model.js          # Admin schema
│   │   │   └── 📄 Agent.model.js          # Agent schema (with embedded leads)
│   │   │
│   │   ├── 📁 routes/                     # API routes
│   │   │   ├── 📄 auth.routes.js          # /api/auth endpoints
│   │   │   ├── 📄 agent.routes.js         # /api/agents endpoints
│   │   │   └── 📄 upload.routes.js        # /api/upload endpoints
│   │   │
│   │   ├── 📁 scripts/                    # Utility scripts
│   │   │   └── 📄 seedAdmin.js            # Admin user seeder
│   │   │
│   │   └── 📁 utils/                      # Helper functions
│   │       ├── 📄 csvParser.js            # CSV/Excel parsing utilities
│   │       └── 📄 distributor.js          # Round-robin distribution logic
│   │
│   └── 📁 uploads/                        # Temporary file storage
│       └── 📄 .gitkeep                    # Keep directory in git
│
└── 📁 client/                             # Frontend (React + Vite)
    ├── 📄 package.json                    # Frontend dependencies
    ├── 📄 vite.config.js                  # Vite configuration
    ├── 📄 index.html                      # HTML template
    │
    └── 📁 src/
        ├── 📄 main.jsx                    # React entry point
        ├── 📄 App.jsx                     # Main app component
        ├── 📄 index.css                   # Global styles
        │
        ├── 📁 api/
        │   └── (can add API service files here)
        │
        ├── 📁 components/                 # Reusable components
        │   ├── 📄 Header.jsx              # Navigation header
        │   └── 📄 Layout.jsx              # Page layout wrapper
        │
        ├── 📁 context/                    # React Context
        │   └── 📄 AuthContext.jsx         # Authentication context
        │
        ├── 📁 pages/                      # Route pages
        │   ├── 📄 Login.jsx               # Login page
        │   ├── 📄 Dashboard.jsx           # Dashboard with stats
        │   ├── 📄 Agents.jsx              # Agent management
        │   └── 📄 Upload.jsx              # CSV upload and distribution
        │
        ├── 📁 hooks/
        │   └── (can add custom hooks here)
        │
        └── 📁 utils/                      # Utility functions
            └── 📄 api.js                  # Axios instance with interceptors
```

---

## 📊 File Count Summary

| Category | Count |
|----------|-------|
| **Documentation Files** | 8 |
| **Backend Files** | 17 |
| **Frontend Files** | 12 |
| **Configuration Files** | 5 |
| **Total Files** | 42 |

---

## 📝 File Descriptions

### Root Level Files

| File | Purpose |
|------|---------|
| `.gitignore` | Excludes node_modules, .env, uploads, etc. |
| `.env.example` | Template for environment variables |
| `README.md` | Complete setup and usage documentation |
| `QUICKSTART.md` | Fast setup guide (5 minutes) |
| `DEPLOYMENT.md` | Production deployment instructions |
| `TESTING_GUIDE.md` | Testing checklist and procedures |
| `VIDEO_DEMO_SCRIPT.md` | Step-by-step demo recording guide |
| `PROJECT_SUMMARY.md` | Architecture decisions and summary |
| `sample-leads.csv` | Sample CSV file for testing |

---

### Backend Files

#### Core Files
- `server.js` - Application entry point, starts Express server
- `src/app.js` - Express app configuration, routes, middleware

#### Configuration
- `config/database.js` - MongoDB connection with Mongoose
- `config/multer.js` - File upload configuration (file types, size, storage)

#### Controllers (Business Logic)
- `controllers/auth.controller.js` - Login, JWT generation, get current user
- `controllers/agent.controller.js` - CRUD operations for agents
- `controllers/upload.controller.js` - File upload, parsing, distribution

#### Middleware
- `middleware/auth.middleware.js` - JWT token verification
- `middleware/error.middleware.js` - Global error handler, async wrapper
- `middleware/validate.middleware.js` - Input validation error formatter

#### Models (Database Schemas)
- `models/Admin.model.js` - Admin schema with password hashing
- `models/Agent.model.js` - Agent schema with embedded leads

#### Routes (API Endpoints)
- `routes/auth.routes.js` - POST /login, GET /me
- `routes/agent.routes.js` - CRUD endpoints for agents
- `routes/upload.routes.js` - POST /upload, GET /distribution

#### Utilities
- `utils/csvParser.js` - Parse CSV/XLSX files, validate data, normalize fields
- `utils/distributor.js` - Round-robin distribution algorithm

#### Scripts
- `scripts/seedAdmin.js` - Create initial admin user

---

### Frontend Files

#### Core Files
- `main.jsx` - React entry point
- `App.jsx` - Router, authentication provider, route definitions
- `index.css` - Global styles (all CSS in one file)

#### Components
- `components/Header.jsx` - Navigation bar with logout
- `components/Layout.jsx` - Page layout wrapper with header

#### Context
- `context/AuthContext.jsx` - Authentication state management, login/logout functions

#### Pages
- `pages/Login.jsx` - Login form
- `pages/Dashboard.jsx` - Statistics and distribution overview
- `pages/Agents.jsx` - Agent CRUD interface with modals
- `pages/Upload.jsx` - File upload, drag-drop, distribution display

#### Utilities
- `utils/api.js` - Axios instance with interceptors for auth tokens

---

## 🔍 Key File Relationships

### Authentication Flow
```
Login.jsx → AuthContext → api.js → auth.routes.js → auth.controller.js → Admin.model.js
```

### Agent Management Flow
```
Agents.jsx → api.js → agent.routes.js → agent.controller.js → Agent.model.js
```

### File Upload Flow
```
Upload.jsx → api.js → upload.routes.js → upload.controller.js
    ↓
multer.js → csvParser.js → distributor.js → Agent.model.js
```

### Protected Routes
```
App.jsx → ProtectedRoute → AuthContext
    ↓
Every API call → auth.middleware.js (JWT verification)
```

---

## 📦 Dependencies by File

### Files Using External Libraries

**Backend:**
- `server.js`: dotenv
- `app.js`: express, cors
- `database.js`: mongoose
- `multer.js`: multer
- `auth.controller.js`: bcryptjs, jsonwebtoken
- `csvParser.js`: csv-parser, xlsx
- `*.routes.js`: express-validator

**Frontend:**
- `main.jsx`: react, react-dom
- `App.jsx`: react-router-dom, react-toastify
- `api.js`: axios
- All pages: react, react hooks

---

## 🎯 Where to Find What

**Need to change...**

| Change | File Location |
|--------|---------------|
| Database URL | `server/.env` |
| JWT secret | `server/.env` |
| API endpoints | `server/src/routes/*.routes.js` |
| Business logic | `server/src/controllers/*.controller.js` |
| Database schema | `server/src/models/*.model.js` |
| Distribution algorithm | `server/src/utils/distributor.js` |
| CSV parsing logic | `server/src/utils/csvParser.js` |
| Frontend routes | `client/src/App.jsx` |
| UI styles | `client/src/index.css` |
| API base URL | `client/src/utils/api.js` |
| Login page | `client/src/pages/Login.jsx` |
| Dashboard | `client/src/pages/Dashboard.jsx` |
| Agent management | `client/src/pages/Agents.jsx` |
| File upload | `client/src/pages/Upload.jsx` |

---

## 📈 Lines of Code Estimate

| Section | Estimated LOC |
|---------|---------------|
| Backend | ~1400 lines |
| Frontend | ~1300 lines |
| Documentation | ~2500 lines |
| **Total** | **~5200 lines** |

---

## 🔑 Most Important Files

### For Understanding the Project:
1. `README.md` - Start here
2. `PROJECT_SUMMARY.md` - Architecture overview
3. `server/src/app.js` - Backend structure
4. `client/src/App.jsx` - Frontend structure

### For Running the Application:
1. `server/.env` - Configuration
2. `server/server.js` - Backend entry
3. `client/src/main.jsx` - Frontend entry

### For Modifying Features:
1. `server/src/controllers/` - Business logic
2. `client/src/pages/` - UI pages
3. `server/src/models/` - Data structure

---

**This file structure follows MERN best practices and clean architecture principles.**
