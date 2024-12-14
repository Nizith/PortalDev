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

// Retrieve active contracts over the years
const getActiveContractsOverYears = async (req, res) => {
    try {
        const activeContracts = await getYearlyData('contractStatus', 'customerContStartDate', 'customerContEndDate');
        res.status(200).json({
            message: 'Active Contracts Count Over Years Fetched Successfully',
            data: activeContracts
        });
    } catch (error) {
        console.error('Error fetching active contracts over years:', error);
        res.status(500).json({ message: 'Fetching Active Contracts Over Years Failed' });
    }
};

// Retrieve active suppliers over the years
const getActiveSuppliersOverYears = async (req, res) => {
    try {
        const activeSuppliers = await getYearlyData('contractStatus', 'customerContStartDate', 'customerContEndDate');
        res.status(200).json({
            message: 'Active Suppliers Count Over Years Fetched Successfully',
            data: activeSuppliers
        });
    } catch (error) {
        console.error('Error fetching active suppliers over years:', error);
        res.status(500).json({ message: 'Fetching Active Suppliers Over Years Failed' });
    }
};

// Retrieve active customers over the years
const getActiveCustomersOverYears = async (req, res) => {
    try {
        const activeCustomers = await getYearlyData('contractStatus', 'customerContStartDate', 'customerContEndDate');
        res.status(200).json({
            message: 'Active Customers Count Over Years Fetched Successfully',
            data: activeCustomers
        });
    } catch (error) {
        console.error('Error fetching active customers over years:', error);
        res.status(500).json({ message: 'Fetching Active Customers Over Years Failed' });
    }
};

module.exports = {
    createContract,
    getAllContracts,
    getContractById,
    updateContractById,
    deleteContractById,
   
    getActiveContractsOverYears,   // Added new function
    getActiveSuppliersOverYears,   // Added new function
    getActiveCustomersOverYears    // Added new function
};
