import { projects } from '../data/projects';

export function getAllProjects() {
  let savedProjects = [];

  try {
    const saved = localStorage.getItem('portfolio-added-projects');
    const parsed = saved ? JSON.parse(saved) : [];

    if (Array.isArray(parsed)) {
      savedProjects = parsed;
    }
  } catch {
    // Continue with the original project data.
  }

  return [...projects, ...savedProjects];
}

export function getProjectById(projectId) {
  return getAllProjects().find(
    (project) => String(project.id) === String(projectId)
  );
}