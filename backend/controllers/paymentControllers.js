const payment = require("../models/PaymentModel");

const createpayment = (async (req,res) => {

    const { PRnumber,PRdate,LOIdetails,POnumber,POdate,InvoiceNumber,InvoiceDate,Paymentstatus,Paiddate,Paymentremarks,AMCpaymentterms,AMCcurrency,AMCamount} = req.body;

    const newPayment = new payment ({
        PRnumber,
        PRdate,
        LOIdetails,
        POnumber,
        POdate,
        InvoiceNumber,
        InvoiceDate,
        Paymentstatus,
        Paiddate,
        Paymentremarks,
        AMCpaymentterms,
        AMCcurrency,
        AMCamount   
    });
    
    await newPayment.save()
    .then(() => {
        res.status(201).json({ message: 'Payment Created Successfully' });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Payment Creation Failed' });

    })

})

module.exports = {createpayment};