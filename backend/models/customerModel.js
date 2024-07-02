const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    CusID: {
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
    status: {
        type: String,
        required: true
        
    },
    
});
module.exports = mongoose.model('customer',CustomerSchema)