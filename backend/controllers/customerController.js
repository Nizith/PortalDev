const customerModel = require('../models/customerModel.js');

// Create Customer
const createCustomer = async (req, res) => {
    try {
        const newCustomer = await customerModel.create(req.body);

        return newCustomer ? res.status(200).json({
            message: "Customer is created",
            data: newCustomer
        }) : res.status(500).json({
            message: "Customer is not created"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

// Get All Customers
const readCustomers = async (req, res) => {
    try {
        const customers = await customerModel.find().sort({ createdAt: -1 }); // Sorting by createdAt in descending order
        if (customers) {
            res.status(200).json({
                message: "All customers are fetched",
                data: customers
            });
        } else {
            res.status(500).json({
                message: "All customers are not fetched",
                data: customers
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

// Get One Customer
const getOneCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const OneCustomer = await customerModel.findById(id);
        return OneCustomer ? res.status(200).json({
            message: "Find the Customer",
            data: OneCustomer
        }) : res.status(500).json({
            message: "Customer is not found"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

// Update Customer
const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateCustomer = await customerModel.findByIdAndUpdate(id, req.body);

        return updateCustomer ? res.status(200).json({
            message: "Customer is updated",
            data: updateCustomer
        }) : res.status(505).json({
            message: "Customer is not updated"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

// Delete Customer
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteCustomer = await customerModel.findByIdAndDelete(id);

        return deleteCustomer ? res.status(200).json({
            message: "Customer is deleted",
            data: deleteCustomer
        }) : res.status(500).json({
            message: "Customer is not deleted"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createCustomer,
    readCustomers,
    getOneCustomer,
    updateCustomer,
    deleteCustomer
};
