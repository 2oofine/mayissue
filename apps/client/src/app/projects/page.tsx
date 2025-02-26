"use client";

import { ProjectStatus } from "@/constants/projects";
import { useProjects } from "@/hooks/projects/useProjects";
import _ from "lodash";
import React, { useCallback, useState } from "react";

const Projects = () => {
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1);
  const limit: number = 2;

  const { data, isLoading, isPending, isFetching, refetch } = useProjects({
    limit,
    page,
    search: searchKey,
    status: ProjectStatus.ALL,
  });
  const { projects, totalPages } = data || { projects: [], totalPages: 0 };

  // Debounce the search input to avoid frequent API calls
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    _.debounce((query: string) => {
      setSearchKey(query);
    }, 500), // 500ms debounce time
    []
  );

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
    setPage(1);
  };

  if (isLoading || isPending) return <div>Loading....</div>;

  return (
    <div>
      {/* Refresh Button */}
      <button onClick={() => refetch()} disabled={isFetching} className="p-2 bg-blue-500 text-white rounded-md mb-4">
        {isFetching ? "Refreshing..." : "Refresh Data"}
      </button>
      <input type="text" placeholder="Search projects..." onChange={handleSearch} className="border p-2 rounded-md" />

      <ul className={isFetching ? "opacity-50" : ""}>
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
