const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    sectionID:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }

})

module.exports = mongoose.model('supplier',SupplierSchema);