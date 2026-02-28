<div align="center">

# ⚡ TaskFlow

### Admin Agent Lead Distribution System

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg?style=flat-square)](LICENSE)

A polished full-stack MERN application for importing leads via CSV/Excel, distributing them fairly across agents using round-robin, and managing your entire workflow from a sleek **dark glassmorphism** admin dashboard.

</div>

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 **JWT Auth** | Secure stateless admin login with 1-hour token expiry |
| 👥 **Agent Management** | Full CRUD for up to 5 agents with live lead counts |
| 📂 **File Upload** | Drag-and-drop CSV / XLSX / XLS import (max 5 MB) |
| 🔄 **Round-Robin Distribution** | Leads auto-distributed evenly across all active agents |
| 📊 **Dashboard** | Live stats, Recharts pie chart, animated counters |
| 🎨 **Premium UI** | Dark glassmorphism, Framer Motion animations, Tailwind CSS v3 |
| ✅ **Validation** | Express-validator server-side + client-side field checks |
| 🌱 **DB Seeding** | One-command admin seed script |

---

## 🖥️ Tech Stack

| Layer | Technologies |
|---|---|
| **Backend** | Node.js, Express.js (ES Modules), Mongoose, JWT, Bcrypt, Multer, csv-parser, xlsx, express-validator |
| **Frontend** | React 18, Vite 5, Tailwind CSS v3, Framer Motion, Recharts, Lucide React, React Router v6, Axios, React Toastify |
| **Database** | MongoDB Atlas |

---

## 📁 Project Structure

```
TaskFlow/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx      # Sidebar + mobile top bar
│   │   │   └── Layout.jsx      # App shell with sidebar
│   │   ├── context/
│   │   │   └── AuthContext.jsx # JWT auth state
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Agents.jsx
│   │   │   └── Upload.jsx
│   │   ├── utils/api.js        # Axios instance + interceptors
│   │   ├── App.jsx
│   │   └── index.css           # Tailwind + glassmorphism styles
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Express backend
│   ├── src/
│   │   ├── config/             # DB + Multer config
│   │   ├── controllers/        # auth / agent / upload handlers
│   │   ├── middleware/         # auth, error, validation
│   │   ├── models/             # Admin.model, Agent.model
│   │   ├── routes/             # auth / agent / upload routes
│   │   ├── scripts/seedAdmin.js
│   │   └── utils/
│   │       ├── csvParser.js    # CSV + Excel parser/validator
│   │       └── distributor.js  # Round-robin algorithm
│   ├── app.js
│   └── server.js
│
├── sample-leads.csv
├── .env.example
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js v16+**
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB)

### 1 — Clone & Install

```bash
git clone https://github.com/grafenx07/TaskFlow.git
cd TaskFlow

# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 2 — Configure Environment

```bash
cp .env.example server/.env
```

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRE=1h
ADMIN_EMAIL=admin@taskflow.com
ADMIN_PASSWORD=admin123
```

### 3 — Seed Admin User

```bash
cd server && npm run seed
```

### 4 — Run

```bash
# Terminal 1 — backend (http://localhost:5000)
cd server && npm run dev

# Terminal 2 — frontend (http://localhost:3000)
cd client && npm run dev
```

Open **http://localhost:3000** and sign in with the credentials from your `.env`.

---

## 📋 CSV / Excel Format

The uploaded file must contain these columns *(case-insensitive)*:

```csv
FirstName,Phone,Notes
Alice,+12345678901,High priority
Bob,+19876543210,Follow up Monday
Charlie,+15551234567,Interested in plan B
```

A ready-made sample is included at [`sample-leads.csv`](sample-leads.csv).

---

## 🔄 Round-Robin Distribution

Leads are assigned so every agent receives an equal (or ±1) share:

```
13 leads ÷ 5 agents
  Agent 1 → 3 leads   (rows 1, 6, 11)
  Agent 2 → 3 leads   (rows 2, 7, 12)
  Agent 3 → 3 leads   (rows 3, 8, 13)
  Agent 4 → 2 leads   (rows 4, 9)
  Agent 5 → 2 leads   (rows 5, 10)
```

Implementation: [`server/src/utils/distributor.js`](server/src/utils/distributor.js)

---

## 🌐 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| POST | `/api/auth/login` | ✗ | Admin login → JWT |
| GET | `/api/auth/me` | ✓ | Current admin |
| GET | `/api/agents` | ✓ | List all agents |
| POST | `/api/agents` | ✓ | Create agent |
| PUT | `/api/agents/:id` | ✓ | Update agent |
| DELETE | `/api/agents/:id` | ✓ | Delete agent |
| POST | `/api/upload` | ✓ | Upload file & distribute leads |
| GET | `/api/upload/distribution` | ✓ | Distribution report |

Protected routes require `Authorization: Bearer <token>` header.

---

## 🔒 Security

- Passwords hashed with **bcrypt** (10 salt rounds)
- JWT tokens expire in **1 hour**
- Files validated by both extension **and** MIME type
- All inputs sanitised via **express-validator**
- Credentials stored in `.env` — never committed to source control

---

## 🐛 Troubleshooting

| Problem | Fix |
|---|---|
| Port already in use | Change `PORT` in `server/.env` or run `npx kill-port 5000` |
| MongoDB connection refused | Whitelist your IP in Atlas → Network Access |
| File upload rejected | Confirm file is `.csv`/`.xlsx`/`.xls`, under 5 MB, and has `FirstName` + `Phone` columns |
| Token errors | Ensure `JWT_SECRET` in `.env` is set and not empty |

---

## 📄 License

Distributed under the **ISC License**.

---

<div align="center">
Built with ☕ and a lot of neon.
</div>
