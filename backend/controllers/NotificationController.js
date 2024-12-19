const Notification = require("../models/NotificationModel");
const Contract = require("../models/contractModel")

//Save Notifications 
//Use this in the cron job for creating notifications.
const createNotification = async (message,tenderNo) => {
    try{
        const notification = new Notification({message , tenderNo });
        await notification.save();
    } catch(error) {
        console.error("Error saving notification",error);
    }
};

//Fetch all notfications
//Retrieves all notifications and optionally sorts them.
const getNotification = async (req,res) => {
    try{
        const notifications = await Notification.find()
        .sort({createdAt: -1});// Latest notifications first

        res.status(200).json(notifications);
    }catch(error){
        console.error("Error fetching notifications:",error);
        res.status(500).json({message:"Failed to fetch notifications."});
    }
};

//Mark notification is Read
//Updates isRead for a specific notification.
const markNotificationAsRead = async (req,res) => {
    const {id} = req.parms;

    try{
        const notification = await Notification.findByIdAndUpdate(
            id,
            {isRead: true},
            {new: true}
        );
        if(!notification){
            return res.status(404).json({message:"Notification not found"});
        }
        res.staus(200).json({message:"Notification mrked as read.",data:notification});
    }catch(error){
        console.error("Error marking notification as read:",error);
        res.status(500).json({message:"Failed to mark notification as read."});
    }
};


module.exports = {
    createNotification,
    getNotification,
    markNotificationAsRead
};