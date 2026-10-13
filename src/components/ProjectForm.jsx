
import { useState } from "react";

const initialFormData = {
  title: "",
  description: "",
  category: "",
  technologies: "",
  liveUrl: "",
  githubUrl: "",
};

function ProjectForm({ onAddProject }) {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState("");

  // Handle all form fields using one reusable function.
  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (formError) {
      setFormError("");
    }
  }

  // Validate and submit the form.
  function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const title = formData.title.trim();
    const description = formData.description.trim();
    const category = formData.category.trim();

    if (!title || !description || !category) {
      setFormError("Please complete all required fields.");
      return;
    }

    const technologies = formData.technologies
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);

    if (technologies.length === 0) {
      setFormError("Enter at least one technology.");
      return;
    }

    const newProject = {
      title,
      description,
      category,
      technologies,
      liveUrl: formData.liveUrl.trim(),
      githubUrl: formData.githubUrl.trim(),
    };

    // Send the new project to the parent component.
    onAddProject(newProject);

    // Reset the form.
    setFormData({ ...initialFormData });
    setFormError("");
  }

  const inputClasses =
    "w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20";

  const labelClasses =
    "mb-2 block text-sm font-semibold text-slate-200";

  return (
    <div className="mb-12 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg sm:p-8">
      {/* Form heading */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Portfolio Management
        </p>

        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          Add a New Project
        </h3>

        <p className="mt-3 leading-7 text-slate-400">
          Share a project you've built, including its technologies
          and links to the live demo or source code.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project title */}
        <div>
          <label
            htmlFor="project-title"
            className={labelClasses}
          >
            Project title *
          </label>

          <input
            id="project-title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            required
            maxLength={100}
            placeholder="Inventory Management System"
            className={inputClasses}
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="project-description"
            className={labelClasses}
          >
            Description *
          </label>

          <textarea
            id="project-description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            maxLength={500}
            rows={4}
            placeholder="Describe the problem your project solves..."
            className={`${inputClasses} resize-y`}
          />

          <p className="mt-2 text-xs text-slate-500">
            {formData.description.length}/500 characters
          </p>
        </div>

        {/* Category and technologies */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="project-category"
              className={labelClasses}
            >
              Category *
            </label>

            <input
              id="project-category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleInputChange}
              required
              maxLength={50}
              placeholder="Frontend, Backend, Full Stack..."
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="project-technologies"
              className={labelClasses}
            >
              Technologies *
            </label>

            <input
              id="project-technologies"
              name="technologies"
              type="text"
              value={formData.technologies}
              onChange={handleInputChange}
              required
              placeholder="React, Laravel, MySQL"
              className={inputClasses}
            />

            <p className="mt-2 text-xs text-slate-500">
              Separate technologies with commas.
            </p>
          </div>
        </div>

        {/* Project URLs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="project-live-url"
              className={labelClasses}
            >
              Live demo URL
            </label>

            <input
              id="project-live-url"
              name="liveUrl"
              type="url"
              value={formData.liveUrl}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="project-github-url"
              className={labelClasses}
            >
              GitHub URL
            </label>

            <input
              id="project-github-url"
              name="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={handleInputChange}
              placeholder="https://github.com/username/project"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Validation error */}
        {formError && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
          >
            {formError}
          </p>
        )}

        {/* Submit button */}
        <div className="flex flex-wrap items-center gap-4 border-t border-slate-800 pt-6">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Add Project
            <span aria-hidden="true" className="ml-2">
              +
            </span>
          </button>

          <p className="text-sm text-slate-500">
            Fields marked * are required.
          </p>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
