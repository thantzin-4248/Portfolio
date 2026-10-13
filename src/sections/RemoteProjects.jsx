import { useState } from "react";
import useFetch from "../hooks/useFetch";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

function RemoteProjects() {
  const [retryCount, setRetryCount] = useState(0);
  const { data: posts, loading, error } = useFetch(POSTS_URL, retryCount);

  const visiblePosts = Array.isArray(posts) ? posts.slice(0, 9) : [];

  return (
    <section
      id="remote-projects"
      className="bg-slate-950 px-6 py-20 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            API Integration
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Remote Project Gallery
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Discover sample records fetched from a public API. This section
            demonstrates reusable data fetching, asynchronous rendering, and API
            integration in React.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div
            role="status"
            className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
          >
            <span
              aria-hidden="true"
              className="h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400"
            />

            <p className="text-slate-300">Loading projects...</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6"
          >
            <h3 className="text-lg font-semibold text-red-300">
              Unable to load projects
            </h3>

            <p className="mt-2 leading-7 text-slate-300">{String(error)}</p>

            <p className="mt-3 text-sm text-slate-400">
              Check your internet connection and try again later.
            </p>
            <button
              type="button"
              onClick={() => {
                setRetryCount((previous) => previous + 1);
              }}
              className="mt-4 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && visiblePosts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-16 text-center">
            <h3 className="text-xl font-semibold text-white">
              No projects available
            </h3>

            <p className="mt-3 text-slate-400">
              The API returned no records to display.
            </p>
          </div>
        )}

        {/* Project grid */}
        {!loading && !error && visiblePosts.length > 0 && (
          <>
            <div className="mb-6 border-b border-slate-800 pb-4">
              <p className="text-sm text-slate-400">
                Showing{" "}
                <span className="font-semibold text-cyan-400">
                  {visiblePosts.length}
                </span>{" "}
                sample projects
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post) => (
                <article
                  key={post.id}
                  className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-cyan-950/20"
                >
                  {/* Card header */}
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                      Sample Project
                    </span>

                    <span className="text-sm font-medium text-slate-500">
                      #{post.id}
                    </span>
                  </div>

                  {/* Project title */}
                  <h3 className="mb-4 text-xl font-bold capitalize leading-snug text-white transition group-hover:text-cyan-400">
                    {post.title}
                  </h3>

                  {/* Project description */}
                  <p className="flex-1 text-sm leading-7 text-slate-400">
                    {post.body}
                  </p>

                  {/* Card footer */}
                  <div className="mt-6 border-t border-slate-800 pt-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                      Loaded from public API
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default RemoteProjects;
