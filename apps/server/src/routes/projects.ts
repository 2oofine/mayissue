import { Router } from "express";
import {
  createProject,
  getProject,
  getProjects,
  updateProject,
  updateProjectStatus,
  deleteProject,
} from "../controllers/projects";

const projectsRoutes: Router = Router();

projectsRoutes.get("/", getProjects);
projectsRoutes.get("/:id", getProject);
projectsRoutes.post("/", createProject);
projectsRoutes.put("/:id", updateProject);
projectsRoutes.patch("/:id/status", updateProjectStatus);
projectsRoutes.delete("/:id", deleteProject);

export default projectsRoutes;
