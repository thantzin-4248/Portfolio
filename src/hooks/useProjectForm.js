
import { useState } from "react";

import {
  initialProjectFormData,
  normalizeProject,
  validateProject,
} from "../utils/projectValidation";

export default function useProjectForm(onAddProject) {
  const [formData, setFormData] = useState(initialProjectFormData);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
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
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationErrors = validateProject(formData);
    setErrors(validationErrors);
    setFormError("");
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newProject = normalizeProject(formData);

      // Supports both synchronous callbacks and async callbacks.
      await onAddProject(newProject);

      setFormData({ ...initialProjectFormData });
      setErrors({});
      setSuccessMessage("Project added successfully.");
    } catch (error) {
      console.error("Failed to add project:", error);
      setFormError(
        "Unable to add the project. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setFormData({ ...initialProjectFormData });
    setErrors({});
    setFormError("");
    setSuccessMessage("");
  }

  return {
    formData,
    errors,
    formError,
    successMessage,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
