const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 'YYYY-MM' -> 'Mon YYYY'; a bare 'YYYY' passes through unchanged. */
export function formatMonthYear(value: string): string {
  const [year, month] = value.split('-');
  if (!month) return year;
  const index = Number(month) - 1;
  return `${MONTHS[index] ?? month} ${year}`;
}
