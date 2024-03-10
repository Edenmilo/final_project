const express = require('express');
const router = express.Router();
const {createUser, getUsersForAdmin, getUserById, getUserInfo, updateUser, deleteUser} = require('../Controllers/userControllers')



router.post('/create', createUser);
router.get('/:adminId', getUsersForAdmin);
router.get('/:userId', getUserById);
router.get('/info/:userId', getUserInfo);
router.post('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);

