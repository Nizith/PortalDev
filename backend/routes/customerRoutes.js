const router = require("express").Router();
const CustomerCtrl = require('../controllers/customerController');

router.post('/portaldev/createcustomer',CustomerCtrl.createCustomer )
router.get('/portaldev/readcustomer', CustomerCtrl.readCustomers)
router.get('/portaldev/getOneCustomer/:id',CustomerCtrl.getOneCustomer)
router.put('/portaldev/updateCustomer/:id',CustomerCtrl.updateCustomer)
router.delete('/portaldev/deleteCustomer/:id',CustomerCtrl.deleteCustomer)


module.exports = router;