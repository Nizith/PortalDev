const Notification = require('../models/NotificationModel');
const Contract = require("../models/contractModel");

// Create a notification
const createNotification = async (req, res) => {
  const { userId, message, tenderNo } = req.body;

  try {
    // Find the contract by tenderNo and get the associated userId
    const existingContract = await Contract.findOne({ tenderNo });
    if (!existingContract) {
        res.status(400).json({ message : "No contract found with tenderNo:", tenderNo});
        return;
    }

    const notification = new Notification({ userId, message, tenderNo });
    await notification.save();
    
    res.status(201).send(notification);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get notifications for a user
const getNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).send(notifications);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
    res.status(200).send(notification);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Count unread notifications
const countUnreadNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const count = await Notification.countDocuments({ userId, isRead: false });
    res.status(200).send({ count });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createNotification,
  getNotifications,
  markAsRead,
  countUnreadNotifications,
};
