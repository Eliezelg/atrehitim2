export function formatPrice(price: number): string {
  return new Intl.NumberFormat('he-IL', {
    style: 'currency',
    currency: 'ILS'
  }).format(price);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}