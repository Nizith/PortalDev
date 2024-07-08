const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    BRnumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true        
    },
    contact: {
        type: Number,
        required: true
        
    },
    
});
module.exports = mongoose.model('customer',CustomerSchema)