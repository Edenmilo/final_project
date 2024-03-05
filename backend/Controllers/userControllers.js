// controllers/userController.js
const User = require('../Models/userModel');

const createUser = async (req, res) => {
  try {
    // Extract user data from request body
    const { username, email, password, phoneNumber, height, weight, age, goalWeight, bodyFat, menu } = req.body;

    // Create a new user record in the database
    const user = await User.create({
      username,
      email,
      password,
      phoneNumber,
      height,
      weight,
      age,
      goalWeight,
      bodyFat,
      menu
    });

    // Respond with the created user object
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { createUser };
