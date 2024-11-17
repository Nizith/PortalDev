const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    SRno:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    }

}, { timestamps: true });

module.exports = mongoose.model('supplier',SupplierSchema);