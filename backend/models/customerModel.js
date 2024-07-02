const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    Cusid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        required: true        
    },
    Status: {
        type: String,
        required: true
        
    },
    
});
module.exports = mongoose.model('customer',CustomerSchema)