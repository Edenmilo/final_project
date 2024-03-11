const { Admin, Event, EventUser } = require("../Models/adminModel");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (req, res) => {
  try {
    const { username, password, phoneNumber } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      username,
      password: hashedPassword,
      phoneNumber,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let person;
    let admin;
    let user;
    person = await User.findOne({ where: { username } });

    if (person) {
      user = person;
    }
    if (!person) {
      person = await Admin.findOne({ where: { username } });
      admin = person;

    }

    if (
      !admin &&
      user) {
      const isUserPasswordValid = await bcrypt.compare(password, user.password);
      if (!isUserPasswordValid) {
        return res.status(401).json({ error: "Incorrect password" });
      }
      const token = jwt.sign({ _id: user.id }, process.env.SECRET_JWT_KEY, {
        expiresIn: "48h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 48,
        sameSite: "strict",
      });

      return res.status(200).json({ user: user, message: "Login successful" });
    }

    if (admin && !user) {
      const isAdminPasswordValid = await bcrypt.compare(
        password,
        admin.password
      );
      if (!isAdminPasswordValid) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      const token = jwt.sign({ _id: admin.id }, process.env.SECRET_JWT_KEY, {
        expiresIn: "48h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 48,
        sameSite: "strict",
      });

      return res
        .status(200)
        .json({ admin: admin, message: "Login successful" });
    }

    if (
      !admin &&
      !user) {
      return res.status(404).json({ error: "you arfe not exist" });
    }
  } catch (error) {
    console.error("Error during  login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      type: "error",
      message: "Unauthorized: No token provided",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const admin = await Admin.findByPK(decodedToken._id);
    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      type: "error",
      message: "Unauthorized: Invalid token",
    });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
