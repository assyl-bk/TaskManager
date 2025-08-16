export const BASE_URL = "http://localhost:8000";

//utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", // Register a new user(Admin or Member)
        LOGIN: "api/auth/login", //Authenticate user & return JWT token 
        GET_PROFILE: "/api/auth/profile", //Get logged-in user details
    },

    USERS: {
        GET_ALL_USERS: "/api/users", //Get all users (Admin Only)
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`, //Get user by ID
        CREATE_USER: "/api/users", //create a new user(admin only)
        UPDATE_USER: (userId) => `api/users/${userId}`, //update user details
        DELETE_USER: (userId) => `api/users/${userId}`, //Delete a user 
    },

    TASKS: {
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data", //Get Dashboard Data
        GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data", //Get User Dashboard data
        GET_ALL_TASKS: "/api/tasks", //Get all tasks (admin:all, users:only assigned to tasks)
        GET_TASK_BY_ID: (taskId) => `api/tasks/${taskId}`, //get task by id
        CREATE_TASK: "/api/tasks", //create a new task(admin only)
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, //update task details
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, //delete a task(admin only)

        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, //update task status
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`, //update todo checklist

    },

    REPORTS: {
        EXPORT_TASKS: "/api/reports/export/tasks", //download all tasks as an excel/pdf report
        EXPORT_USERS: "/api/reports/export/users", //download user-task report
    },

    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image",
    },

};