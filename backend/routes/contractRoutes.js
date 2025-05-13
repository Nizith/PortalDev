const router = require("express").Router();
const {
    createContract,
    getAllContracts,
    getContractById,
    updateContractById,
    deleteContractById,
    getContractsOfuser
} = require('../controllers/contractController.js');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to create a contract - accessible by Admin and MsStaff
router.post('/createcontract', protect, authorize('Admin', 'MsStaff'), createContract);

// Route to get all contracts - accessible by all roles
router.get('/allcontracts', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getAllContracts);

// Route to get a specific contract by ID - accessible by all roles
router.get('/contract/:id', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getContractById);

// Route to update a contract by ID - accessible by Admin and MsStaff
router.put('/updatecontract/:id', protect, authorize('Admin', 'MsStaff'), updateContractById);

// Route to delete a contract by ID - accessible by Admin and MsStaff
router.delete('/deletecontract/:id', protect, authorize('Admin', 'MsStaff'), deleteContractById);

// Route to delete a contract by ID - accessible by Admin and MsStaff
router.get('/getusercontracts/:id', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getContractsOfuser);

module.exports = router;