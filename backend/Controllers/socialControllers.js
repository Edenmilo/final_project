const Social = require('../Models/socialModel');

const createPost = async (req, res) => {
  try {
    const { workoutImg, workoutName, workoutType, exercises } = req.body;

    // Create the post
    const post = await Social.create({ 
      workoutImg, 
      workoutName, 
      workoutType, 
      exercises 
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createPost };
