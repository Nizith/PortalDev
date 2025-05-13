const router = require('express').Router();
const {
    getAllUsers,
    deleteUser,
    updateUser,
    resetPassword
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to get all users - accessible by all roles
router.get('/users', protect,  getAllUsers); // All roles can view users

// Route to delete a user - accessible only by Admin
router.delete('/users/:id', protect, authorize('Admin'), deleteUser); // Only admin can delete

// Route to update a user - accessible by Admin and MsStaff
router.put('/users/:id', protect, authorize('Admin'), updateUser); // Admin and MsStaff can update

// Route to reset a user's password - accessible only by Admin
router.put('/users/:id/resetpassword', protect, authorize('Admin'), resetPassword); // Only admin can reset password

module.exports = router;