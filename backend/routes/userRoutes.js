const UserCtrl = require('../controllers/userController');
const router = require('express').Router();

router.post('/portaldev/registration',UserCtrl.insertUser);
router.post('/portaldev/login',UserCtrl.loginUser);

module.exports = router;