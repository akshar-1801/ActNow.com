const express = require("express");
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

const router = express.Router();

// Get all projects
router.get("/", getAllProjects);

// Get project by ID
router.get("/:id", getProjectById);

// Create a new project
router.post("/", createProject);

// Update a project
router.put("/:id", updateProject);

// Delete a project
router.delete("/:id", deleteProject);

module.exports = router;
