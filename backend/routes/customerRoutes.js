const router = require("express").Router();
const CustomerCtrl = require('../controllers/customerController');

router.post('/portaldev/createcustomer',CustomerCtrl.createCustomer )
router.get('/portaldev/readcustomer', CustomerCtrl.readCustomers)
router.get('./portaldev/getOneCustomer',CustomerCtrl.getOneCustomer)
router.put('./portaldev/updateCustomer',CustomerCtrl.updateCustomer)
router.put('./portaldev/deleteCustomer',CustomerCtrl.deleteCustomer)


module.exports = router;