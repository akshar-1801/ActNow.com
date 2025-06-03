const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Create a new user
router.post("/", createUser);

// Update a user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

module.exports = router;
