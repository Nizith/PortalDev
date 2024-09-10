const sectionModel = require("../models/sectionModel.js");
const Section = require("../models/sectionModel.js");

//Create Customers
const createSection = async (req, res) => {
    try {
        const newSection = await sectionModel.create(req.body)

        return newSection ? res.status(200).json({
            message: "Section is created",
            data: newSection
        }) :
            res.status(500).json({
                message: "Section is not created"
            })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}

//getAll Sections
const readSection = (async (req, res) => {
    try {
        const allSections = await sectionModel.find();
        if (allSections) {
            res.status(200).json({
                message: "All Sections are fetched",
                data: allSections
            })
        }
        else {
            res.status(500).json({
                message: "All Sctions are not fetched",
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.statys(500).json({
            message: error.message
        })
    }

})

//Getone section
const getOneSection = async (req, res) => {
    const { id } = req.params;

    try {
        const oneSection = await sectionModel.findById(id);
        return oneSection ? res.status(200).json({
            message: "find the Section",
            data: oneSection
        })
            : res.status(500).json({
                message: "Section is not found",
            })
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: error.message
        })
    }
}

//Update Section

const updateSection = async (req, res) => {
    try {
        const { id } = req.params;

        const updateSection = await sectionModel.findByIdAndUpdate(id, req.body);

        return updateSection ? res.status(200).json({
            message: "Section is Updated",
            data: updateSection
        })
            : res.status(505).json({
                message: "section is not updated"
            })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
}

//Delete Section

const deleteSection = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteSection = await sectionModel.findByIdAndDelete(id);

        return deleteSection ? res.status(200).json({
            message: "Section is deleted",
            data: deleteSection
        })
            : res.status(505).json({
                message: "Section is not deleted",
            })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: error.message
        })
    }
}




module.exports = { createSection, readSection, getOneSection, updateSection, deleteSection }