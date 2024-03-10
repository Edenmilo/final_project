const { Admin, Event, EventUser } = require("../Models/adminModel");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
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
      adminId,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      height,
      weight,
      age,
      goalWeight,
      bodyFat,
      adminId,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUsersForAdmin = async (req, res) => {
  try {
    const { adminId } = req.body;

    const users = await User.findAll({ where: { AdminId: adminId } });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const lastWeight =
      user.weight && user.weight.length > 0
        ? user.weight[user.weight.length - 1]
        : null;

    const userInfo = {
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      height: user.height,
      age: user.age,
      goalWeight: user.goalWeight,
      bodyFat: user.bodyFat,
      currentWeight: lastWeight,
      allWeights: user.weight,
      menu: user.menu,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      weight,
      username,
      email,
      phoneNumber,
      height,
      age,
      goalWeight,
      bodyFat,
      menu,
    } = req.body;

    let updatedWeights = user.weight || [];

    if (weight !== undefined) {
      updatedWeights.push(weight);

      if (updatedWeights.length > 4) {
        updatedWeights = updatedWeights.slice(updatedWeights.length - 4);
      }
    }

    await user.update({
      username,
      email,
      phoneNumber,
      height,
      weight: updatedWeights,
      age,
      goalWeight,
      bodyFat,
      menu,
    });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    await EventUser.destroy({ where: { UserId: userId } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
