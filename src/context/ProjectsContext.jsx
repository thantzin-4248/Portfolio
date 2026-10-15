import { createContext, useContext, useEffect, useReducer } from "react";

const STORAGE_KEY = "portfolio-added-projects";

const ProjectsContext = createContext(null);

// 1. Load the initial state from localStorage.
function getInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return {
      addedProjects: Array.isArray(parsed) ? parsed : [],
    };
  } catch (error) {
    console.error("Failed to load projects:", error);

    return { addedProjects: [] };
  }
}

// 2. Describe how state changes for each action.
function projectsReducer(state, action) {
  switch (action.type) {
    case "ADD_PROJECT":
      return {
        ...state,
        addedProjects: [...state.addedProjects, action.payload],
      };

    case "UPDATE_PROJECT":
      return {
        ...state,
        addedProjects: state.addedProjects.map((project) =>
          String(project.id) === String(action.payload.id)
            ? { ...project, ...action.payload.changes }
            : project,
        ),
      };

    case "REMOVE_PROJECT":
      return {
        ...state,
        addedProjects: state.addedProjects.filter(
          (project) => String(project.id) !== String(action.payload),
        ),
      };

    default:
      throw new Error(`Unknown project action: ${action.type}`);
  }
}

// 3. Make state available to descendant components.
export function ProjectsProvider({ children }) {
  const [state, dispatch] = useReducer(
    projectsReducer,
    undefined,
    getInitialState,
  );

  // 4. Persist user-added projects after state changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.addedProjects));
    } catch (error) {
      console.error("Failed to save projects:", error);
    }
  }, [state.addedProjects]);

  function addProject(project) {
    dispatch({
      type: "ADD_PROJECT",
      payload: project,
    });
  }

  function updateProject(projectId, changes) {
    dispatch({
      type: "UPDATE_PROJECT",
      payload: {
        id: projectId,
        changes,
      },
    });
  }

  function removeProject(projectId) {
    dispatch({
      type: "REMOVE_PROJECT",
      payload: projectId,
    });
  }

  const value = {
    addedProjects: state.addedProjects,
    addProject,
    updateProject,
    removeProject,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

// 5. Provide a safe, reusable way to consume the context.
export function useProjects() {
  const context = useContext(ProjectsContext);

  if (context === null) {
    throw new Error("useProjects must be used inside ProjectsProvider");
  }

  return context;
}
