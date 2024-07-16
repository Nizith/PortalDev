const paymentmodel = require("../models/PaymentModel");

// const createpayment = (async (req,res) => {

//     const { PRnumber,PRdate,LOIdetails,POnumber,POdate,InvoiceNumber,InvoiceDate,Paymentstatus,Paiddate,Paymentremarks,AMCpaymentterms,AMCcurrency,AMCamount} = req.body;

//     const newPayment = new payment ({
//         PRnumber,
//         PRdate,
//         LOIdetails,
//         POnumber,
//         POdate,
//         InvoiceNumber,
//         InvoiceDate,
//         Paymentstatus,
//         Paiddate,
//         Paymentremarks,
//         AMCpaymentterms,
//         AMCcurrency,
//         AMCamount   
//     });
    
//     await newPayment.save()
//     .then(() => {
//         res.status(201).json({ message: 'Payment Created Successfully' });
//     })
//     .catch((error) => {
//         console.error(error);
//         res.status(500).json({ message: 'Payment Creation Failed' });

//     })

// })


//create payment
 const createPayment = async(req,res) => 
 {
    try{
        const newPayment = await paymentmodel.create(req.body);

        if(newPayment){
            return res.status(200).json({
                message:"The payment is setteled",
                data:newPayment
            })

        }else{
            return res.status(500).json({
                message:error.message,
            })

        }

    }catch(error){
        console.log(error.message)
       return res.status(500).json({
        message:Error.message
       })
    }
 }

//getAll payments
const getAllPayment = async(req,res) => {
    try{
        const allPayment = await paymentmodel.find({})
        if(allPayment) {
            return res.status(200).json({
                message:"The payment is successfully created",
                data:allPayment
            })
        }else{
            return res.status(500).json({
                message:"There are no payment created"
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:error.message
        })
    }
}

//getone payment

const getOnePayment = async(req,res) => {
    const {id} = req.params;
    try{
        const onePayment = await paymentmodel.findById(id)
        if(onePayment){
            return res.status(200).json({
                message:"Found the one payment",
                data:onePayment
            })  
        }
        else{
            return res.status(500).json({
                message:"payment is not found"
            })
        }
    }catch(error){
       return res.status(500).json({
        message:error.message
       })
    }
}

//updatePayment

const updatePayment = async(req,res) => {
    const {id} = req.params;
    try{
        const updatePayment = await paymentmodel.findByIdAndUpdate(id,req.body);

        return updatePayment ? res.status(200).json({
            message:"update the payment",
            data:updatePayment
        })
        : res.status(500).json({
            message:"payment is not updated"
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        })

    }
}


//Delete payment
const deletePayment = async(req,res) => {
    const {id} = req.params;
    try{
        const deletePayment = await paymentmodel.findByIdAndDelete(id);
        return deletePayment ? res.status(200).json({
            message:"Payment is deleted",
            data:deletePayment
        })
        :res.status(500).json({
            message:"payment is not deleted"
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}






module.exports = {createPayment, getAllPayment,getOnePayment,updatePayment, deletePayment};