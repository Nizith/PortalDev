const UserCtrl = require('../controllers/userController');
const router = require('express').Router();


router.post('/portaldev/registration',UserCtrl.insertUser);
router.post('/portaldev/login',UserCtrl.loginUser);

router.get('/portaldev/users', UserCtrl.getAllUsers); // New route for fetching users
router.delete('/portaldev/users/:id',  UserCtrl.deleteUser);//Only admin  can delete
router.put('/portaldev/users/:id', UserCtrl.updateUser); // Both  admin and  user can  yodate
router.put('/portaldev/users/:id/resetpassword', UserCtrl.resetPassword); // Only  admin can reset password

module.exports = router;