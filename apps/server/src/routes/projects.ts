import { Router } from "express";
import { createProject, getProject, getProjects } from "../controllers/projects";

const projectsRoutes: Router = Router();

projectsRoutes.get("/", getProjects);
projectsRoutes.get("/:id", getProject);
projectsRoutes.post("/", createProject);

export default projectsRoutes;
