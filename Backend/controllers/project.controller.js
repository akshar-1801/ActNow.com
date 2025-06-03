const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: (req.params.id) },
    });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await prisma.project.create({
      data: { name, description },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await prisma.project.update({
      where: { id: (req.params.id) },
      data: { name, description },
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    await prisma.project.delete({
      where: { id: (req.params.id) },
    });
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
};
