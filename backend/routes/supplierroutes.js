const router = require("express").Router();
const {
    createSupplier,
    readSuppliers,
    getOneSupplier,
    updatesupplier,
    deleteSupplier
} = require('../controllers/suppliercontroller');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to create a supplier - accessible by Admin and MsStaff
router.post('/createsupplier', protect, authorize('Admin', 'MsStaff'), createSupplier);

// Route to get all suppliers - accessible by all roles
router.get('/readsupplier', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), readSuppliers);

// Route to get a specific supplier by ID - accessible by all roles
router.get('/getOneSupplier/:id', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getOneSupplier);

// Route to update a supplier by ID - accessible by Admin and MsStaff
router.put('/updatesupplier/:id', protect, authorize('Admin', 'MsStaff'), updatesupplier);

// Route to delete a supplier by ID - accessible by Admin and MsStaff
router.delete('/deleteSupplier/:id', protect, authorize('Admin', 'MsStaff'), deleteSupplier);

module.exports = router;