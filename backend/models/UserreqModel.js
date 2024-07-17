const mongoose = require("mongoose");

const UserRequirements = new mongoose.Schema({

    supplier:{
        type:String,
        required:true
    },
    customer:{
        type:String,
        required:true
    },
    accountManager:{
        type:String,
        required:true
    },
    manager:{
        type:String,
        required:true
    },
    salesEngineer:{
        type:String,
        required:true
    },
    solutionEngineer:{
        type:String,
        required:true
    },
    tenderNo:{
        type:String,
        required:true
    },
    customerContStartDate:{
        type:Date,
        required:true
    },
    customerContEndDate:{
        type:Date,
        required:true
    },
    suppliererContStartDate:{
        type:Date,
        required:true
    },
    suppliererContEndDate:{
        type:Date,
        required:true
    },
    solutionDescription:{
        type:String,
        required:true
    }



})

module.exports = mongoose.model('userreq', UserRequirements);












 