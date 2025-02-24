import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectStatus } from "./types";
import { getProjects } from "./api";

interface ProjectsState {
  projects: Project[];
  searchKey: string;
  page: number;
  limit: number;
  status: ProjectStatus;
  isLoading: boolean;
  totalPages: number;
}

const initialState: ProjectsState = {
  projects: [],
  searchKey: "",
  limit: 5,
  page: 1,
  status: ProjectStatus.ALL,
  isLoading: false,
  totalPages: 0,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setSearchKey: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setStatus: (state, action: PayloadAction<ProjectStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload.projects;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(getProjects.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setPage, setSearchKey } = projectsSlice.actions;
export default projectsSlice.reducer;
