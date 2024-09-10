const supplierModel = require("../models/supplierModel.js");
const Supplier = require("../models/supplierModel.js");

const createSupplier = async (req, res) => {
    try {
        const newSupplier = await supplierModel.create(req.body)
        return newSupplier ? res.status(200).json({
            message: "Supplier created is successful",
            data: newSupplier
        }) :
            res.status(500).json({
                message: "Supploer is not created"
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }

}
//getAll Suppliers
const readSuppliers = (async (req, res) => {

    try {
        const suppliers = await supplierModel.find();
        if (suppliers) {
            res.status(200).json({
                message: "All suppliers are fetched",
                data: suppliers
            })
        }
        else {
            res.status(500).json({
                message: "All suppliers are not fetched",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
})

//getOneSupplier

const getOneSupplier = async (req, res) => {
    const { id } = req.params;
    try {
        const OneSupplier = await supplierModel.findById(id);
        return OneSupplier ? res.status(200).json({
            message: "Foundd the Supplier",
            data: OneSupplier
        })
            : res.status(500).json({
                message: "Supplier is not found"
            })
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}

//Update Supplier

const updatesupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedSupplier = await supplierModel.findByIdAndUpdate(id, req.body);

        return updatedSupplier ? res.status(200).json({
            message: "Supplier is updated",
            data: updatedSupplier
        })
        : res.status(500).json({
            message: "Supplier is not updated"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
};


//Delete Supplier

const deleteSupplier = async(req, res) => {
    try {
        const { id } = req.params;

        const deleteSupplier = await supplierModel.findByIdAndDelete(id);
        console.log('hello')

        return deleteSupplier ? res.status(200).json({
            message: "Supplier is deleted",
            data: deleteSupplier
        })
            : res.status(500).json({
                message: "Supplier is not deleted",
                
            })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {
    createSupplier,
    readSuppliers,
    getOneSupplier,
    updatesupplier,
    deleteSupplier
};