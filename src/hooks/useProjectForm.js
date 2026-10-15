import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  initialProjectFormData,
  normalizeProject,
  validateProject,
} from "../utils/projectValidation";

function createFormData(project) {
  if (!project) {
    return { ...initialProjectFormData };
  }

  return {
    title: project.title ?? "",
    description: project.description ?? "",
    category: project.category ?? "",
    technologies: Array.isArray(project.technologies)
      ? project.technologies.join(", ")
      : (project.technologies ?? ""),
    liveUrl: project.liveUrl ?? "",
    githubUrl: project.githubUrl ?? "",
  };
}

export default function useProjectForm(onSave, initialProject = null) {
  const initialValues = useMemo(
    () => createFormData(initialProject),
    [initialProject],
  );

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronous lock prevents duplicate submissions.
  const submissionLock = useRef(false);

  // Reset fields when the initial project changes.
  useEffect(() => {
    setFormData(initialValues);
    setErrors({});
    setFormError("");
    setSuccessMessage("");
  }, [initialValues]);

  const isDirty = useMemo(
    () => JSON.stringify(formData) !== JSON.stringify(initialValues),
    [formData, initialValues],
  );

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[name];
      return nextErrors;
    });

    setFormError("");
    setSuccessMessage("");
  }, []);

  const resetForm = useCallback(() => {
    if (submissionLock.current) {
      return;
    }

    setFormData(initialValues);
    setErrors({});
    setFormError("");
    setSuccessMessage("");
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      // Check the lock before doing any asynchronous work.
      if (submissionLock.current) {
        return;
      }

      submissionLock.current = true;
      setFormError("");
      setSuccessMessage("");

      const validationErrors = validateProject(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        setFormError("Please correct the errors before saving.");
        submissionLock.current = false;
        return;
      }

      setIsSubmitting(true);

      try {
        const normalizedProject = normalizeProject(formData);

        await onSave(normalizedProject);

        setSuccessMessage("Project saved successfully.");
      } catch (error) {
        setFormError(
          error instanceof Error
            ? error.message
            : "Unable to save the project. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
        submissionLock.current = false;
      }
    },
    [formData, onSave],
  );

  return {
    formData,
    errors,
    formError,
    successMessage,
    isSubmitting,
    isDirty,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
