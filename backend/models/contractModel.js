const mongoose = require ('mongoose');

const ContractSchema = new mongoose.Schema({

        TenderNo:{
            Type:Number,
            required:true
        },
        cusCntrctSD:{
            Type:Date,
            required:true
        },
        cusCntrctED:{
            Type:Date,
            required:true
        },
        supcntrctSD:{
            Type:Date,
            required:true
        },
        supcntrctED:{
            Type:Date,
            required:true
        },
        solutionDes:{
            Type:String,
            required:true
        },
        AccountManager:{
            Type:String,
            required:true
        },
        Manager:{
            Type:String,
            required:true
        },
        SalesEngineer:{
            Type:String,
            required:true
        },
        SolutionEngineer:{
            Type:String,
            required:true
        }

})
module.exports = mongoose.model('contract',ContractSchema)
