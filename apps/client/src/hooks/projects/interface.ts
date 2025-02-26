import { ProjectStatus } from "@/constants/projects";

export type Project = {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
};

export interface GetProjectsParams {
  search: string;
  page: number;
  limit: number;
  status: ProjectStatus;
}

export interface GetProjectsResponse {
  projects: Project[];
  totalPages: number;
}
