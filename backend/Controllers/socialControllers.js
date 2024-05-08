const Social = require("../Models/socialModel");

exports.createPost = async (req, res) => {
  try {
    const { workoutImg, workoutName, workoutType, exercises, createdBy } =
      req.body;

    const post = await Social.create({
      workoutImg,
      workoutName,
      workoutType,
      exercises,
      createdBy,
    });
    res.status(201).json({ post });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.socialId;
    const post = await Social.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("Retrieved post:", post);
    res.status(200).json(post);
  } catch (error) {
    console.error("Error retrieving post by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.readPosts = async (req, res) => {
  try {
    const posts = await Social.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error reading posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.socialId;
    const { workoutImg, workoutName, workoutType, exercises } = req.body;

    let post = await Social.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post = await post.update({
      workoutImg,
      workoutName,
      workoutType,
      exercises,
    });

    res.status(200).json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.socialId;

    const post = await Social.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
