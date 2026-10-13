import {
  Link,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from 'react-router';

import { getProjectById } from '../services/projectService';

export function projectDetailsLoader({ params }) {
  const project = getProjectById(params.projectId);

  if (!project) {
    throw new Response('Project not found', { status: 404 });
  }

  return project;
}

function ProjectDetailsPage() {
  const project = useLoaderData();

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link
        to="/projects"
        className="mb-8 inline-block font-medium text-blue-600 hover:underline"
      >
        ← Back to projects
      </Link>

      <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
        {project.category}
      </p>

      <h1 className="mb-6 text-4xl font-bold text-gray-900">
        {project.title}
      </h1>

      <p className="mb-8 whitespace-pre-line leading-8 text-gray-600">
        {project.description}
      </p>

      <h2 className="mb-4 text-xl font-bold">Technologies</h2>

      <div className="mb-8 flex flex-wrap gap-2">
        {(Array.isArray(project.technologies)
          ? project.technologies
          : []
        ).map((technology) => (
          <span
            key={technology}
            className="rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700"
          >
            {technology}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Live Demo
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-300 px-5 py-3 font-semibold"
          >
            View Source
          </a>
        )}
      </div>
    </article>
  );
}

export function ProjectDetailsError() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error) && error.status === 404
    ? 'The requested project could not be found.'
    : 'Something went wrong while opening this project.';

  return (
    <section className="px-6 py-24 text-center">
      <h1 className="mb-4 text-3xl font-bold">Unable to open project</h1>
      <p className="mb-6 text-gray-600">{message}</p>
      <Link to="/projects" className="font-semibold text-blue-600">
        Back to projects
      </Link>
    </section>
  );
}

export default ProjectDetailsPage;