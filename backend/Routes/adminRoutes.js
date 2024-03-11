const express = require('express');
const { logout, getAdminById, createUser, verifyToken, login } = require('../Controllers/adminController');
const router = express.Router();



router.post('/create', verifyToken, createUser);

router.get('/:adminId', getAdminById)
router.post('/login', login);
router.post('/logout', logout);



module.exports = router;
