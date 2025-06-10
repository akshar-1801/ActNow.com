// use api.ts in this file create request functions for projects endpoint only which will be used in components

// src/api/project.ts
import api from "./api";

export const getAllProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

export const getProjectById = async (id: string) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

export const createProject = async (formData: FormData) => {
  const res = await api.post("/projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProject = async (id: string, formData: FormData) => {
  const res = await api.put(`/projects/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteProject = async (id: string) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};
