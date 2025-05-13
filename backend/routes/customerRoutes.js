const router = require("express").Router();
const {
    createCustomer,
    readCustomers,
    getOneCustomer,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to create a customer - accessible by Admin and MsStaff
router.post('/createcustomer', protect, authorize('Admin', 'MsStaff'), createCustomer);

// Route to get all customers - accessible by all roles
router.get('/readcustomer', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), readCustomers);

// Route to get a specific customer by ID - accessible by all roles
router.get('/getOneCustomer/:id', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getOneCustomer);

// Route to update a customer by ID - accessible by Admin and MsStaff
router.put('/updateCustomer/:id', protect, authorize('Admin', 'MsStaff'), updateCustomer);

// Route to delete a customer by ID - accessible by Admin and MsStaff
router.delete('/deleteCustomer/:id', protect, authorize('Admin', 'MsStaff'), deleteCustomer);

module.exports = router;