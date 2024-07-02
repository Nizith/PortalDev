const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
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