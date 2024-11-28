const UserCtrl = require('../controllers/userController');
const router = require('express').Router();

router.post('/portaldev/registration',UserCtrl.insertUser);
router.post('/portaldev/login',UserCtrl.loginUser);

router.get('/portaldev/users', UserCtrl.getAllUsers); // New route for fetching users
router.delete('/portaldev/users/:id', UserCtrl.deleteUser); // Add this route
router.put('/portaldev/users/:id', UserCtrl.updateUser); // New update route
router.put('/portaldev/users/:id/resetpassword', UserCtrl.resetPassword); // New route for password reset

module.exports = router;