/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from "axios";
import { Project, ProjectStatus } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GetProjectsParams {
  searchKey: string;
  page: number;
  limit: number;
  status: ProjectStatus;
}

interface GetProjectsResponse {
  projects: Project[];
  totalPages: number;
}

export const getProjects = createAsyncThunk<GetProjectsResponse, GetProjectsParams, { rejectValue: string }>(
  "projects/getProjects",
  async ({ limit, page, searchKey, status }, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/projects`, {
        params: { limit, page, search: searchKey, status: status !== ProjectStatus.ALL ? status : undefined },
      });
      const data: GetProjectsResponse = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch projects");
    }
  }
);
