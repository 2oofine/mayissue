export type Project = {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
};

export enum ProjectStatus {
  ALL = "",
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  COMPLETED = "COMPLETED",
  DELETED = "DELETED",
}
