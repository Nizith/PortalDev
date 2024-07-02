const Section = require("../models/sectionModel.js");

const createSection = ( async (req, res) => {
    const { sectionID, sectionName } = req.body;

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
    })
})

module.exports = { createSection }