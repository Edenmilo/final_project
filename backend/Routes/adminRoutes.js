const express = require('express');
const { createAdmin, createEvent, login,  createUser, logout, getUsersByAdminId, getAdminById, getEventsByAdminId, getEventRegisteredUsers, updateUser, deleteUser, getUserInfo, deleteEvent} = require('../Controllers/adminController');
const router = express.Router();


router.post('/login', login);
router.post('/:adminId/createuser',  createUser);
router.post('/logout', logout);
router.post('/', createAdmin);
router.post('/:adminId/create',createEvent)
router.delete('/:adminId/:eventId/deleteevent', deleteEvent)
router.get('/:adminId/getusers', getUsersByAdminId)
router.get('/:adminId/:userId/getuser', getUserInfo)
router.get('/:adminId/getinfo', getAdminById)
router.get('/:adminId/getevents', getEventsByAdminId)
router.get('/:adminId/:eventId/geteventusers', getEventRegisteredUsers)
router.put('/:adminId/:userId/updateuser', updateUser)
router.delete('/:adminId/deleteuser', deleteUser)



module.exports = router;
