const router = require("express").Router();
const SupplierCtrl = require("../controllers/supplierController");

router.post('/portaldev/createsupplier',SupplierCtrl.createSupplier);
router.get('/portaldev/readsupplier', SupplierCtrl.readSuppliers);
router.get('/portaldev/getOneSupplier', SupplierCtrl.getOneSupplier);
router.put('/portaldev/updatesupplier', SupplierCtrl.updatesupplier);
router.put('/portaldev/deleteSupplier', SupplierCtrl.deleteSupplier);



module.exports = router;