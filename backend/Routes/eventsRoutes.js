const express = require('express');
const router = express.Router();
const {createEvent, deleteEvent, getEventsForAdmin, fillEventWithUser, getUsersInEvent} = require('../Controllers/eventsControllers');

router.post('/create',createEvent);
router.get('/:adminId',getEventsForAdmin);
router.post('/newmatch',fillEventWithUser);
router.get('/usersfor/:eventId',getUsersInEvent);
router.delete('/delete/:eventId',deleteEvent);

module.exports = router;

