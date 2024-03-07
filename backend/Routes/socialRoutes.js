// Import required modules
const express = require('express');
const { createPost } = require('../Controllers/socialControllers');

// Create a router instance
const router = express.Router();

// Define the route for creating a post
router.post('/post', createPost);

// Export the router
module.exports = router;
