const express = require("express");
const socialController = require("../Controllers/socialControllers");

const router = express.Router();

router.post("/post", socialController.createPost);
router.get("/all-socials", socialController.readPosts);
router.get("/:socialId", socialController.getPostById);
router.put("/update/:socialId", socialController.updatePost);
router.delete("/delete/:socialId", socialController.deletePost);

module.exports = router;
