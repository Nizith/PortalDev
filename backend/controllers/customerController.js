const Customer = require('../models/customerModel.js');// Adjust the path to your model file

const createCustomer = (async (req, res) => {
    const { CusID, name, age, status } = req.body;


    const newCustomer = new Customer({
        CusID,
        name,
        age,
        status
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

module.exports = { createCustomer };
