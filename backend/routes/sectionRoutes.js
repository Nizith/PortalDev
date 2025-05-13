const router = require("express").Router();
const SectionCtrl = require("../controllers/sectionController.js");

router.post('/createSection',SectionCtrl.createSection);
router.get('/readsection',SectionCtrl.readSection);
router.get('/getOneSection/:id',SectionCtrl.getOneSection);
router.put('/updateSection/:id',SectionCtrl.updateSection);
router.delete('/deleteSection/:id',SectionCtrl.deleteSection);








module.exports = router;