import { useEffect } from "react";
import { useRef } from "react";
import TextField from "./form/TextField";
import TextareaField from "./form/TextareaField";
import useProjectForm from "../hooks/useProjectForm";

export default function ProjectForm({
  onAddProject,
  onUpdateProject,
  project = null,
  onCancel,
  onDirtyChange,
}) {
  const isEditing = Boolean(project);
  const submissionLock = useRef(false);
  async function handleSave(projectData) {
    if (isEditing) {
      await onUpdateProject(project.id, projectData);
    } else {
      await onAddProject(projectData);
    }

    // true tells the parent that saving succeeded.
    onCancel?.(true);
  }

  const {
    formData,
    errors,
    formError,
    successMessage,
    isSubmitting,
    isDirty,
    handleChange,
    handleSubmit,
    resetForm,
  } = useProjectForm(handleSave, project);

  // Keep the parent informed about unsaved changes.
  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
    >
      <div>
        <h2
          id="project-modal-title"
          className="text-xl font-semibold text-slate-900 dark:text-white"
        >
          {isEditing ? "Edit project" : "Add a project"}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {isEditing
            ? "Update the project details below."
            : "Share a project from your portfolio."}
        </p>
      </div>

      <TextField
        label="Project title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={errors.title}
        placeholder="e.g. Inventory Management System"
        required
        maxLength={100}
      />

      <TextareaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        placeholder="Describe your project..."
        required
        maxLength={500}
        rows={4}
      />

      <TextField
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        error={errors.category}
        placeholder="e.g. Web Application"
        required
        maxLength={50}
      />

      <TextField
        label="Technologies"
        name="technologies"
        value={formData.technologies}
        onChange={handleChange}
        error={errors.technologies}
        placeholder="React, Tailwind CSS, Laravel"
        required
      />

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Separate technologies with commas. Maximum 20 technologies.
      </p>

      <TextField
        label="Live demo URL"
        name="liveUrl"
        type="url"
        value={formData.liveUrl}
        onChange={handleChange}
        error={errors.liveUrl}
        placeholder="https://example.com"
      />

      <TextField
        label="GitHub URL"
        name="githubUrl"
        type="url"
        value={formData.githubUrl}
        onChange={handleChange}
        error={errors.githubUrl}
        placeholder="https://github.com/username/project"
      />

      {formError && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {formError}
        </p>
      )}

      {successMessage && (
        <p role="status" className="text-sm text-green-700 dark:text-green-400">
          {successMessage}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}

          {isSubmitting
            ? "Saving..."
            : isEditing
              ? "Save changes"
              : "Add project"}
        </button>

        <button
          type="button"
          onClick={() => {
            if (isEditing) {
              onCancel?.();
            } else {
              resetForm();
            }
          }}
          disabled={isSubmitting}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {isEditing ? "Cancel" : "Reset"}
        </button>
      </div>
    </form>
  );
}
