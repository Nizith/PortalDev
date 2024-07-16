const User = require('../models/UserreqModel.js');

const createUser = (async(req,res) => {
    const {supplier,customer,accountManager,manager,salesEngineer,solutionEngineer,tenderNo,customerContStartDate,customerContEndDate,suppliererContStartDate,suppliererContEndDate,solutionDescription} = req.body;

    const newUserreq = new User({
        supplier,
        customer,
        accountManager,
        manager,
        salesEngineer,
        solutionEngineer,
        tenderNo,
        customerContStartDate,
        customerContEndDate,
        suppliererContStartDate,
        suppliererContEndDate,
        solutionDescription
    });

    await newUserreq.save()
    .then(() => {
        res.status(201).json({message:'User Requirements added Successfully'});
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({message:'User Requirements added Failed'})
    })

})
//This function uses Section.find() to fetch all sections from the database.
const readUser = (async (req,res) => {

    await User.find()
    .then((userReq) => {
        res.status(201).json({userReq});
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({message: 'Failed to retrive User Requirements',err});
    });
});
module.exports = {createUser,readUser}