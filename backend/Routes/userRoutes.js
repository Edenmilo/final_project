const express = require('express');
const router = express.Router();
const {createUser, getUsersForAdmin, getUserInfo, updateUser, deleteUser} = require('../Controllers/userControllers')



router.post('/create', createUser);
router.post('/adminusers', getUsersForAdmin);
router.post('/info', getUserInfo);
router.post('/update', updateUser);
router.delete('/delete', deleteUser);

module.exports = router;
