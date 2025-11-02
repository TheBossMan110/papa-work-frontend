# Inventory Management System (IMS)

A full-stack application for managing printer supplies inventory across multiple locations.

## Features

- **Dashboard**: Real-time metrics and analytics with charts
- **Inventory Management**: Track items, SKUs, quantities, and stock levels
- **Location Management**: Manage multiple warehouse locations
- **Printer Management**: Track printers and their supplies
- **Reporting**: Detailed reports and export functionality
- **Authentication**: Secure login with role-based access
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Professional UI with smooth transitions

## Tech Stack

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide Icons** - Icon library

### Backend
- **FastAPI** - Python web framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## Project Structure

\`\`\`
inventory-management-system/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   └── login-form.tsx
│   ├── dashboard/
│   │   ├── dashboard.tsx
│   │   ├── dashboard-view.tsx
│   │   └── metric-card.tsx
│   ├── inventory/
│   │   ├── inventory-view.tsx
│   │   ├── inventory-table.tsx
│   │   └── inventory-modal.tsx
│   ├── locations/
│   │   └── locations-view.tsx
│   ├── printers/
│   │   └── printers-view.tsx
│   ├── reports/
│   │   └── reports-view.tsx
│   └── layout/
│       ├── sidebar.tsx
│       └── header.tsx
├── backend/
│   ├── main.py
│   └── requirements.txt
└── README.md
\`\`\`

## Getting Started

### Frontend Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Backend Setup

1. Install Python dependencies:
\`\`\`bash
cd backend
pip install -r requirements.txt
\`\`\`

2. Run the FastAPI server:
\`\`\`bash
python main.py
\`\`\`

The API will be available at [http://localhost:8000](http://localhost:8000)

API documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

## Demo Credentials

- **Admin**: username: `admin`, password: `admin123`
- **Manager**: username: `manager`, password: `manager123`

## API Endpoints

### Inventory
- `GET /api/inventory` - Get all items
- `GET /api/inventory/{id}` - Get specific item
- `POST /api/inventory` - Create new item
- `PUT /api/inventory/{id}` - Update item
- `DELETE /api/inventory/{id}` - Delete item

### Locations
- `GET /api/locations` - Get all locations
- `POST /api/locations` - Create new location

### Printers
- `GET /api/printers` - Get all printers
- `POST /api/printers` - Create new printer

### Allocations
- `GET /api/allocations` - Get all allocations
- `POST /api/allocations` - Create new allocation

### Dashboard
- `GET /api/dashboard/metrics` - Get dashboard metrics
- `GET /api/dashboard/inventory-trend` - Get inventory trend data

## Features Implemented

✅ Professional dark theme with smooth animations
✅ Responsive design for all devices
✅ Real-time dashboard with metrics
✅ Inventory tracking and management
✅ Location and printer management
✅ Advanced reporting with charts
✅ CSV export functionality
✅ Authentication system
✅ RESTful API backend
✅ Hover effects and transitions

## Customization

### Colors
Edit the CSS variables in `app/globals.css` to customize the color scheme:
- `--color-primary`: Main brand color (default: #3b82f6)
- `--color-accent`: Accent color (default: #10b981)
- `--color-warning`: Warning color (default: #f59e0b)
- `--color-danger`: Danger color (default: #ef4444)

### Animations
Modify animation classes in `app/globals.css` to adjust animation speeds and effects.

## Deployment

### Frontend (Vercel)
\`\`\`bash
npm run build
vercel deploy
\`\`\`

### Backend (Any Python hosting)
\`\`\`bash
pip install -r requirements.txt
python main.py
\`\`\`

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please create an issue in the repository.
