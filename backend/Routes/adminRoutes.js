const express = require("express");
const {
  logout,
  getAdminById,
  createUser,
  verifyToken,
  login,
  getUsersForAdmin,
} = require("../Controllers/adminController");
const router = express.Router();

router.post("/adminusers", verifyToken, getUsersForAdmin);
router.get("/:adminId", getAdminById);
router.post("/login", login);
router.post("/logout", logout);
router.post("/createuser", verifyToken, createUser);

module.exports = router;
