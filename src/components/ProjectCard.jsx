import { memo } from "react";
import { Link } from "react-router";
import { useProjects } from "../hooks/useProjects";

function ProjectCard({ project, onEdit }) {
  const { addedProjects, removeProject } = useProjects();

  const { id, title, description, technologies, category, liveUrl, githubUrl } =
    project;

  const safeTechnologies = Array.isArray(technologies) ? technologies : [];

  // Determine whether this project was added by the user.
  const isUserAdded = addedProjects.some(
    (addedProject) => String(addedProject.id) === String(id),
  );

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (confirmed) {
      removeProject(id);
    }
  }

  return (
    <article
      className="flex h-full flex-col rounded-2xl
        border border-slate-800 bg-slate-900 p-6
        transition duration-300
        hover:-translate-y-1 hover:border-cyan-400"
    >
      <div className="mb-4">
        <span
          className="rounded-full bg-cyan-400/10 px-3 py-1
            text-xs font-semibold text-cyan-400"
        >
          {category}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white">{title}</h3>

      <p className="mt-3 flex-1 leading-7 text-slate-400">{description}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {safeTechnologies.map((technology) => (
          <li
            key={technology}
            className="rounded-md bg-slate-800 px-2 py-1
              text-xs text-slate-300"
          >
            {technology}
          </li>
        ))}
      </ul>

      <div
        className="mt-6 flex flex-wrap gap-4 border-t
          border-slate-800 pt-5 text-sm"
      >
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Live Demo ↗
          </a>
        )}

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-300 hover:text-white"
          >
            GitHub ↗
          </a>
        )}
      </div>

      <div className="border-slate-800 text-sm">
        <Link
          to={`/projects/${id}`}
          className="mt-4 inline-block font-semibold text-blue-400 hover:underline"
        >
          View project details →
        </Link>
      </div>

      {isUserAdded && (
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default memo(ProjectCard);
