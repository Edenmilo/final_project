const express = require('express');
const { createAdmin, createEvent } = require('../Controllers/adminController');
const router = express.Router();

router.post('/', createAdmin);
router.post('/:adminId/create',createEvent)

module.exports = router;
