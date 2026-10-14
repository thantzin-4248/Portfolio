import { memo } from "react";
import { Link } from "react-router";

function ProjectCard({ project, onDelete }) {
  const {
    id,
    title,
    description,
    technologies,
    category,
    liveUrl,
    githubUrl,
  } = project;

  const safeTechnologies = Array.isArray(technologies)
    ? technologies
    : [];

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

      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-3 flex-1 leading-7 text-slate-400">
        {description}
      </p>

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

      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="mt-4 rounded-lg border border-red-500/40 px-4 py-2
            text-sm font-semibold text-red-400 transition
            hover:bg-red-500/10 focus:outline-none
            focus:ring-2 focus:ring-red-400"
        >
          Delete project
        </button>
      )}
    </article>
  );
}

export default memo(ProjectCard);
