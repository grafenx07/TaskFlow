# TaskFlow - Deployment Guide

## 🌐 Production Deployment

### Prerequisites for Production

- Node.js v16+ installed on server
- MongoDB Atlas account (or MongoDB server)
- Domain name (optional)
- SSL certificate (recommended)

---

## 📦 Deployment Options

### Option 1: Deploy to Heroku

#### Backend Deployment

1. **Prepare the backend:**
```bash
cd server
# Add a Procfile
echo "web: node server.js" > Procfile
```

2. **Create Heroku app:**
```bash
heroku create taskflow-backend
```

3. **Set environment variables:**
```bash
heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
heroku config:set JWT_SECRET="your_production_secret"
heroku config:set NODE_ENV="production"
heroku config:set ADMIN_EMAIL="admin@taskflow.com"
heroku config:set ADMIN_PASSWORD="your_secure_password"
```

4. **Deploy:**
```bash
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main
```

#### Frontend Deployment (Netlify/Vercel)

1. **Update API base URL:**
```javascript
// client/src/utils/api.js
const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'https://your-backend.herokuapp.com/api'
});
```

2. **Build frontend:**
```bash
cd client
npm run build
```

3. **Deploy to Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

### Option 2: Deploy to Digital Ocean / AWS

#### Backend Setup

1. **SSH into server:**
```bash
ssh user@your-server-ip
```

2. **Install Node.js and MongoDB:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs mongodb
```

3. **Clone and setup:**
```bash
git clone your-repo-url
cd TaskFlow/server
npm install
```

4. **Setup environment:**
```bash
nano .env
# Add production values
```

5. **Use PM2 for process management:**
```bash
npm install -g pm2
pm2 start server.js --name taskflow-backend
pm2 save
pm2 startup
```

6. **Setup Nginx reverse proxy:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

### Option 3: Docker Deployment

#### 1. Create Dockerfiles

**Backend Dockerfile (server/Dockerfile):**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

**Frontend Dockerfile (client/Dockerfile):**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 2. Docker Compose

**docker-compose.yml (root):**
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:5
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/taskflow
      - JWT_SECRET=your_production_secret
      - NODE_ENV=production
    depends_on:
      - mongodb

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

#### 3. Run with Docker Compose:
```bash
docker-compose up -d
```

---

## 🔒 Production Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret (min 32 characters)
- [ ] Enable HTTPS/SSL
- [ ] Set secure CORS origins
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting
- [ ] Set up MongoDB authentication
- [ ] Regular security updates
- [ ] Enable logging and monitoring
- [ ] Backup database regularly

---

## 🗄️ MongoDB Atlas Setup

1. **Create account:** https://www.mongodb.com/cloud/atlas

2. **Create cluster:**
   - Choose free tier
   - Select region closest to users
   - Create cluster

3. **Setup database user:**
   - Database Access → Add New User
   - Choose authentication method
   - Save credentials

4. **Whitelist IP:**
   - Network Access → Add IP Address
   - For production: Add your server IP
   - For testing: Allow access from anywhere (0.0.0.0/0)

5. **Get connection string:**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password

6. **Update .env:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority
```

---

## 🚀 Performance Optimization

### Backend
```javascript
// Add compression
import compression from 'compression';
app.use(compression());

// Add rate limiting
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);
```

### Frontend
```javascript
// Code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Use production build
npm run build
```

---

## 📊 Monitoring

### Backend Monitoring
```bash
# PM2 monitoring
pm2 monit

# Logs
pm2 logs taskflow-backend
```

### Database Monitoring
- MongoDB Atlas: Built-in monitoring dashboard
- Self-hosted: Use MongoDB Compass or mongo-express

---

## 🔄 CI/CD Pipeline (GitHub Actions)

**.github/workflows/deploy.yml:**
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'

    - name: Install dependencies
      run: |
        cd server && npm install
        cd ../client && npm install

    - name: Run tests
      run: |
        cd server && npm test

    - name: Deploy to production
      run: |
        # Add your deployment commands
```

---

## 🆘 Troubleshooting Production

**Issue: CORS errors**
```javascript
// server/src/app.js
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://your-frontend-domain.com',
  credentials: true
}));
```

**Issue: MongoDB connection timeout**
- Check if IP is whitelisted in MongoDB Atlas
- Verify connection string format
- Check firewall rules

**Issue: File upload fails**
- Check directory permissions
- Verify MAX_FILE_SIZE setting
- Check disk space

---

## 📝 Post-Deployment Steps

1. **Test all functionality:**
   - Login
   - Create agents
   - Upload CSV
   - View distribution

2. **Setup monitoring:**
   - Error tracking (Sentry)
   - Uptime monitoring (UptimeRobot)
   - Performance monitoring (New Relic)

3. **Create backups:**
   - Database backups (automated)
   - Code repository backups

4. **Documentation:**
   - Update API documentation
   - Create user guide
   - Document deployment process

---

**Deployment Complete! 🎉**
