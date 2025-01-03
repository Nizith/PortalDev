const paymentmodel = require("../models/PaymentModel");

// Create Payment
const createPayment = async (req, res) => {
    try {
        const { tenderNo } = req.body;

        // Check if payment already exists and is paid
        const existingPayment = await paymentmodel.findOne({ tenderNo });
        if (existingPayment?.isPaid) {
            return res.status(400).json({
                message: "Payment is already settled for this tender and PO number.",
            });
        }

        // Create a new payment
        const newPayment = await paymentmodel.create(req.body);
        return res.status(201).json({
            message: "Payment is successfully created and settled.",
            data: newPayment,
        });
    } catch (error) {
        console.error("Error creating payment:", error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Payments
const getAllPayment = async (req, res) => {
    try {
        const allPayment = await paymentmodel.find({});
        if (allPayment.length > 0) {
            return res.status(200).json({
                message: "Fetched all payments successfully.",
                data: allPayment,
            });
        } else {
            return res.status(404).json({
                message: "No payments found.",
            });
        }
    } catch (error) {
        console.error("Error fetching all payments:", error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Get One Payment
const getOnePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const onePayment = await paymentmodel.findById(id);
        if (onePayment) {
            return res.status(200).json({
                message: "Fetched the payment successfully.",
                data: onePayment,
            });
        } else {
            return res.status(404).json({
                message: "Payment not found.",
            });
        }
    } catch (error) {
        console.error("Error fetching payment:", error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Update Payment
const updatePayment = async (req, res) => {
    const { id } = req.params;
    try {
        // Check if payment is already settled
        const existingPayment = await paymentmodel.findById(id);
        if (existingPayment?.isPaid) {
            return res.status(400).json({
                message: "Cannot update a payment that is already settled.",
            });
        }

        // Update payment details
        const updatedPayment = await paymentmodel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, },
            { $set: { isPaid: true, Paymentstatus: "Paid", Paiddate: new Date() } },
        );

        return updatedPayment
            ? res.status(200).json({
                message: "Payment updated successfully.",
                data: updatedPayment,
            })
            : res.status(404).json({
                message: "Payment not found for update.",
            });
    } catch (error) {
        console.error("Error updating payment:", error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Payment
const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPayment = await paymentmodel.findByIdAndDelete(id);
        return deletedPayment
            ? res.status(200).json({
                message: "Payment deleted successfully.",
                data: deletedPayment,
            })
            : res.status(404).json({
                message: "Payment not found for deletion.",
            });
    } catch (error) {
        console.error("Error deleting payment:", error.message);
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createPayment,
    getAllPayment,
    getOnePayment,
    updatePayment,
    deletePayment,
};
