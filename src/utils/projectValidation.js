
export const initialProjectFormData = {
  title: "",
  description: "",
  category: "",
  technologies: "",
  liveUrl: "",
  githubUrl: "",
};

const LIMITS = {
  title: 100,
  description: 500,
  category: 50,
  technologies: 20,
};

function isValidHttpUrl(value) {
  if (!value.trim()) {
    return true; // URLs are optional.
  }

  try {
    const url = new URL(value);

    return (
      ["http:", "https:"].includes(url.protocol) &&
      url.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

export function validateProject(formData) {
  const errors = {};

  const title = formData.title.trim();
  const description = formData.description.trim();
  const category = formData.category.trim();

  const technologies = formData.technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  if (!title) {
    errors.title = "Project title is required.";
  } else if (title.length > LIMITS.title) {
    errors.title = `Title must be ${LIMITS.title} characters or fewer.`;
  }

  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length > LIMITS.description) {
    errors.description =
      `Description must be ${LIMITS.description} characters or fewer.`;
  }

  if (!category) {
    errors.category = "Category is required.";
  } else if (category.length > LIMITS.category) {
    errors.category =
      `Category must be ${LIMITS.category} characters or fewer.`;
  }

  if (technologies.length === 0) {
    errors.technologies = "Enter at least one technology.";
  } else if (technologies.length > LIMITS.technologies) {
    errors.technologies =
      `Enter no more than ${LIMITS.technologies} technologies.`;
  } else {
    const normalized = technologies.map((item) => item.toLowerCase());

    if (new Set(normalized).size !== normalized.length) {
      errors.technologies = "Remove duplicate technologies.";
    }
  }

  if (!isValidHttpUrl(formData.liveUrl)) {
    errors.liveUrl = "Enter a valid HTTP or HTTPS URL.";
  }

  if (!isValidHttpUrl(formData.githubUrl)) {
    errors.githubUrl = "Enter a valid HTTP or HTTPS URL.";
  }

  return errors;
}

export function normalizeProject(formData) {
  return {
    title: formData.title.trim(),
    description: formData.description.trim(),
    category: formData.category.trim(),
    technologies: formData.technologies
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean),
    liveUrl: formData.liveUrl.trim(),
    githubUrl: formData.githubUrl.trim(),
  };
}
