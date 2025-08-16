const express = require('express');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require('../controllers/taskController');
const router = express.Router();

// task management routes
router.get('/dashboard-data', protect, getDashboardData);
router.get('/user-dashboard-data', protect, getUserDashboardData);
router.get('/', protect, getTasks); // Get all tasks( Admin: all, User: assigned tasks)
router.get('/:id', protect, getTaskById); // Get task by ID
router.post('/', protect, adminOnly, createTask); // Create a new task (Admin only)
router.put('/:id', protect, updateTask); // Update task by ID
router.delete('/:id', protect, adminOnly, deleteTask); // Delete task by ID (admin only)
router.put('/:id/status', protect, updateTaskStatus); // Update task status (Admin and User)
router.put('/:id/todo', protect, updateTaskChecklist); // Update task checklist (Admin and User)

module.exports = router;



