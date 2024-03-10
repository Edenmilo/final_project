const express = require('express');
const { createAdmin, login,  logout, getAdminById} = require('../Controllers/adminController');
const router = express.Router();

router.get('/:adminId', getAdminById)
router.post('/logout', logout);


module.exports = router;
