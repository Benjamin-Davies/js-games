const regionDataPromise = fetch('nz_regions.json').then(res => res.json());
const gameDataPromise = fetch('game_data.json').then(res => res.json());
const svgNamespace = 'http://www.w3.org/2000/svg';

/**@type {HTMLObjectElement} */
const map = document.getElementById('map');
map.addEventListener('load', async () => {
  const { districtPaths, regionPaths, chathamIslandsPaths } = await regionDataPromise;
  const { landLinkLines } = await gameDataPromise;

  const mapDoc = map.contentDocument;

  for (const [district, paths] of Object.entries(districtPaths)) {
    for (const pathId of paths) {
      /**@type {SVGPathElement} */
      const path = mapDoc.getElementById(pathId);

      // Eventually we will put an event listener on the element,
      // but for now just remove the path so we know that we haven't missed it
      path.remove();
    }
  }

  for (const [region, paths] of Object.entries(regionPaths)) {
    for (const pathId of paths) {
      /**@type {SVGPathElement} */
      const path = mapDoc.getElementById(pathId);
      path.style.fill = '#ffffff';
    }
  }

  for (const id of chathamIslandsPaths) {
    mapDoc.getElementById(id).remove();
  }

  const svg = mapDoc.getElementsByTagName('svg')[0];
  for (const { x1, y1, x2, y2 } of landLinkLines) {
    const line = mapDoc.createElementNS(svgNamespace, 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#000000');
    line.setAttribute('stroke-width', '50');
    line.setAttribute('stroke-dasharray', '50 100');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
  }
});
