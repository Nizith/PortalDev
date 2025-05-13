const express = require('express');
const { register, login } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Admin-only route
router.get('/admindashboard',
    protect,           // First, verify authentication
    authorize('admin'), // Then, check if user is an admin
    (req, res) => {
        res.json({ message: 'Welcome to admin dashboard' });
    }
);

// Protected route - only authenticated users
router.get('/mssdashboard',
    protect,
    authorize('MsStaff'), // Then, check if user is an admin
    (req, res) => {
        res.json({ message: 'Welcome to MS user dashboard' });
    });

// Protected route - only authenticated users
router.get('/sstdashboard',
    protect,
    authorize('SalesTeam'), // Then, check if user is an admin
    (req, res) => {
        res.json({ message: 'Welcome to Sales Team user dashboard' });
    });


module.exports = router;