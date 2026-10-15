
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";
import ProjectFormModal from "../components/ProjectFormModal";
import { useProjects } from "../hooks/useProjects";

function Projects() {
  const { addedProjects, addProject, updateProject } = useProjects();

  // Modal state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isFormDirty, setIsFormDirty] = useState(false);

  // Search and category filters
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q") ?? "";
  const requestedCategory = searchParams.get("category") ?? "All";

  // Combine built-in and user-created projects.
  const allProjects = useMemo(
    () => [...projects, ...addedProjects],
    [addedProjects],
  );

  const categories = useMemo(
    () => [
      "All",
      ...new Set(allProjects.map((project) => project.category)),
    ],
    [allProjects],
  );

  const activeCategory = categories.includes(requestedCategory)
    ? requestedCategory
    : "All";

  const normalizedSearch = searchTerm.trim().toLowerCase();

  function handleOpenAddProject() {
    setEditingProject(null);
    setIsFormDirty(false);
    setIsProjectModalOpen(true);
  }

  function handleEditProject(project) {
    setEditingProject(project);
    setIsFormDirty(false);
    setIsProjectModalOpen(true);
  }

  // force=true means a save succeeded, so no warning is needed.
  function handleCloseProjectModal(force = false) {
    if (
      !force &&
      isFormDirty &&
      !window.confirm(
        "You have unsaved changes. Discard them and close the form?",
      )
    ) {
      return;
    }

    setIsProjectModalOpen(false);
    setEditingProject(null);
    setIsFormDirty(false);
  }

  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: crypto.randomUUID(),
    };

    addProject(newProject);
    setSearchParams({});
  }

  function handleUpdateProject(projectId, changes) {
    updateProject(projectId, changes);
  }

  function handleSearchChange(event) {
    const value = event.target.value;
    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams);
  }

  function handleCategoryChange(category) {
    const nextParams = new URLSearchParams(searchParams);

    if (category === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }

    setSearchParams(nextParams);
  }

  function handleResetFilters() {
    setSearchParams({});
  }

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" ||
        project.category === activeCategory;

      const searchableText = [
        project.title,
        project.description,
        project.category,
        ...(Array.isArray(project.technologies)
          ? project.technologies
          : []),
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        searchableText.includes(normalizedSearch)
      );
    });
  }, [allProjects, activeCategory, normalizedSearch]);

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            My Work
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Featured Projects
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Explore my work, technologies, and projects. You can also add
            your own projects and update them whenever you need.
          </p>

          <button
            type="button"
            onClick={handleOpenAddProject}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <span aria-hidden="true" className="text-xl">
              +
            </span>
            Add Project
          </button>
        </div>

        {/* Search and category filters */}
        <div className="mb-8 space-y-5">
          <div>
            <label
              htmlFor="project-search"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Search projects
            </label>

            <input
              id="project-search"
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by title, technology, or category..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-slate-300">
              Filter by category
            </p>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={activeCategory === category}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-cyan-400 text-slate-950"
                      : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-400 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project counts */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400" aria-live="polite">
            Showing{" "}
            <span className="font-semibold text-white">
              {filteredProjects.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-white">
              {allProjects.length}
            </span>{" "}
            projects
          </p>

          {(searchTerm || requestedCategory !== "All") && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300 focus:outline-none focus:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Project grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-white">
              No projects found
            </h2>

            <p className="mt-3 text-slate-400">
              Try another search term or category.
            </p>

            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit modal */}
      <ProjectFormModal
        isOpen={isProjectModalOpen}
        onClose={handleCloseProjectModal}
      >
        {editingProject ? (
          <ProjectForm
            key={editingProject.id}
            project={editingProject}
            onUpdateProject={handleUpdateProject}
            onCancel={handleCloseProjectModal}
            onDirtyChange={setIsFormDirty}
          />
        ) : (
          <ProjectForm
            key="add-project"
            onAddProject={handleAddProject}
            onCancel={handleCloseProjectModal}
            onDirtyChange={setIsFormDirty}
          />
        )}
      </ProjectFormModal>
    </section>
  );
}

export default Projects;
