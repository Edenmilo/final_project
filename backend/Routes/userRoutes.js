const express = require('express');
const router = express.Router();
const {getUsersForAdmin, getUserInfo, updateUser, deleteUser} = require('../Controllers/userControllers');


router.get('/info/:userId', getUserInfo);
router.post('/info/:userId/update', updateUser);
router.delete('/info/:userId/delete', deleteUser);

module.exports = router;
