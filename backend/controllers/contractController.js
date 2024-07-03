const Contract = require('../models/contractModel.js')

const createContract = (async(req,res) => {
    const {TenderNo, cusCntrctSD , cusCntrctED , supcntrctSD , supcntrctED , solutionDes , AccountManager , Manager , SalesEngineer , SolutionEngineer} = req.body;

    const newContract = new Contract({
        TenderNo, 
        cusCntrctSD, 
        cusCntrctED, 
        supcntrctSD,
        supcntrctED, 
        solutionDes, 
        AccountManager, 
        Manager, 
        SalesEngineer,
        SolutionEngineer
    });

    await newContract.save()
        .then(() => {
            res.status(201).json({ message: 'Contract Created Successfully' });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Contract Creation Failed' });
        })

})
module.exports = { createContract };