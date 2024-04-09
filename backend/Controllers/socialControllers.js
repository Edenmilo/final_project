const Social = require('../Models/socialModel');

exports.createPost = async (req, res) => {
  try {
    const { workoutImg, workoutName, workoutType, exercises, createdBy } = req.body; // Assuming req.user contains the logged-in admin's information
    // Create the post
    
    const post = await Social.create({ 
      workoutImg, 
      workoutName, 
      workoutType, 
      exercises,
      createdBy // Set createdBy field with the admin's ID
    });

    // Parse exercises JSON
    const exercisesJSON = post.exercises;
    const parsedExercises = JSON.parse(exercisesJSON);

    // Iterate over each exercise object and log its details
    parsedExercises.forEach((exercise, index) => {
      console.log(`Exercise ${index + 1}:`);
      // Access the keys of each exercise object and log them
      Object.keys(exercise).forEach((key) => {
        console.log(`${key}: ${exercise[key]}`);
      });
      console.log(); // Add an empty line for clarity
    });

    // Return both post and exercises in the response
    res.status(201).json({ post, exercises: parsedExercises });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

  exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.socialId;
        // Find the post by ID
        const post = await Social.findByPk(postId);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        console.log('Retrieved post:', post); // Add this line for logging

        res.status(200).json(post);
    } catch (error) {
        console.error('Error retrieving post by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



 exports.readPosts = async (req, res) => {
    try {
      // Retrieve all posts
      const posts = await Social.findAll();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error reading posts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updatePost = async (req, res) => {
    try {
      const postId = req.params.socialId;
      const { workoutImg, workoutName, workoutType, exercises } = req.body;
  
      // Find the post by ID
      let post = await Social.findByPk(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Update the post
      post = await post.update({ 
        workoutImg, 
        workoutName, 
        workoutType, 
        exercises 
      });
  
      res.status(200).json(post);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deletePost = async (req, res) => {
    try {
      const postId = req.params.socialId;
  
      // Find the post by ID
      const post = await Social.findByPk(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Delete the post
      await post.destroy();
  
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};



