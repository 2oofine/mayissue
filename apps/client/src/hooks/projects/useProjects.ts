import { NEXT_PUBLIC_API_BASE_URL } from "@/constants";
import { GetProjectsParams, GetProjectsResponse } from "./interface";
import axios from "axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const fetchProjects = async (params: GetProjectsParams) => {
  const { data } = await axios.get<GetProjectsResponse>(`${NEXT_PUBLIC_API_BASE_URL}/api/projects`, { params });
  return data;
};

export const useProjects = (params: GetProjectsParams) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => fetchProjects(params),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};
