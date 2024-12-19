const express = require("express");

const {
    getNotification,
    markNotificationAsRead,
} = require("../controllers/NotificationController");

const router = express.Router();

//Fetch all notifications
router.get("/", getNotification);

//Mark a specific notification as read 
router.patch("/:id/read",markNotificationAsRead);

module.exports = router;