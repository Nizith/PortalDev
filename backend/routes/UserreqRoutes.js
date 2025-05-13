const router = require("express").Router();
const {
    createUser,
    readUser,
    getOneUserreq,
    updateUserreq,
    deleteUserreq
} = require('../controllers/UserreqController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to create a user request - accessible only by Admin
router.post('/createuser', protect, authorize('Admin'), createUser);

// Route to read all user requests - accessible by all roles
router.get('/readUser', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), readUser);

// Route to get a specific user request - accessible by all roles
router.get('/getOneUserreq', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getOneUserreq);

// Route to update a user request - accessible only by Admin
router.put('/updateUserreq', protect, authorize('Admin'), updateUserreq);

// Route to delete a user request - accessible only by Admin
router.delete('/deleteUserreq', protect, authorize('Admin'), deleteUserreq);

module.exports = router;