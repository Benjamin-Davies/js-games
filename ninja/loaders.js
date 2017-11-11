/**
 * Loads an image
 * @param {string} src The image source location
 */
export function loadImage(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
  });
}
