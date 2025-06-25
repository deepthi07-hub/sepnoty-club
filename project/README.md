# Sepnoty Membership Portal

A comprehensive membership registration portal built with React, TypeScript, Node.js, and Google Sheets integration.

## Features

### Frontend
- **Modern React Application** with TypeScript and Tailwind CSS
- **Responsive Design** optimized for all devices
- **Professional Form** with comprehensive validation using React Hook Form and Zod
- **Admin Dashboard** with data visualization and management
- **Authentication System** for admin access
- **Smooth Animations** using Framer Motion
- **Toast Notifications** for user feedback

### Backend
- **REST API** built with Express.js
- **Google Sheets Integration** for automatic data storage
- **Local Data Storage** with JSON file backup
- **CSV Export** functionality
- **CORS Support** for cross-origin requests

### Design Features
- **Premium UI/UX** with Apple-level design aesthetics
- **Color System** with primary blues and accent greens
- **Micro-interactions** and hover states
- **Loading States** and success animations
- **Mobile-first** responsive design

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Servers**
   
   Terminal 1 - Frontend:
   ```bash
   npm run dev
   ```
   
   Terminal 2 - Backend API:
   ```bash
   npm run server
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - API: http://localhost:3001

### Admin Access
- Email: `admin@sepnoty.com`
- Password: `admin123`

## Google Sheets Integration

To enable Google Sheets integration:

1. **Set up Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google Sheets API

2. **Create Service Account**
   - Go to APIs & Services > Credentials
   - Create service account
   - Download JSON key file

3. **Configure Environment**
   - Copy `.env.example` to `.env`
   - Add your Google Sheets credentials:
     ```env
     GOOGLE_SHEETS_PRIVATE_KEY="your-private-key"
     GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account-email"
     GOOGLE_SPREADSHEET_ID="your-spreadsheet-id"
     ```

4. **Share Spreadsheet**
   - Share your Google Sheet with the service account email
   - Give it editor permissions

## API Endpoints

### Membership Routes
- `POST /api/membership` - Submit new membership application
- `GET /api/memberships` - Get all memberships (admin only)
- `GET /api/memberships/export` - Export memberships as CSV

### Utility Routes
- `GET /api/health` - Health check endpoint

## Form Fields

The membership form collects:
- **Personal Info**: Name, Email, Phone
- **Academic Info**: College, Department, Year of Study
- **Interest Areas**: Skills and areas of interest
- **Motivation**: Why join Sepnoty
- **Experience**: Previous relevant experience (optional)
- **Expectations**: What they expect from membership (optional)

## Dashboard Features

- **Statistics Overview**: Total applications, monthly stats, student count
- **Data Table**: Sortable and filterable membership data
- **Search & Filter**: By name, email, college, or year
- **Export Functionality**: Download data as CSV
- **Detailed View**: Modal with complete application details
- **Real-time Updates**: Refresh data on demand

## Technology Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- React Hook Form + Zod for form validation
- TanStack Query for data fetching
- React Hot Toast for notifications
- Lucide React for icons

### Backend
- Node.js with Express
- Google Sheets API integration
- JSON file storage
- CSV export with json2csv
- CORS middleware

## Project Structure

```
sepnoty-membership-portal/
├── src/
│   ├── components/
│   │   └── Navbar.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── MembershipForm.tsx
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server/
│   ├── index.js
│   └── memberships.json
├── package.json
└── README.md
```

## Deployment

### Frontend (Netlify/Vercel)
1. Build the application: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

### Backend (Railway/Heroku)
1. Push to Git repository
2. Connect to deployment platform
3. Set environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Email: admin@sepnoty.com
- Create an issue on GitHub

---

Built with ❤️ for the Sepnoty community