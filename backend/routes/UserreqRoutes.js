const express = require('express');
const router = require("express").Router();

const UserCtrl = require("../controllers/UserreqController");

router.post('/portaldev/createuser', UserCtrl.createUser);
router.get('/portaldev/readUser', UserCtrl.readUser);
router.get('/portaldev/getOneUserreq', UserCtrl.getOneUserreq);
router.put('/portaldev/updateUserreq', UserCtrl.updateUserreq);
router.delete('/portaldev/deleteUserreq', UserCtrl.deleteUserreq);



module.exports = router;