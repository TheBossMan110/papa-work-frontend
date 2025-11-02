# Complete Setup Guide

## Prerequisites

Before you begin, make sure you have:
- Node.js 18+ ([Download](https://nodejs.org/))
- Python 3.8+ ([Download](https://www.python.org/))
- Git ([Download](https://git-scm.com/))

## Step 1: Extract and Navigate

\`\`\`bash
# Extract the downloaded ZIP file
unzip inventory-management-system.zip
cd inventory-management-system
\`\`\`

## Step 2: Frontend Setup

\`\`\`bash
# Install Node dependencies
npm install

# Start development server
npm run dev
\`\`\`

The frontend will be available at: **http://localhost:3000**

## Step 3: Backend Setup

Open a **new terminal** and run:

\`\`\`bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Setup database
python ../scripts/setup_database.py

# Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
\`\`\`

The backend API will be available at: **http://localhost:8000**

## Step 4: Login

1. Open http://localhost:3000 in your browser
2. Use one of these credentials:
   - **Admin:** admin / admin123
   - **Manager:** manager / manager123

## Step 5: Explore the Application

### Dashboard
- View real-time metrics
- Check inventory trends
- Monitor supply mix

### Inventory Management
- Add new items
- Search and filter
- Export to CSV
- Track stock levels

### Locations
- View all locations
- See items and printers per location

### Printers
- Track all printers
- Monitor status
- View supplies

### Reports
- Stock consumption trends
- Allocation by location
- Low stock alerts

## API Documentation

Access the interactive API documentation at:
**http://localhost:8000/docs**

## Troubleshooting

### Port Already in Use

If port 3000 or 8000 is already in use:

\`\`\`bash
# Frontend on different port
npm run dev -- -p 3001

# Backend on different port
uvicorn main:app --reload --host 0.0.0.0 --port 8001
\`\`\`

### Database Issues

\`\`\`bash
# Reset database
rm inventory.db
python scripts/setup_database.py
\`\`\`

### Module Not Found

\`\`\`bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
\`\`\`

## Production Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Backend (Railway/Render)
1. Create account
2. Connect GitHub
3. Set environment variables
4. Deploy

## Next Steps

- Customize the database schema
- Add more inventory items
- Create additional locations
- Integrate with your systems
- Deploy to production

## Support

For issues:
1. Check the README.md
2. Review API docs at http://localhost:8000/docs
3. Check console for error messages
\`\`\`

```json file="" isHidden
