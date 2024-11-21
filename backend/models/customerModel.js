const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    BRnumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true        
    },
    contact: {
        type: Number,
        required: true
    }
}, { timestamps: true }); // Enabling timestamps to add createdAt and updatedAt fields automatically

module.exports = mongoose.model('customer', CustomerSchema);
