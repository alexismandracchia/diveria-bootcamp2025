export const validateSearchTitle = (title: string): string | null => {
  const trimmed = title.trim();

  if (trimmed.length < 3) {
    return "The search must have at least 3 characters";
  }
  if (trimmed.length > 50) {
    return "The search cannot exceed 50 characters";
  }

  const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!regex.test(trimmed)) {
    return "Only letters, numbers and spaces are allowed.";
  }

  return null; 
};
