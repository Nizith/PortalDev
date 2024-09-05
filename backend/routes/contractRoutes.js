const router= require("express").Router();
const contractCtrl = require('../controllers/contractController.js');


router.post('/portaldev/createcontract',contractCtrl.createContract);
router.get('/portaldev/allcontracts',contractCtrl.getAllContracts);
router.get('/portaldev/contract/:id',contractCtrl.getContractById);
router.put('/portaldev/updatecontract/:id',contractCtrl.updateContractById);
router.delete('/portaldev/deletecontract/:id',contractCtrl.deleteContractById);

module.exports =  router;