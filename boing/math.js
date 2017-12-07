/**
 * Returns the closest number in the range min-max (inclusive)
 * @param {number} x The number to clamp
 * @param {number} min Lower boundary
 * @param {number} max Upper boundary
 */
export function clamp(x, min, max) {
  if (x < min) return min;
  if (x > max) return max;
  return x;
}

export const magSq = (x, y) => x * x + y * y;
