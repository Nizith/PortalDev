const Supplier = require("../models/supplierModel.js");

const createSupplier = (async (req, res) => {
    const { SRno,name, category, mobile, description } = req.body;

    const newSupplier = new Supplier({
        SRno,
        name,
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

const readSuppliers = (async (rew, res) => {

    try {
        const suppliers = await Supplier.find();

        res.status(200).json({
            message: "Supplier Data fetched!.",
            data: suppliers,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Supplier Data Fetching Failed!."
        })
    }
})

module.exports = {
    createSupplier,
    readSuppliers
};