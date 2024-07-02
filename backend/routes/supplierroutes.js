const router = require("express").Router();
const SupplierCtrl = require("../controllers/supplierController");

router.post('/portaldev/createsupplier',SupplierCtrl.createSupplier);


module.exports = router;