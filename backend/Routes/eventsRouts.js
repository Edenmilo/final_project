const express = require('express');
const router = express.Router();
const {createEvent, deleteEvent, getEventsForAdmin, fillEventWithUser, getUsersInEvent} = require('../Controllers/eventsControllers');

router.post('/create',createEvent);
router.delete('/delete/:eventId',deleteEvent);
router.get('/:adminId',getEventsForAdmin);
router.post('/newmatch',fillEventWithUser);
router.get('/usersfor/:eventId',getUsersInEvent);


