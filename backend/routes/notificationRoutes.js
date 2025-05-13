const router = require("express").Router();
const {
  createNotification,
  getNotifications,
  markAsRead,
  countUnreadNotifications,
} = require('../controllers/NotificationController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Route to create a notification - accessible by all roles
router.post('/notifications/create', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), createNotification);

// Route to get all notifications for a user - accessible by all roles
router.get('/notifications/:userId', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), getNotifications);

// Route to mark a notification as read - accessible by all roles
router.patch('/notifications/:id/mark-read', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), markAsRead);

// Route to count unread notifications for a user - accessible by all roles
router.get('/notifications/:userId/unread-count', protect, authorize('Admin', 'MsStaff', 'SalesTeam'), countUnreadNotifications);

module.exports = router;