const router = require("express").Router();
const CustomerCtrl = require('../controllers/customerController');

router.post('/portaldev/createcustomer',CustomerCtrl.createcustomer )

module.exports = router;