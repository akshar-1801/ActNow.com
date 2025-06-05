const express = require("express");
const upload = require("../middleware/multer");
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
router.post("/",  upload.array('images',10),createProject);

// Update a project
router.put("/:id",upload.array('images',10),updateProject);

// Delete a project
router.delete("/:id", deleteProject); 

module.exports = router;
