const router = require("express").Router();
const CustomerCtrl = require('../controllers/customerController');

router.post('/portaldev/createcustomer',CustomerCtrl.createCustomer )

module.exports = router;