export const isValidYear = (year: string): boolean => {
  const yearInt = parseInt(year, 10);
  return yearInt >= 1000 && yearInt <= 9999;
};

export const isValidMonthYear = (date: string): boolean => {
  const [month, year] = date.split("/");
  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);
  return (
    monthInt >= 1 &&
    monthInt <= 12 &&
    (yearInt >= 1000 || (yearInt >= 0 && yearInt <= 99))
  );
};

export const isValidFullDate = (date: string): boolean => {
  const [day, month, year] = date.split("/");
  const yearInt = parseInt(year, 10);
  const monthInt = parseInt(month, 10);
  const dayInt = parseInt(day, 10);
  return (
    (yearInt >= 1000 || (yearInt >= 0 && yearInt <= 99)) &&
    monthInt >= 1 &&
    monthInt <= 12 &&
    dayInt >= 1 &&
    dayInt <= 31
  );
};

export const isValidDate = (date: string): boolean => {
  if (/^\d{4}$/.test(date)) {
    return isValidYear(date);
  } else if (/^\d{1,2}\/\d{2,4}$/.test(date)) {
    return isValidMonthYear(date);
  } else if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(date)) {
    return isValidFullDate(date);
  }
  return false;
};
