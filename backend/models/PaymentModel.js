const mongoose = require('mongoose');


const PaymentSchema = new mongoose.Schema({
     PRnumber: {
        type: String,
        require:true
     },
     PRdate: {
        type: Date,
        require:true
     },
     LOIdetails: {
        type:String,
        require:true
     },
     POnumber:{
        type:Number,
        require:true
     },
     POdate : {
        type:Date,
        require:true
     },
     InvoiceNumber :{
      type: Number ,
      require:true

     },
     InvoiceDate :{
      type:Date,
      require: true

     },
     Paymentstatus : {
        type:String,
        require:true
     },
     Paiddate:{
        type:Date,
        require:true
     },
     Paymentremarks :{
        type:String,
        require:true
     },
     AMCpaymentterms :{
      type:String,
      require :true
   },
     AMCcurrency: {
        type:String,
        require:true
     },
     AMCamount : {
        type: Number,
        require:true
     }
    

})

module.exports = mongoose.model('payment',PaymentSchema);