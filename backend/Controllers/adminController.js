const { Admin } = require("../Models/adminModel");
const User=require('../Models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const createAdmin = async (req, res) => {
  try {
    const { username, password, phoneNumber,} = req.body;

    // Create the admin
    const admin = await Admin.create({
      username,
      password,
      phoneNumber,
    });

    res.status(201).json(admin);
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createEvent = async (req, res) => {
    try {
      const { adminId } = req.params;
      const { title, startTime, finishTime, studentsLimit,registeredUsers, summary } = req.body;
  
      const admin = await Admin.findByPk(adminId);
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      const event = await admin.createEvent({
        title,
        startTime,
        finishTime,
        studentsLimit,
        registeredUsers,
        summary
      });
  
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const generateToken = (admin) => {
    return jwt.sign({ id: admin.id, username: admin.username }, 'your_secret_key', { expiresIn: '24h' });
  };
  
  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the user is an admin
      let user = await Admin.findOne({ where: { username } });
      
      // If not an admin, check if the user is a regular user
      if (!user) {
        user = await User.findOne({ where: { username } });
      }
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate token
      const token = generateToken(user);
  
      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const createUser = async (req, res) => {
    try {
      const { 
        username,
        email,
        password,
        phoneNumber,
        height,
        weight,
        age,
        goalWeight,
        bodyFat
      } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const user = await User.create({ 
        username,
        email, 
        password: hashedPassword, 
        phoneNumber,
        height,
        weight,
        age,
        goalWeight,
        bodyFat
      });
  
      const token = generateToken(user);
  
      res.status(201).json({ token });
    } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const logout = (req, res) => {
    // You may implement logout logic here (e.g., token invalidation)
    res.json({ message: 'Logout successful' });
  };

module.exports = { createAdmin, createEvent, login,  createUser, logout  };
