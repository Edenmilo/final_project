// Import required modules
const express = require("express");
const socialController = require("../Controllers/socialControllers");

// Create a router instance
const router = express.Router();

// Define the route for creating a post
<<<<<<< HEAD
// router.post('/post', createPost);
router.post('/create',socialController.createPost)
router.get('/all-socials',socialController.readPosts)
router.get('/:socialId',socialController.getPostById)
router.put('/update/:socialId',socialController.updatePost)
router.delete('/delete/:socialId',socialController.deletePost)
=======
router.post("/post", socialController.createPost);
router.get("/all-socials", socialController.readPosts);
router.get("/:socialId", socialController.getPostById);
router.put("/update/:socialId", socialController.updatePost);
router.delete("/delete/:socialId", socialController.deletePost);
>>>>>>> e3ad4af5efed39314a1d0f35145440090369528e
// Export the router
module.exports = router;
