/**
 * Simple Node.js Backend for Zalo Landing Page
 * 
 * Features:
 * - Serves static files (index.html, css, js)
 * - Basic Authentication Endpoint (Mock)
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan'); // Logger

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// --- Mock Database (In-Memory) ---
const USERS = [
    { username: 'admin', password: 'password123' }, // CHANGE THIS IN PRODUCTION
    { username: 'user', password: 'user123' }
];

// --- API Endpoints ---

/**
 * @route   POST /api/login
 * @desc    Simple authentication
 * @access  Public
 */
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validate Input
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    // Check User
    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
        // In a real app, verify password hash and return JWT
        return res.json({ 
            success: true, 
            message: 'Login successful!', 
            token: 'mock-jwt-token-xyz-123',
            user: { username: user.username }
        });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

/**
 * @route   GET /api/status
 * @desc    Health check
 */
app.get('/api/status', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// --- Catch-all Route ---
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📂 Serving static files from: ${__dirname}`);
    console.log(`Test Login with: admin / password123\n`);
});
