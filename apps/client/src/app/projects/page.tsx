"use client";

import { getProjects } from "@/lib/features/projects/api";
import { ProjectStatus } from "@/lib/features/projects/types";
import { AppDispatch, RootState } from "@/lib/store";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

const Projects = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, isLoading, totalPages } = useSelector((state: RootState) => state.projects);

  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  // const [limit, setLimit] = useState(5);
  // const [status, setStatus] = useState<ProjectStatus>(ProjectStatus.ALL);

  useEffect(() => {
    dispatch(getProjects({ limit: 2, page: page, searchKey: searchKey, status: ProjectStatus.ALL }));
  }, [dispatch, page]);

  const debouncedSearch = useCallback(
    _.debounce((query: string) => {
      dispatch(getProjects({ limit: 2, page: 1, searchKey: query, status: ProjectStatus.ALL }));
    }, 500), // 500ms delay
    [dispatch]
  );
  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);
    setPage(1);
    debouncedSearch(e.target.value); // Call the debounced search
  };

  if (isLoading) return <div>Loading....</div>;

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search projects..."
        value={searchKey}
        onChange={handleSearch}
        className="border p-2 rounded-md"
      />

      <ul>
        {projects &&
          projects.map((proj) => {
            return <li key={proj.id}>{proj.name}</li>;
          })}
      </ul>

      {/* Pagination Controls */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="p-2 border rounded-md"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page >= totalPages}
          className="p-2 border rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Projects;
