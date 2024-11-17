const cordinatorModel = require('../models/CordinatorsModel');

// Create Cordinator
const createCordinator = async (req, res) => {
    try {
        console.log("Request body:", req.body); // Log the request body
        const newCordinator = await cordinatorModel.create(req.body);
        return res.status(200).json({
            message: "Cordinator is created",
            data: newCordinator
        });
    } catch (error) {
        console.error("Error creating cordinator:", error); // Log the error
        return res.status(500).json({
            message: error.message
        });
    }
}

// Get All Cordinators
const getAllCordinators = async (req, res) => {
    try {
        const cordinators = await cordinatorModel.find().sort({ createdAt: -1 }); // Sorting by createdAt in descending order
        if (cordinators) {
            res.status(200).json({
                message: "All cordinators are fetched",
                data: cordinators
            });
        } else {
            res.status(500).json({
                message: "All cordinators are not fetched"
            });
        }
    } catch (error) {
        console.error("Error fetching cordinators:", error);
        return res.status(500).json({
            message: error.message
        });
    }
}

// Get One Cordinator
const getOneCordinator = async (req, res) => {
    const { id } = req.params;
    try {
        const oneCordinator = await cordinatorModel.findById(id);
        return oneCordinator ? res.status(200).json({
            message: "Cordinator found",
            data: oneCordinator
        }) : res.status(500).json({
            message: "Cordinator is not found"
        });
    } catch (error) {
        console.error("Error fetching cordinator:", error);
        return res.status(500).json({
            message: error.message
        });
    }
}

// Update Cordinator
const updateCordinator = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCordinator = await cordinatorModel.findByIdAndUpdate(id, req.body, { new: true });

        return updatedCordinator ? res.status(200).json({
            message: "Cordinator is updated",
            data: updatedCordinator
        }) : res.status(500).json({
            message: "Cordinator is not updated"
        });
    } catch (error) {
        console.error("Error updating cordinator:", error);
        return res.status(500).json({
            message: error.message
        });
    }
}

// Delete Cordinator
const deleteCordinator = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCordinator = await cordinatorModel.findByIdAndDelete(id);

        return deleteCordinator ? res.status(200).json({
            message: "Cordinator is deleted",
            data: deleteCordinator
        }) : res.status(500).json({
            message: "Cordinator is not deleted"
        });
    } catch (error) {
        console.error("Error deleting cordinator:", error);
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createCordinator,
    getAllCordinators,
    getOneCordinator,
    updateCordinator,
    deleteCordinator
};
