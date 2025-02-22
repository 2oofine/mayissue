import { Response, Request } from "express";
import { ErrorResponse } from "../utils/error";
import { PrismaClient, ProjectStatus } from "@prisma/client";

const prisma = new PrismaClient();

type ProjectRequestParams = {
  id: string;
};
type ProjectsRequestsQuery = {
  status?: ProjectStatus;
  search?: string;
  page?: string;
  limit?: string;
};
interface ProjectRequestBody {
  name: string;
  description: string;
}

interface ProjectResponse {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

/***** API */
// get all projects
export const getProjects = async (
  req: Request<{}, {}, {}, ProjectsRequestsQuery>,
  res: Response<ProjectResponse[] | ErrorResponse>
) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;
    const projects: ProjectResponse[] = await prisma.project.findMany({
      where: {
        AND: [
          { status: status ? status : { not: "DELETED" } },
          search
            ? {
                OR: [{ name: { contains: search, mode: "insensitive" } }],
              }
            : {},
        ],
      },
      take: Number(limit),
      skip: (Number(page) - 1) * Number(limit),
    });

    res.status(200).json(projects);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

    res.status(500).json({
      message: errorMessage,
      statusCode: 500,
    });
  }
};

// get project by id
export const getProject = async (
  req: Request<ProjectRequestParams>,
  res: Response<ProjectResponse | ErrorResponse>
) => {
  const { id } = req.params;
  try {
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "Project ID is required", statusCode: 400 });
      return;
    }

    const project: ProjectResponse | null = await prisma.project.findUnique({ where: { id: Number(id) } });
    if (!project) {
      res.status(404).json({ message: "Project not found", statusCode: 404 });
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

    res.status(500).json({
      message: errorMessage,
      statusCode: 500,
    });
  }
};

// create project
export const createProject = async (
  req: Request<{}, {}, ProjectRequestBody>,
  res: Response<ProjectResponse | ErrorResponse>
) => {
  try {
    const { name, description } = req.body;

    // check if name and description are provided
    if (!name || !description) {
      const missingFields = [];

      if (!name) missingFields.push("Name");
      if (!description) missingFields.push("Description");

      res.status(400).json({
        message: `${missingFields.join(" and ")} ${missingFields.length > 1 ? "are" : "is"} required`,
        statusCode: 400,
      });
      return;
    }

    //insert to db
    const project: ProjectResponse = await prisma.project.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).send(project);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

    res.status(500).json({
      message: errorMessage,
      statusCode: 500,
    });
  }
};

// update project
export const updateProject = async (
  req: Request<ProjectRequestParams, {}, ProjectRequestBody>,
  res: Response<ProjectResponse | ErrorResponse>
) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "Project ID is required", statusCode: 400 });
      return;
    }

    if (!name || !description) {
      const missingFields = [];

      if (!name) missingFields.push("Name");
      if (!description) missingFields.push("Description");

      res.status(400).json({
        message: `${missingFields.join(" and ")} ${missingFields.length > 1 ? "are" : "is"} required`,
        statusCode: 400,
      });
      return;
    }

    const project: ProjectResponse = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
      },
    });

    res.status(200).json(project);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

    res.status(500).json({
      message: errorMessage,
      statusCode: 500,
    });
  }
};

// update project status
export const updateProjectStatus = async (
  req: Request<ProjectRequestParams, {}, { status: ProjectStatus }>,
  res: Response<ProjectResponse | ErrorResponse>
) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "Project ID is required", statusCode: 400 });
      return;
    }

    if (!status) {
      res.status(400).json({ message: "Status is required", statusCode: 400 });
      return;
    }

    const project: ProjectResponse = await prisma.project.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.status(200).json(project);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

    res.status(500).json({
      message: errorMessage,
      statusCode: 500,
    });
  }
};

// delete project
export const deleteProject = async (
  req: Request<ProjectRequestParams>,
  res: Response<ProjectResponse | ErrorResponse>
) => {
  const { id } = req.params;

  try {
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "Project ID is required", statusCode: 400 });
      return;
    }

    const project: ProjectResponse = await prisma.project.update({
      where: { id: Number(id) },
      data: { status: "DELETED" },
    });

    res.status(200).json(project);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

    res.status(500).json({
      message: errorMessage,
      statusCode: 500,
    });
  }
};
