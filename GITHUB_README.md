# StudyHub

> A modern study resource management platform built with Node.js, Express, and MongoDB

[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4.4%2B-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 🌟 Features

- 📚 Browse and search study collections by subject and semester
- 📝 Access various resource types (notes, PDFs, question banks)
- 💾 Save favorite collections and resources
- 📊 Track study progress and completion status
- 🔐 Secure authentication with JWT
- 📱 Fully responsive design

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd rwd_final

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB connection string

# Seed the database with sample data
npm run seed

# Start the development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📋 Prerequisites

- **Node.js** v14 or higher
- **MongoDB** v4.4 or higher (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## 🛠️ Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Responsive design with Flexbox/Grid
- Fetch API for backend communication

### Backend
- Node.js
- Express.js
- Mongoose ODM
- JWT for authentication
- bcrypt for password hashing

### Database
- MongoDB

## 📁 Project Structure

```
rwd_final/
├── config/              # Configuration files
│   └── database.js      # MongoDB connection
├── controllers/         # Route controllers
├── database/            # Database seed script
├── middleware/          # Custom middleware
├── models/              # Mongoose models
├── public/              # Frontend files
│   ├── *.html           # HTML pages
│   ├── styles.css       # Stylesheets
│   └── js/              # JavaScript modules
├── routes/              # API routes
├── server.js            # Entry point
└── package.json
```

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/studyhub
JWT_SECRET=your_secure_random_secret
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studyhub
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Collections
- `GET /api/collections` - Get all collections
- `GET /api/collections/:id` - Get collection with resources

### Resources
- `GET /api/resources/trending` - Get featured resources
- `GET /api/resources/:id` - Get resource details

### User Actions (Protected)
- `POST /api/users/me/saved-collections` - Save/unsave collection
- `GET /api/users/me/saved-collections` - Get saved collections
- `POST /api/users/me/saved-resources` - Save/unsave resource
- `GET /api/users/me/saved-resources` - Get saved resources
- `POST /api/users/me/progress` - Update progress
- `GET /api/users/me/dashboard` - Get dashboard data

## 📝 Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm run seed     # Populate database with sample data
```

## 🎨 Sample Data

The seed script includes:
- 6 study collections (Data Structures, Operating Systems, DBMS, etc.)
- 25+ resources across different types
- Various subjects and semesters

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Built with ❤️ for students everywhere

---

**Note:** This is an educational project. Feel free to use and modify it for learning purposes.
