const Task = require('../models/Task');
const User = require('../models/User');
const excelJS = require('exceljs');

//@desc: Export tasks report as Excel file (Admin only)
//@route: GET /api/reports/exports/tasks
//@access: Private (Admin only)
const exportTasksReport = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email');

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet('Tasks Report');

        // Define columns
        worksheet.columns = [
            { header: 'Task ID', key: '_id', width: 25 },
            { header: 'Title', key: 'title', width: 30 },
            { header: 'Description', key: 'description', width: 50 },
            { header: 'Priority', key: 'priority', width: 15 },
            { header: 'Status', key: 'status', width: 20 },
            { header: 'Due Date', key: 'dueDate', width: 20 },
            { header: 'Assigned To', key: 'assignedTo', width: 30 },
        ];

        // Add rows
        tasks.forEach(task => {
            const assignedTo = task.assignedTo
                ? `${task.assignedTo.name} (${task.assignedTo.email})`
                : 'Unassigned';

            worksheet.addRow({
                _id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
                assignedTo,
            });

        });

        // Set response headers for Excel file download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=tasks_report.xlsx');

        return workbook.xlsx.write(res).then(() => {
            res.end();
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error while exporting tasks report', error: error.message });
    }
};

//@desc: Export users report as Excel file(Admin only)
//@route: GET /api/reports/exports/users
//@access: Private (Admin only)
const exportUsersReport = async (req, res) => {
    try {
        const users = await User.find().select('name email _id').lean();
        const userTasks = await Task.find().populate('assignedTo', 'name email _id');
        const userTaskMap = {};
        users.forEach(user => {
            userTaskMap[user._id] = {
                name: user.name,
                email: user.email,
                taskCount: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,
            };
        });
        userTasks.forEach((task) => {
            if (task.assignedTo && userTaskMap[task.assignedTo._id]) {
                userTaskMap[task.assignedTo._id].taskCount += 1;

                if (task.status === 'Pending') {
                    userTaskMap[task.assignedTo._id].pendingTasks += 1;
                } else if (task.status === 'In Progress') {
                    userTaskMap[task.assignedTo._id].inProgressTasks += 1;
                } else if (task.status === 'Completed') {
                    userTaskMap[task.assignedTo._id].completedTasks += 1;
                }
            }

        });
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet('User Task Report');

        // Define columns
        worksheet.columns = [
            { header: 'User Name', key: 'name', width: 30 },
            { header: 'Email', key: 'email', width: 40 },
            { header: 'Total Assigned Tasks', key: 'taskCount', width: 20 },
            { header: 'Pending Tasks', key: 'pendingTasks', width: 20 },
            { header: 'In Progress Tasks', key: 'inProgressTasks', width: 20 },
            { header: 'Completed Tasks', key: 'completedTasks', width: 20 },
        ];
        Object.values(userTaskMap).forEach((user) => {
            worksheet.addRow(user);
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=users_report.xlsx');
        return workbook.xlsx.write(res).then(() => {
            res.end();
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error while exporting users report', error: error.message });
    }
};

module.exports = { exportTasksReport, exportUsersReport };