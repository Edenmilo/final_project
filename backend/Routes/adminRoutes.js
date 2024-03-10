const express = require('express');
const { createAdmin, createEvent, login,  createUser, logout, getUsersByAdminId, getAdminById, getEventsByAdminId, getEventRegisteredUsers, updateUser, deleteUser, getUserInfo, deleteEvent, getEventById} = require('../Controllers/adminController');
const router = express.Router();

router.post('/login', login);
router.post('/create', createAdmin);
router.get('/:adminId', getAdminById)
router.post('/logout', logout);


module.exports = router;
