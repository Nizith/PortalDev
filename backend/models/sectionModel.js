const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
    sectionID: {
        type: String,
        required: true
    },
    sectionName: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('section', SectionSchema);