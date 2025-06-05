const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");


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

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image file is required" });
    }

    const multimediaData = [];
    const uploadedPublicIds = [];

    for (const file of req.files) {
      try {
        const result = await cloudinary.uploader.upload(file.path);

        uploadedPublicIds.push(result.public_id);
        // console.log(uploadedPublicIds);

        multimediaData.push({
          url: result.secure_url,
          publicId: result.public_id,
          type: result.resource_type,
        });

        fs.unlinkSync(file.path);
      } catch (uploadError) {
        if (fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path);
          } catch (_) { }
        }

        for (const publicId of uploadedPublicIds) {
          // console.log(publicId)
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (_) { }
        }

        return res.status(500).json({
          error: "One or more image uploads failed",
          detail: uploadError.message,
        });
      }
    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        multimedia: {
          create: multimediaData,
        },
      },
      include: {
        multimedia: true,
      },
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file) => {
        try {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        } catch (_) { }
      });
    }

    res.status(500).json({ error: "Upload and creation failed", detail: error.message });
  }
};




// Update a project
exports.updateProject = async (req, res) => {
  const projectId = req.params.id;
  let { name, description, publicIdsToDelete } = req.body;

  if (typeof publicIdsToDelete === 'string') {
    try {
      publicIdsToDelete = JSON.parse(publicIdsToDelete);
    } catch {
      publicIdsToDelete = [];
    }
  }

  const newMultimediaData = [];
  const uploadedPublicIds = [];

  try {
    for (const publicId of publicIdsToDelete || []) {
      try {
        await cloudinary.uploader.destroy(publicId);
        await prisma.multimedia.deleteMany({
          where: { publicId, projectId },
        });
      } catch (_) {
      }
    }

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path);
          uploadedPublicIds.push(result.public_id);

          newMultimediaData.push({
            url: result.secure_url,
            publicId: result.public_id,
            type: result.resource_type,
            projectId,
          });

          fs.unlinkSync(file.path); // Delete local temp file
        } catch (uploadErr) {
          if (fs.existsSync(file.path)) {
            try {
              fs.unlinkSync(file.path);
            } catch (_) {}
          }

          for (const id of uploadedPublicIds) {
            try {
              await cloudinary.uploader.destroy(id);
            } catch (_) {}
          }

          return res.status(500).json({
            error: "Image upload failed",
            detail: uploadErr.message,
          });
        }
      }

      await prisma.multimedia.createMany({ data: newMultimediaData });
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { name, description },
      include: { multimedia: true },
    });

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });

  } catch (error) {
    // General fallback cleanup
    if (req.files) {
      for (const file of req.files) {
        try {
          if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        } catch (_) {}
      }
    }

    res.status(500).json({
      error: "Failed to update project",
      detail: error.message,
    });
  }
};


// Delete a project
exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { multimedia: true },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    for (const media of project.multimedia) {
      try {
        await cloudinary.uploader.destroy(media.publicId);
      } catch (_) {
      }
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    res.json({ message: "Project and associated files deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project", detail: error.message });
  }
};
