const router= require("express").Router();
const contractCtrl = require('../controllers/contractController.js');


router.post('/portaldev/createcontract',contractCtrl.createContract)

module.exports =  router;