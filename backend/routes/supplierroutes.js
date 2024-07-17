const router = require("express").Router();
const SupplierCtrl = require("../controllers/supplierController");

router.post('/portaldev/createsupplier',SupplierCtrl.createSupplier);

router.get('/portaldev/readsupplier', SupplierCtrl.readSuppliers)


module.exports = router;