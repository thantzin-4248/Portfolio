import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "portfolio-added-projects";

export function useProjects() {
  const [addedProjects, setAddedProjects] = useLocalStorage(
    STORAGE_KEY,
    [],
  );

  const addProject = useCallback((project) => {
    setAddedProjects((currentProjects) => [
      ...(Array.isArray(currentProjects) ? currentProjects : []),
      project,
    ]);
  }, [setAddedProjects]);

  const removeProject = useCallback((projectId) => {
    setAddedProjects((currentProjects) =>
      (Array.isArray(currentProjects) ? currentProjects : []).filter(
        (project) => String(project.id) !== String(projectId),
      ),
    );
  }, [setAddedProjects]);

  return {
    addedProjects: Array.isArray(addedProjects) ? addedProjects : [],
    addProject,
    removeProject,
  };
}