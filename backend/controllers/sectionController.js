const Section = require("../models/sectionModel.js");

const createSection = ( async (req, res) => {
    const { sectionID, sectionName } = req.body;

    //This function remains unchanged. It handles the creation of a new section and saves it to the database.
    const newSection = new Section({
        sectionID, 
        sectionName
    });

    await newSection.save()
    .then(() => {
        res.status(201).json({ message: 'Section created successfully'});
    })
    .catch( (err) => {
        console.error(err);
        res.status(500).json({ message: 'Section creation unsuccessful', err});
    });

})

//This function uses Section.find() to fetch all sections from the database.
const readSection = (async (req,res) => {

    await Section.find()
    .then((sections) => {
        res.status(201).json({sections});
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({message: 'Failed to retrive sections',err});
    });
});

module.exports = { createSection , readSection}