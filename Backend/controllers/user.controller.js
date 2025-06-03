const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req.params.id) },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.update({
      where: { id: (req.params.id) },
      data: { email, name },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: (req.params.id) },
    });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
