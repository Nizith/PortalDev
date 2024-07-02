const router = require("express").Router();
const SupplierCtrl = require("../controllers/suppliercontroller");

router.post('/portaldev/createsupplier',SupplierCtrl.createSupplier);


module.exports = router;