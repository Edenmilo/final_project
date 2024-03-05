// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser } = require('../Controllers/userControllers');

// Define route to create a new user
router.post('/users', createUser);

module.exports = router;
