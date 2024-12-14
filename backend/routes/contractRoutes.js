const express = require('express');
const router = express.Router();
const {
  createContract,
  getAllContracts,
  getContractById,
  updateContractById,
  deleteContractById,

  getActiveContractsOverYears,   // Added new function
    getActiveSuppliersOverYears,   // Added new function
    getActiveCustomersOverYears    // Added new function
} = require('../controllers/contractController');

// Routes for contract operations
router.post('/portaldev/createcontract', createContract);
router.get('/portaldev/allcontracts', getAllContracts);
router.get('/portaldev/contract/:id', getContractById);
router.put('/portaldev/updatecontract/:id', updateContractById);
router.delete('/portaldev/deletecontract/:id', deleteContractById);

// New routes for fetching active data
router.get('/portaldev/activecontracts', getActiveContractsOverYears);
router.get('/portaldev/activecustomers', getActiveCustomersOverYears);
router.get('/portaldev/activesuppliers', getActiveSuppliersOverYears);

module.exports = router;
