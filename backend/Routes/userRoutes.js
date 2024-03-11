const express = require('express');
const router = express.Router();
const {getUsersForAdmin, getUserInfo, updateUser, deleteUser} = require('../Controllers/userControllers');


router.post('/adminusers', getUsersForAdmin);
router.get('/info/:userId', getUserInfo);
router.post('/update', updateUser);
router.delete('/delete', deleteUser);

module.exports = router;
