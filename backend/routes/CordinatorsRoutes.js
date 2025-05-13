const router = require("express").Router();
const {
    createCordinator,
    getAllCordinators,
    getOneCordinator,
    updateCordinator,
    deleteCordinator
} = require('../controllers/CordinatorsControllers');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to create a coordinator - accessible by Admin and MsStaff
router.post('/createCordinator', protect, authorize('Admin', 'MsStaff'), createCordinator);

// Route to get all coordinators - accessible by all roles
router.get('/allcordinator', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getAllCordinators);

// Route to get a specific coordinator by ID - accessible by all roles
router.get('/cordinator/:id', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getOneCordinator);

// Route to update a coordinator by ID - accessible by Admin and MsStaff
router.put('/updatecordinator/:id', protect, authorize('Admin', 'MsStaff'), updateCordinator);

// Route to delete a coordinator by ID - accessible by Admin and MsStaff
router.delete('/deletecordinator/:id', protect, authorize('Admin', 'MsStaff'), deleteCordinator);

module.exports = router;