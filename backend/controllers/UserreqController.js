const UserreqModel = require('../models/UserreqModel.js');
const User = require('../models/UserreqModel.js');

const createUser = (async (req, res) => {
    try {
        const newUser = await UserreqModel.create(req.body)

        return newUser ? res.status(200).json({
            message: "Requirement is created",
            data: newUser
        }) :
            res.status(500).json({
                message: "Requirement is not created"
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }

})

//All USerrequirements
const readUser = (async (req, res) => {
    try {
        const allUserreq = await UserreqModel.find({})
        if (allUserreq) {
            res.status(200).json({
                message: "All requiremnets are fetched",
                data: allUserreq
            })
        }
        else {
            res.status(500).json({
                message: "All requiremnets are not fetched",
            })

        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
})

//GetOneUserrequirements
const getOneUserreq = async (req, res) => {
    try {
        const OneUserreq = await UserreqModel.findById(id);
        return OneUserreq ? res.status(200).json({
            message: "Find the Userrequirement",
            data: OneUserreq
        })
            : res.status(500).json({
                message: "Userrequirement is not found",
            })
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}

//update Userrequirements

const updateUserreq = async (req, res) => {
    try {
        const { id } = req.params;

        const updateUserreq = await UserreqModel.findByIdAndUpdate(id, req.body);

        return updateUserreq ? res.status(200).json({
            message: "User Requirements is Updated",
            data: updateUserreq
        })
            : res.status(505).json({
                message: "User Requiremnts is not updated"
            })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
}

//Delete Userrequirements

const deleteUserreq = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteUserreq = await UserreqModel.findByIdAndDelete(id);

        return deleteUserreq ? res.status(200).json({
            message: "User Requirement is deleted",
            data: deleteUserreq
        })
            : res.status(500).json({
                message: "User requiremnts is not deleted",
            })
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.messsage
        })
    }
}


module.exports = { createUser, readUser, getOneUserreq, updateUserreq, deleteUserreq }