const router = require("express").Router();
const CustomerCtrl = require('../controllers/customerController');

router.post('/portaldev/createcustomer',CustomerCtrl.createCustomer )

router.get('/portaldev/readcustomer', CustomerCtrl.readCustomers)

module.exports = router;