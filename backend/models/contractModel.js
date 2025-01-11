const mongoose = require("mongoose");
const payModel = require("./PaymentModel");

const AMCSchema = new mongoose.Schema({// since its an Array of AMC Detailss
    AMCpaymentterms: {
        type: String,
        required: true
    },
    AMCcurrency: {
        type: String,
        required: true
    },
    AMCamount: {
        type: [String], // Array of strings for 5 years of amounts
        required: true
    },
    paymentDescription: {
        type: String,
        required: true
    }
})

const ContractSchema = new mongoose.Schema({
    supplier: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    tenderNo: {
        type: String,
        required: true
    },
    customerContStartDate: {
        type: Date,
        required: true
    },
    customerContEndDate: {
        type: Date,
        required: true
    },
    supplierContStartDate: {
        type: Date,
        required: true
    },
    supplierContEndDate: {
        type: Date,
        required: true
    },
    subjectClerk: {
        type: String,
        required: true
    },
    salesTeam: {
        type: String,
        required: true
    },
    accountManager: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    },
    solutionTeam: {
        type: String,
        required: true
    },
    salesEngineer: {
        type: String,
        required: true
    },
    solutionEngineer: {
        type: String,
        required: true
    },
    contractStatus: {
        type: String,
        required: true
    },
    solutionDescription: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    AMCDetails: [AMCSchema],
    Payments: [
        {
            Paymentstatus: {
                type: String,
                required: true,
                default: "Not"
            },
            isPaid: {
                type: Boolean,
                required: true,
                default: false
            }
        }]
}, { timestamps: true });


module.exports = mongoose.model('contract', ContractSchema);
