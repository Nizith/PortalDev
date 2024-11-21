const express = require('express');
const router = express.Router();

const CordinatorControll = require("../controllers/CordinatorsControllers")

router.post('/portaldev/createCordinator', CordinatorControll.createCordinator);
router.get('/portaldev/allcordinator', CordinatorControll.getAllCordinators);
router.get('/portaldev/cordinator/:id',CordinatorControll.getOneCordinator);
router.put('/portaldev/updatecordinator/:id',CordinatorControll.updateCordinator);
router.delete('/portaldev/deletecordinator/:id',CordinatorControll.deleteCordinator);




module.exports= router;