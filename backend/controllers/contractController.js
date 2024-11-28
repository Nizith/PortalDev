const Contract = require('../models/contractModel.js');


//create the contract form
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


//retrieve all the contract details
const getAllContracts = async (req, res) => {

    const allContracts = await Contract.find();

    try {
         const allContracts = await Contract.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order

        if (!allContracts) {
            res.status(404).json({ message: 'No contracts there' })
        }

        res.status(200).json({
            message: 'Contracts Fetched Successfully',
            data: allContracts
        })


    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Contracts Data Fetching Failed!' })
    }
}

//Fetch contract by id
const getContractById = async (req, res) => {
    const { id } = req.params;

    try {
        const contract = await Contract.findById(id);

        if (!contract) {
            res.status(404).json({ message: "Couldnt Find the Contract" })
        }

        res.status(200).json({
            message: `${id}'s Contract Data Fetched`,
            data: contract
        })

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "Contract's Data Fetching Failed" })
    }
}

//Update contract by id
const updateContractById = async (req, res) => {
    const { id } = req.params;

    try {
        const updateCcontract = await Contract.findByIdAndUpdate(id, req.body, {new : true});

        if (!updateCcontract) {
            res.status(404).json({ message: "Couldnt Find the Contract" })
        }

        res.status(200).json({
            message: `${id}'s Contract Data Successfully Updated`,
            data: updateCcontract
        })

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "Contract's Data Updating Failed" })
    }
}


//Delete contract by id
const deleteContractById = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteCcontract = await Contract.findByIdAndDelete(id);

        if (!deleteCcontract) {
            res.status(404).json({ message: "Couldnt Find the Contract" })
        }

        res.status(200).json({
            message: `${id}'s Contract Data Successfully Deleted`,
            data: deleteCcontract
        })

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "Contract's Data Deleting Failed" })
    }
}


module.exports = {
    createContract,
    getAllContracts,
    getContractById,
    updateContractById,
    deleteContractById
};
