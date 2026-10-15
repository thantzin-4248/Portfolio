
import TextField from "./form/TextField";
import TextareaField from "./form/TextareaField";
import useProjectForm from "../hooks/useProjectForm";

export default function ProjectForm({ onAddProject }) {
  const {
    formData,
    errors,
    formError,
    successMessage,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useProjectForm(onAddProject);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
    >
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Add a project
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Share a project from your portfolio.
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
        placeholder="Describe the problem your project solves..."
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
        <p role="alert" className="text-sm text-red-600">
          {formError}
        </p>
      )}

      {successMessage && (
        <p role="status" className="text-sm text-green-700">
          {successMessage}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Adding..." : "Add project"}
        </button>

        <button
          type="button"
          onClick={resetForm}
          disabled={isSubmitting}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
