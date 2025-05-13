const router = require("express").Router();
const {
    createPayment,
    getAllPayment,
    getOnePayment,
    updatePayment,
    deletePayment
} = require('../controllers/paymentControllers');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to create a payment - accessible by Admin and MsStaff
router.post('/createpayment', protect, authorize('Admin', 'MsStaff'), createPayment);

// Route to get all payments - accessible by all roles
router.get('/Allpayments', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getAllPayment);

// Route to get a specific payment by ID - accessible by all roles
router.get('/payments/:id', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getOnePayment);

// Route to update a payment by ID - accessible by Admin and MsStaff
router.put('/updatepayments/:id', protect, authorize('Admin', 'MsStaff'), updatePayment);

// Route to delete a payment by ID - accessible by Admin and MsStaff
router.delete('/deletepayment/:id', protect, authorize('Admin', 'MsStaff'), deletePayment);

module.exports = router;