export function getCurrentDateFormatted(): string {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以需要加1
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}
