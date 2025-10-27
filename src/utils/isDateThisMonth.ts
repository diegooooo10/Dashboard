export const isDateThisMonth = (date: string): boolean => {
  const [month, day, year] = date.split("/").map(Number);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (isNaN(month) || isNaN(day) || isNaN(year)) return false;

  const parsedDate = new Date(year, month - 1, day);
  const isValidDate =
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() + 1 === month &&
    parsedDate.getDate() === day;

  if (!isValidDate) return false;

  return year === currentYear && month === currentMonth;
};
