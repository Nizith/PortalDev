const sectionModel = require("../models/sectionModel.js");

// Create Section
const createSection = async (req, res) => {
    try {
        const newSection = await sectionModel.create(req.body);

        return newSection ? res.status(200).json({
            message: "Section is created",
            data: newSection
        }) : res.status(500).json({
            message: "Section is not created"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

// Get All Sections
const readSection = async (req, res) => {
    try {
        const allSections = await sectionModel.find().sort({ createdAt: -1 }); // Sorting by createdAt in descending order
        if (allSections) {
            res.status(200).json({
                message: "All Sections are fetched",
                data: allSections
            });
        } else {
            res.status(500).json({
                message: "All Sections are not fetched",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

// Get One Section
const getOneSection = async (req, res) => {
    const { id } = req.params;

    try {
        const oneSection = await sectionModel.findById(id);
        return oneSection ? res.status(200).json({
            message: "Find the Section",
            data: oneSection
        }) : res.status(500).json({
            message: "Section is not found"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

// Update Section
const updateSection = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSection = await sectionModel.findByIdAndUpdate(id, req.body, { new: true });

        return updatedSection ? res.status(200).json({
            message: "Section is updated",
            data: updatedSection
        }) : res.status(500).json({
            message: "Section is not updated"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

// Delete Section
const deleteSection = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSection = await sectionModel.findByIdAndDelete(id);

        return deletedSection ? res.status(200).json({
            message: "Section is deleted",
            data: deletedSection
        }) : res.status(500).json({
            message: "Section is not deleted"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createSection,
    readSection,
    getOneSection,
    updateSection,
    deleteSection
};
