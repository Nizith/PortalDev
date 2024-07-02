const router = require("express").Router();
const SectionCtrl = require("../controllers/sectionController.js");

router.post('/portaldev/createsection', SectionCtrl.createSection);

module.exports = router;