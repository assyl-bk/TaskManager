const express = require('express');
const { adminOnly, protect } = require('../middlewares/authMiddleware');
const { exportTasksReport, exportUsersReport } = require('../controllers/reportController');
const router = express.Router();
router.get('/exports/tasks', protect, adminOnly, exportTasksReport); // Export tasks report as Excel/pdf(Admin only)
router.get('/exports/users', protect, adminOnly, exportUsersReport); // Export users report as Excel/pdf(Admin only)

module.exports = router;