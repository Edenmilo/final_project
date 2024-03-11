const express = require('express');
const { logout, getAdminById, createUser, verifyToken, login } = require('../Controllers/adminController');
const router = express.Router();




router.get('/:adminId', getAdminById)
router.post('/login', login);
router.post('/logout', logout);
router.post('/createuser', verifyToken, createUser);



module.exports = router;
