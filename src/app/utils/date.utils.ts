export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const parseInputDate = (dateString: string): Date => {
  return new Date(dateString);
};