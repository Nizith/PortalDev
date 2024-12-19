const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    tenderNo: { // Tender number as the contract identifier
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false // Default is unread
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the current date and time
    }
});
module.exports = mongoose.model("Notification", NotificationSchema);