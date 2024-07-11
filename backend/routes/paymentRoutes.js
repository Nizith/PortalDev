const router = require("express").Router();
const paymentCTRL = require('../controllers/paymentControllers');

router.post('/portaldev/createpayment',paymentCTRL.createpayment)

module.exports = router;