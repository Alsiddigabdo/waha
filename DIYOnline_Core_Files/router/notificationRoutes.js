const express = require("express");
const multer = require("multer");
const NotificationController = require("../controllers/NotificationController");
const ChatController = require("../controllers/chatController"); // لاستخدام markAllAsRead
const { createCloudinaryStorage } = require("../config/cloudinaryConfig");
const router = express.Router();

// إنشاء تخزين Cloudinary للإشعارات
const storage = createCloudinaryStorage("notifications");
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // حد أقصى 5 ميجابايت
  }
});

// عرض صفحة الإشعارات
router.get("/notifications", NotificationController.showNotifications);

// تحديث حالة الإشعار إلى "تم العرض"
router.post("/notifications/:id/markAsViewed", NotificationController.markAsViewed);

// حذف إشعار معين
router.post("/notifications/delete/:id", NotificationController.deleteNotification);

// حذف جميع الإشعارات
router.post("/notifications/delete-all", NotificationController.deleteAllNotifications);

// عرض صفحة إرسال إشعار من المسؤول
router.get("/admin/notify", NotificationController.showAdminNotifyPage);

// إرسال إشعار من المسؤول
router.post("/admin/notifications", upload.single("image"), NotificationController.sendAdminNotification);

// تحديد جميع الإشعارات كمقروءة
router.post("/notifications/mark-all-as-read", NotificationController.markAllNotificationsAsRead);

// تحديد جميع الرسائل كمقروءة (من ChatController)
router.post("/chat/mark-all-as-read", ChatController.markAllAsRead);

module.exports = router;

