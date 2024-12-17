const Contract = require('../models/contractModel');
const moment = require('moment');

// Create the contract form
const createContract = async (req, res) => {
    console.log('Received contract data :', req.body);

    const newContract = new Contract(req.body);

    try {
        await newContract.save();
        res.status(201).json({ message: 'Contract Created Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Contract Creation Failed' });
    }
};

// Retrieve all the contract details
const getAllContracts = async (req, res) => {
    try {
        const allContracts = await Contract.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order

        if (!allContracts.length) {
            return res.status(404).json({ message: 'No contracts found' });
        }

        res.status(200).json({
            message: 'Contracts Fetched Successfully',
            data: allContracts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Contracts Data Fetching Failed!' });
    }
};

// Fetch contract by id
const getContractById = async (req, res) => {
    const { id } = req.params;

    try {
        const contract = await Contract.findById(id);

        if (!contract) {
            return res.status(404).json({ message: "Couldn't Find the Contract" });
        }

        res.status(200).json({
            message: `${id}'s Contract Data Fetched`,
            data: contract
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Contract's Data Fetching Failed" });
    }
};

// Update contract by id
const updateContractById = async (req, res) => {
    const { id } = req.params;

    try {
        const updateCcontract = await Contract.findByIdAndUpdate(id, req.body, { new: true });

        if (!updateCcontract) {
            return res.status(404).json({ message: "Couldn't Find the Contract" });
        }

        res.status(200).json({
            message: `${id}'s Contract Data Successfully Updated`,
            data: updateCcontract
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Contract's Data Updating Failed" });
    }
};

// Delete contract by id
const deleteContractById = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteCcontract = await Contract.findByIdAndDelete(id);

        if (!deleteCcontract) {
            return res.status(404).json({ message: "Couldn't Find the Contract" });
        }

        res.status(200).json({
            message: `${id}'s Contract Data Successfully Deleted`,
            data: deleteCcontract
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Contract's Data Deleting Failed" });
    }
};

// Helper function to aggregate data by year
const getYearlyData = async (queryField, startDateField, endDateField) => {
    const currentYear = moment().year();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 1 + i); // From last year to 3 years in the future
    const yearlyData = [];

    for (const year of years) {
        const startOfYear = moment().year(year).startOf('year').toDate();
        const endOfYear = moment().year(year).endOf('year').toDate();

        const count = await Contract.countDocuments({
            [queryField]: 'active',
            [startDateField]: { $lte: endOfYear }, // Contract started on or before the end of this year
            [endDateField]: { $gte: startOfYear }  // Contract ends on or after the start of this year
        });

        yearlyData.push({ year, count });
    }

    return yearlyData;
};

// Modify your existing contract fetching route to group by year
const getContractsByYear = async (req, res) => {
    try {
        const contracts = await Contract.aggregate([
            {
                $group: {
                    _id: { $year: "$customerContStartDate" }, // Group by year
                    count: { $sum: 1 }  // Count the number of contracts per year
                }
            },
            { $sort: { "_id": 1 } } // Sort by year ascending
        ]);
        res.status(200).json({ data: contracts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contracts by year', error });
    }
};


// Modify your existing supplier fetching route to group by year
const getSuppliersByYear = async (req, res) => {
    try {
        const suppliers = await Supplier.aggregate([
            {
                $group: {
                    _id: { $year: "$createdAt" }, // Group by year
                    count: { $sum: 1 }  // Count the number of suppliers per year
                }
            },
            { $sort: { "_id": 1 } } // Sort by year ascending
        ]);
        res.status(200).json({ data: suppliers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching suppliers by year', error });
    }
};


// Modify your existing customer fetching route to group by year
const getCustomersByYear = async (req, res) => {
    try {
        const customers = await Customer.aggregate([
            {
                $group: {
                    _id: { $year: "$createdAt" }, // Group by year
                    count: { $sum: 1 }  // Count the number of customers per year
                }
            },
            { $sort: { "_id": 1 } } // Sort by year ascending
        ]);
        res.status(200).json({ data: customers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers by year', error });
    }
};



module.exports = {
    createContract,
    getAllContracts,
    getContractById,
    updateContractById,
    deleteContractById,
  
};
