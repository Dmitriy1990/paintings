export function formatPrice(value) {
  if (value == null || Number.isNaN(Number(value))) return '';

  return `${Number(value).toLocaleString('ru-RU')} $`;
}
