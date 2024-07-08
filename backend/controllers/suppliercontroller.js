const Supplier = require("../models/supplierModel.js");

const createSupplier = (async (req, res) => {
    const { SRno, category,mobile,description} = req.body;

    const newSupplier = new Supplier({
        SRno,
        category,
        mobile,
        description
    });

    await newSupplier.save()
        .then(() => {
            res.status(201).json({ message: "new supplier created successfully" });
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json({ message: "Supplier creattion unsuccessful", error })
        })

})

module.exports = { createSupplier };