# Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Push to GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/inventory-management-system.git
git push -u origin main
\`\`\`

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

Your frontend will be live at: `https://your-project.vercel.app`

---

## Backend Deployment (Railway)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your repository

### Step 3: Configure Environment
1. Add environment variables:
   - `SECRET_KEY`: Your secret key
   - `DATABASE_URL`: Your database URL

### Step 4: Deploy
Railway will automatically deploy when you push to GitHub.

Your backend will be live at: `https://your-project.railway.app`

---

## Backend Deployment (Render)

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create New Web Service
1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub repository

### Step 3: Configure
- **Name**: inventory-api
- **Environment**: Python 3
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 8000`

### Step 4: Add Environment Variables
1. Go to "Environment"
2. Add:
   - `SECRET_KEY`: Your secret key
   - `DATABASE_URL`: Your database URL

### Step 5: Deploy
Click "Create Web Service"

Your backend will be live at: `https://your-project.onrender.com`

---

## Database Migration

### SQLite to PostgreSQL

1. Install PostgreSQL adapter:
\`\`\`bash
pip install psycopg2-binary
\`\`\`

2. Update connection string in `backend/main.py`:
\`\`\`python
DATABASE_URL = "postgresql://user:password@localhost/inventory_db"
\`\`\`

3. Run migration script:
\`\`\`bash
python scripts/migrate_to_postgres.py
\`\`\`

---

## Production Checklist

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Set `DEBUG = False`
- [ ] Configure CORS for specific domains
- [ ] Set up HTTPS/SSL
- [ ] Configure database backups
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up CI/CD pipeline
- [ ] Test all endpoints
- [ ] Set up error tracking (Sentry)

---

## Monitoring

### Frontend Monitoring
- Use Vercel Analytics
- Set up error tracking with Sentry

### Backend Monitoring
- Use Railway/Render built-in monitoring
- Set up application performance monitoring (APM)
- Configure log aggregation

---

## Scaling

### Frontend
- Vercel automatically scales
- Use CDN for static assets

### Backend
- Use PostgreSQL instead of SQLite
- Implement caching (Redis)
- Use load balancing
- Implement database connection pooling

---

## Support

For deployment issues:
1. Check service documentation
2. Review logs
3. Check environment variables
4. Verify database connection
