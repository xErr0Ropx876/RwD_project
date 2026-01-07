# StudyHub - Study Resource Platform

A fullstack web application for managing university notes, resources, and exam preparation materials. Built with plain HTML, CSS, JavaScript on the frontend and Node.js + Express + MongoDB on the backend.

## Features

- 📚 **Browse Collections**: Explore study collections organized by subject and semester
- 📝 **Resources**: Access notes, PDFs, question banks, and study materials
- 💾 **Save & Track**: Bookmark favorite collections and resources
- 📊 **Dashboard**: Track your saved items and recently viewed resources
- 🔐 **User Authentication**: Secure signup and login system with JWT
- 🎨 **Modern UI**: Clean, responsive design

## Tech Stack

### Frontend
- Plain HTML, CSS, JavaScript (no frameworks)
- Responsive design with Flexbox/Grid
- Vanilla JS for API interactions

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- RESTful API architecture

## Project Structure

```
rwd_final/
├── public/                  # Frontend files
│   ├── index.html          # Home page
│   ├── collections.html    # Browse collections
│   ├── collection.html     # Single collection view
│   ├── resource.html       # Resource detail page
│   ├── login.html          # Login page
│   ├── signup.html         # Signup page
│   ├── dashboard.html      # User dashboard
│   ├── styles.css          # Main stylesheet
│   └── js/                 # JavaScript files
│       ├── auth.js         # Authentication utilities
│       ├── home.js         # Home page logic
│       ├── collections.js  # Collections page logic
│       ├── collection.js   # Collection detail logic
│       ├── resource.js     # Resource detail logic
│       ├── login.js        # Login logic
│       ├── signup.js       # Signup logic
│       └── dashboard.js    # Dashboard logic
├── config/                  # Backend configuration
│   └── database.js         # Database connection
├── controllers/            # Route controllers
│   ├── authController.js
│   ├── collectionController.js
│   ├── resourceController.js
│   └── userController.js
├── middleware/             # Custom middleware
│   └── auth.js            # JWT authentication
├── routes/                 # API routes
│   ├── auth.js
│   ├── collections.js
│   ├── resources.js
│   └── users.js
├── database/              # Database files
│   └── schema.sql         # SQL schema & sample data
├── server.js              # Main server file
├── package.json
└── .env                   # Environment variables
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud account)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd rwd_final
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB Community Server from https://www.mongodb.com/try/download/community
- Start MongoDB service (it will run on default port 27017)

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at https://www.mongodb.com/cloud/atlas
- Create a new cluster
- Get your connection string

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/studyhub
# Or for Atlas: mongodb+srv://username:password@cluster.mongodb.net/studyhub
JWT_SECRET=your_secure_random_jwt_secret
```

### 5. Seed the Database

Populate MongoDB with sample data:
```bash
npm run seed
```

### 6. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

### 7. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### Collections
- `GET /api/collections` - Get all collections (supports filters)
- `GET /api/collections/:id` - Get single collection with resources

### Resources
- `GET /api/resources/trending` - Get trending/featured resources
- `GET /api/resources/:id` - Get single resource

### User Actions (requires authentication)
- `POST /api/users/me/saved-collections` - Save/unsave collection
- `GET /api/users/me/saved-collections` - Get saved collections
- `POST /api/users/me/saved-resources` - Save/unsave resource
- `GET /api/users/me/saved-resources` - Get saved resources
- `POST /api/users/me/progress` - Update resource progress
- `GET /api/users/me/dashboard` - Get dashboard data

## Sample Data

The database includes sample data (populated via seed script):
- 6 study collections (DSA, OS, DBMS, Computer Networks, Software Engineering, Machine Learning)
- 25+ resources across different collections
- Various resource types: notes, PDFs, question banks

## Design Philosophy

Clean, modern design focused on usability:
- **Color Palette**: Purple/blue accents with light backgrounds
- **Typography**: Clear sans-serif fonts with proper hierarchy
- **Cards**: Rounded corners with subtle shadows and hover effects
- **Spacing**: Generous whitespace for better readability
- **Responsive**: Mobile-first approach

## Development Notes

- Frontend: Vanilla JavaScript (no frameworks)
- Backend: Node.js with Express and Mongoose ODM
- Authentication: JWT tokens stored in localStorage
- CORS enabled for API access
- Static files served from the `public` directory

## Future Enhancements

- [ ] File upload for resources
- [ ] Admin panel for managing collections
- [ ] Search functionality improvements
- [ ] User profiles and avatars
- [ ] Resource ratings and reviews
- [ ] Study groups and collaboration features
- [ ] Export functionality for notes

## License

MIT License - Feel free to use this project for learning purposes.

## Credits

Built as a learning project inspired by Scrimba's excellent design and user experience.
