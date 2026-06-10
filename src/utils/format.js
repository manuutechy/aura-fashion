/**
 * Formats a numeric price into a Kenyan Shillings string (strictly KES X,XXX)
 * @param {number} price
 * @returns {string}
 */
export function formatPrice(price) {
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  return `KES ${formatted}`;
}
