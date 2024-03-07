const express = require('express');
const { createAdmin, createEvent, login,  createUser, logout, getUsersByAdminId, getAdminById, getEventsByAdminId, getEventRegisteredUsers, updateUser, deleteUser, getUserInfo, deleteEvent, getEventById} = require('../Controllers/adminController');
const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);

router.post('/', createAdmin);
router.get('/:adminId/getinfo', getAdminById)//dont need

router.post('/:adminId/createuser',  createUser);// user route
router.put('/:adminId/:userId/updateuser', updateUser)
router.delete('/:adminId/deleteuser', deleteUser)
router.get('/:adminId/getusers', getUsersByAdminId)
router.get('/:adminId/:userId/getuser', getUserInfo)

router.post('/:adminId/create',createEvent)
router.delete('/:adminId/:eventId/deleteevent', deleteEvent)
router.get('/:adminId/getevents', getEventsByAdminId)
router.get('/:adminId/:eventId/getevent', getEventById)

router.get('/:adminId/:eventId/geteventusers', getEventRegisteredUsers)



module.exports = router;
