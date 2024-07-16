const cordinatorModel = require('../models/CordinatorsModel');


//Create Cordinators
const createCordinator = async(req,res) => {
    try{
        const newCordinator = await cordinatorModel.create(req.body)

        return newCordinator? res.status(200).json({
            message:"Cordinator is created",
            data:newCordinator
        }):
        res.status(500).json({
            message:"Cordinator is not created"
        })
    }catch(error){
       console.log(error);
       return res.status(500).json({
        mesage: error.message
       })
    }
}

//getAll cordinators

const AllCordinators = async (req,res) => {
    try{
        const allCordinators = await cordinatorModel.find({});

        return allCordinators ? res.status(200).json({
            message:"All Cordinators are fetched",
            data:allCordinators
        })
        : res.status(500).json({
            message:"All Cordinators are not fetched",
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            message:error.message
        })
    }
}

//GetOneCordinator

const getOneCordinator = async(req,res) => {
    const {id} = req.params;

    try{
        const OneCordinator = await cordinatorModel.findById(id);
        return OneCordinator ? res.status(200).json({
            message:"find the cordinator",
            data:OneCordinator
        })
        : res.status(500).json({
            message:"cordinator is not found",

        })

    }
    catch(error){
        console.log(error.message);  
        return res.status(500).json({
            message:error.message
        })
    }
}

//Update Cordinator

const updateCordinator = async(req,res) => {
    try{
        const {id} = req.params;

        const updateCordinator = await cordinatorModel.findByIdAndUpdate(id, req.body);

        return updateCordinator ? res.status(200).json({
            message:"Cordinatoe is updated",
            data:updateCordinator
        })
        : res.status(505).json({
            message:"Cordinator is not updated"
        })
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
}

//Delete Cordinator

const deleteCordinator = async(req,res) => {
    try{
        const {id} = req.params;

        const deletecordinator = await cordinatorModel.findByIdAndDelete(id);

        return deletecordinator ? res.status(200).json({
            message:"Cordinator is deleted",
            data:deletecordinator
        })
        : res.status(500).json({
            message:"Cordinator is not deleted",
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            message:error.message
        })
    }
}



module.exports = {createCordinator,AllCordinators,getOneCordinator,updateCordinator,deleteCordinator};
