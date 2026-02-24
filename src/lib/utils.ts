export const calculateReadingTime = (content: string) => {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
};

export const formatDate = (input?: string | null) => {
  if (!input) return 'Unscheduled';
  return new Date(input).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
