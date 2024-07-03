const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
    TenderNo: {
        type: Number,
        required: true
    },
    cusCntrctSD: {
        type: Date,
        required: true
    },
    cusCntrctED: {
        type: Date,
        required: true
    },
    supcntrctSD: {
        type: Date,
        required: true
    },
    supcntrctED: {
        type: Date,
        required: true
    },
    solutionDes: {
        type: String,
        required: true
    },
    AccountManager: {
        type: String,
        required: true
    },
    Manager: {
        type: String,
        required: true
    },
    SalesEngineer: {
        type: String,
        required: true
    },
    SolutionEngineer: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('contract', ContractSchema);