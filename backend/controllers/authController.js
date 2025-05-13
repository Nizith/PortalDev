const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET, JWT_EXPIRE, ADMIN_REGISTRATION_KEY } = require('../config/config');

// Generate JWT Token
const generateToken = (tokenPayload) => {
    return jwt.sign(tokenPayload, JWT_SECRET, {
        expiresIn: JWT_EXPIRE
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { username, password, adminKey } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({
                success: false,
                error: 'User already exists'
            });
        }

        // Check for admin registration
        let role = 'user';
        if (adminKey && adminKey === ADMIN_REGISTRATION_KEY) {
            role = 'Admin';
        }

        // Create user
        const user = await User.create({
            username,
            password,
            role
        });

        // Generate token
        const tokenPayload = { id: user._id, username, role };
        const token = generateToken(tokenPayload);

        // Decode the token (optional, without verifying)
        const decoded = jwt.decode(token);

        res.status(201).json({
            success: true,
            token,
            decoded,
            id: user._id,
            username: user.username,
            role: user.role
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Generate token
        const tokenPayload = { id: user._id, username: user.username, role: user.role };
        const token = generateToken(tokenPayload);

        const decoded = jwt.decode(token);

        res.status(200).json({
            success: true,
            token,
            expiresAt: new Date(decoded.exp * 1000).toLocaleString(),
            id: user._id,
            username: user.username,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

