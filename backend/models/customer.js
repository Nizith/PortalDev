const mongoose = require('mongoose');

const CusSchema = new mongoose.Schema({
    Cusid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        
    },
    age: {
        type: Int,
        
    },
    Status: {
        type: String,
        required: true
        
    },
    







});
module.exports = mongoose.model('customer',CusSchema)