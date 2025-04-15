export function formatPrice (price: number) {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
export function discountedPrice (price: number, discount: number) {
  return price - (price * discount) / 100
}
