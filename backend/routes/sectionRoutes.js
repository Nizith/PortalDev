const router = require("express").Router();
const SectionCtrl = require("../controllers/sectionController.js");

router.post('/portaldev/createsection', SectionCtrl.createSection);//This route handles the creation of a new section.
router.get('/portaldev/readsection',SectionCtrl.readSection);//This route handles fetching all sections.

module.exports = router;