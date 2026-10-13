
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

const STORAGE_KEY = "portfolio-added-projects";

function Projects() {
  // Load user-added projects from localStorage.
  const [addedProjects, setAddedProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem(STORAGE_KEY);

      if (!savedProjects) {
        return [];
      }

      const parsedProjects = JSON.parse(savedProjects);

      return Array.isArray(parsedProjects) ? parsedProjects : [];
    } catch (error) {
      console.error("Could not load saved projects:", error);
      return [];
    }
  });

  // Save user-added projects whenever they change.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(addedProjects),
      );
    } catch (error) {
      console.error("Could not save projects:", error);
    }
  }, [addedProjects]);

  // Read search and category filters from the URL.
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q") ?? "";
  const requestedCategory = searchParams.get("category") ?? "All";

  // Combine predefined and user-added projects.
  const allProjects = [...projects, ...addedProjects];

  // Generate categories dynamically.
  const categories = [
    "All",
    ...new Set(
      allProjects
        .map((project) => project.category)
        .filter(Boolean),
    ),
  ];

  // Fall back to "All" if the URL contains an invalid category.
  const activeCategory = categories.includes(requestedCategory)
    ? requestedCategory
    : "All";

  // Update the search query without losing the selected category.
  function updateSearchTerm(value) {
    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams, { replace: true });
  }

  // Update the category without losing the search query.
  function updateCategory(category) {
    const nextParams = new URLSearchParams(searchParams);

    if (category === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }

    setSearchParams(nextParams);
  }

  // Handle new projects submitted through ProjectForm.
  function handleAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: crypto.randomUUID(),
    };

    setAddedProjects((previousProjects) => [
      ...previousProjects,
      newProject,
    ]);

    // Remove existing filters so the new project is visible.
    setSearchParams({});
  }

  // Reset search and category filters.
  function handleResetFilters() {
    setSearchParams({});
  }

  // Filter projects by category and search term.
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredProjects = allProjects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      project.category === activeCategory;

    const searchableText = [
      project.title,
      project.description,
      ...(Array.isArray(project.technologies)
        ? project.technologies
        : []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      searchableText.includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="projects"
      className="bg-slate-950 px-6 py-20 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            My Work
          </p>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Featured Projects
          </h2>

          <p className="max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Explore my work, discover the technologies I use, and learn
            how I approach real-world software development challenges.
          </p>
        </div>

        {/* Add project form */}
        <ProjectForm onAddProject={handleAddProject} />

        {/* Search projects */}
        <div className="mb-8 max-w-xl">
          <label
            htmlFor="project-search"
            className="mb-3 block text-sm font-semibold text-slate-200"
          >
            Search projects
          </label>

          <div className="flex gap-3">
            <input
              id="project-search"
              type="search"
              value={searchTerm}
              onChange={(event) =>
                updateSearchTerm(event.target.value)
              }
              placeholder="Try React, Laravel, dashboard..."
              className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />

            {searchTerm !== "" && (
              <button
                type="button"
                onClick={() => updateSearchTerm("")}
                className="rounded-xl border border-slate-700 px-4 py-3 font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-8">
          <p className="mb-4 text-sm font-semibold text-slate-200">
            Filter by category
          </p>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => updateCategory(category)}
                  aria-pressed={isActive}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                    isActive
                      ? "bg-cyan-400 text-slate-950"
                      : "border border-slate-700 bg-slate-900 text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project counts */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-slate-800 py-4 text-sm text-slate-400">
          <p>
            Total projects:{" "}
            <span className="font-semibold text-white">
              {allProjects.length}
            </span>
          </p>

          <p aria-live="polite">
            Matching projects:{" "}
            <span className="font-semibold text-cyan-400">
              {filteredProjects.length}
            </span>
          </p>
        </div>

        {/* Project results */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-16 text-center">
            <div
              aria-hidden="true"
              className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 text-cyan-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m16 16 4 4" />
              </svg>
            </div>

            <h3 className="mb-3 text-xl font-semibold text-white">
              No projects found
            </h3>

            <p className="mb-6 text-slate-400">
              Try a different search term or select another category.
            </p>

            <button
              type="button"
              onClick={handleResetFilters}
              className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
