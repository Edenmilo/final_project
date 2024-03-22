// Import required modules
const express = require('express');
const socialController = require('../Controllers/socialControllers');

// Create a router instance
const router = express.Router();

// Define the route for creating a post
// router.post('/post', createPost);
router.post('/create',socialController.createPost)
router.get('/all-socials',socialController.readPosts)
router.get('/:socialId',socialController.getPostById)
router.put('/update/:socialId',socialController.updatePost)
router.delete('/delete/:socialId',socialController.deletePost)
// Export the router
module.exports = router;
