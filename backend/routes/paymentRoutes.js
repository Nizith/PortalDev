const router = require("express").Router();
const paymentCTRL = require('../controllers/paymentControllers');

//router.post('/portaldev/createpayment',paymentCTRL.createpayment);
router.post('/portaldev/createpayment',paymentCTRL.createPayment);
router.get('/portaldev/Allpayments',paymentCTRL.getAllPayment);
router.get('/portaldev/payments/:id',paymentCTRL.getOnePayment);
router.patch('/portaldev/updatepayments/:id',paymentCTRL.updatePayment);
router.delete('/portaldev/deletepayment/:id',paymentCTRL.deletePayment);


module.exports = router;