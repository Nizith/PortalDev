const router = require("express").Router();
const UserCtrl = require("../controllers/UserreqController");

router.post('/portaldev/createuser',UserCtrl.createUser);

module.exports = router;