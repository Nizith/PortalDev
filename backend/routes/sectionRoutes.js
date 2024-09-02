const router = require("express").Router();
const SectionCtrl = require("../controllers/sectionController.js");

router.post('/portaldev/createSection',SectionCtrl.createSection);
router.get('/portaldev/readsection',SectionCtrl.readSection);
router.get('/portaldev/getOneSection',SectionCtrl.getOneSection);
router.put('/portaldev/updateSection',SectionCtrl.updateSection);
router.delete('/portaldev/deleteSection',SectionCtrl.deleteSection);








module.exports = router;