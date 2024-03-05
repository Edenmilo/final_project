const express = require('express');
const { createAdmin, createEvent, login,  createUser, logout} = require('../Controllers/adminController');
const router = express.Router();


router.post('/login', login);
router.post('/signup',  createUser);
router.post('/logout', logout);
router.post('/', createAdmin);
router.post('/:adminId/create',createEvent)

module.exports = router;
