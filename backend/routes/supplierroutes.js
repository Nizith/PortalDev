const router = require("express").Router();
const SupplierCtrl = require("../controllers/supplierController");

router.post('/portaldev/createsupplier',SupplierCtrl.createSupplier);
router.get('/portaldev/readsupplier', SupplierCtrl.readSuppliers);
router.get('/portaldev/getOneSupplier/:id', SupplierCtrl.getOneSupplier);
router.put('/portaldev/updatesupplier/:id', SupplierCtrl.updatesupplier);
router.delete('/portaldev/deleteSupplier/:id', SupplierCtrl.deleteSupplier);




module.exports = router;