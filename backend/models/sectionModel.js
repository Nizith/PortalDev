const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
    sectionID: {
        type: String,
        required: true
    },
    sectionName: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Add this line to enable timestamps

module.exports = mongoose.model('section', SectionSchema);
