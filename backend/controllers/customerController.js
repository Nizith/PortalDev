const Customer = require('../models/customerModel.js');// Adjust the path to your model file

const createCustomer = (async (req, res) => {
    const { BRnumber, name, email, contact } = req.body;


    const newCustomer = new Customer({
        BRnumber,
        name,
        email,
        contact
    });

    await newCustomer.save()
        .then(() => {
            res.status(201).json({ message: 'Customer Created Successfully' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Customer Creation Failed' });
        })
})

const readCustomers = (async(req, res) => {
    const customers = await Customer.find()

    try {
        res.status(200).json({
            message: "Customer Data Fetched!",
            data: customers
        })
    } catch (error) {
        res.status(200).json({
            message: "Customer data fetching failed"
        })
    }
})

module.exports = { 
    createCustomer,
    readCustomers
 };
