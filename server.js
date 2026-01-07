const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/collections', require('./routes/collections'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/users/me', require('./routes/users'));

// Serve HTML pages for all other routes
app.get('*', (req, res) => {
    // Check if requesting an HTML page
    if (!req.path.startsWith('/api')) {
        const filePath = req.path === '/' ? 'index.html' : req.path;
        res.sendFile(path.join(__dirname, 'public', filePath), (err) => {
            if (err) {
                res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
            }
        });
    } else {
        res.status(404).json({ error: 'API endpoint not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
