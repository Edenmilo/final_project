const { Admin, Event } = require("../Models/adminModel");
const User=require('../Models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAdmin = async (req, res) => {
    try {
      const { username, password, phoneNumber } = req.body;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the admin with hashed password
      const admin = await Admin.create({
        username,
        password: hashedPassword,
        phoneNumber,
      });
  
      res.status(201).json(admin);
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find admin by username
        const admin = await Admin.findOne({ where: { username } });

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Generate token
        const token = jwt.sign(
            { _id: admin.id }, // You might want to use a different field for the admin's ID
            process.env.SECRET_JWT_KEY,
            { expiresIn: '48h' }
        );

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 48, // 48 hours
            sameSite: 'strict',
        });

        // Respond with admin details and success message
        return res.status(200).json({ admin:admin, message: 'Login successful' });
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

//FrontEnd:
// const response = axios(/login)
//resonse.response.admin 

const createUser = async (req, res) => {
  try {
    // const { adminId } = req.params;
    // const admin = await Admin.findByPk(adminId);
    const admin = req.admin;
    const { 
          username,
          fullName,
          email,
          password,
          phoneNumber,
          height,
          weight,
          age,
          goalWeight,
          bodyFat,
      } = req.body;

  
      
      if (!admin) {
          return res.status(404).json({ error: 'Admin not found' });
      }
      const user = await User.create({
          username,
          fullName,
          email,
          password,
          phoneNumber,
          height,
          weight,
          age,
          goalWeight,
          bodyFat,
          AdminId: admin.id 
      });

      res.status(201).json({ message: 'User created successfully', user });
      } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};


const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
      return res
          .status(401)
          .json({success:false,type:'error', message: "Unauthorized: No token provided" });
  }
  try {
      const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
      const admin = await Admin.findByPK(decodedToken._id);
      req.admin = admin;
      next();
  } catch (error) {
      return res.status(401).json({success:false,type:'error', message: "Unauthorized: Invalid token" });
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
        summary
      });
  
      res.status(201).json(event);
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const deleteEvent = async (req, res) => {
    try {
        const { adminId, eventId } = req.params;

        const admin = await Admin.findByPk(adminId);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const event = await admin.getEvents({
            where: { id: eventId }
        });

        if (!event || event.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        await event[0].destroy();

        res.status(204).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getEventById = async (req, res) => {
  try {
      const { adminId, eventId } = req.params;

      const admin = await Admin.findByPk(adminId);

      if (!admin) {
          return res.status(404).json({ message: 'Admin not found' });
      }

      const event = await admin.getEvents({
          where: { id: eventId }
      });

      if (!event || event.length === 0) {
          return res.status(404).json({ message: 'Event not found' });
      }

      res.status(200).json(event[0]);
  } catch (error) {
      console.error('Error getting event by ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

  const getUsersByAdminId = async (req, res) => {
    try {
      const { adminId } = req.params;
  
      const admin = await Admin.findByPk(adminId);
  
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      const users = await User.findAll({ where: { AdminId: adminId } });
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getAdminById = async (req, res) => {
    try {
      const { adminId } = req.params;
  
      const admin = await Admin.findByPk(adminId);
  
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      res.status(200).json(admin);
    } catch (error) {
      console.error('Error fetching admin:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getEventsByAdminId = async (req, res) => {
    try {
      const { adminId } = req.params;
  
      const admin = await Admin.findByPk(adminId);
  
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      const events = await admin.getEvents();
  
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  const getEventRegisteredUsers = async (req, res) => {
    try {
        const { eventId } = req.params;

        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const users = await User.findAll({
            include: [
                {
                    model: Event,
                    through: { where: { EventId: eventId } },
                    attributes: [] 
                }
            ]
        });
        const registeredUsers = users.map(user => user.username);

        res.status(200).json({ eventTitle: event.title, registeredUsers });
    } catch (error) {
        console.error('Error fetching event registered users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const lastWeight = user.weight && user.weight.length > 0 ? user.weight[user.weight.length - 1] : null;

    const userInfo = {
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      height: user.height,
      age: user.age,
      goalWeight: user.goalWeight,
      bodyFat: user.bodyFat,
      currentWeight: lastWeight,
      allWeights: user.weight
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { username, email, phoneNumber, height, age, goalWeight, bodyFat, menu } = req.body;
    let { weight } = req.body;

    if (weight) {
      const currentWeight = user.weight || [];
      weight = [...currentWeight, weight];
    }

    await user.update({
      username,
      email,
      phoneNumber,
      height,
      weight,
      age,
      goalWeight,
      bodyFat,
      menu
    });

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
      const { userId } = req.params;

      const user = await User.findByPk(userId);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();

      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};

  const logout = (req, res) => {

    res.json({ message: 'Logout successful' });
  };

module.exports = { 
  createAdmin,
  createEvent, 
  deleteEvent,
  getEventById,
  login,
  verifyToken,  
  createUser,
  getUsersByAdminId,
  getAdminById,
  getEventsByAdminId,
  logout,
  getEventRegisteredUsers,
  updateUser,
  deleteUser,
  getUserInfo  
};
