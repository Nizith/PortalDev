const router = require("express").Router();
const CustomerCtrl = require('../controllers/customerdetails');

router.post('/portaldev/createcustomer',CustomerCtrl.createcustomer )

module.exports = router;