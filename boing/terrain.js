export const BlockType = { Air: 0, Concrete: 1, Grass: 2 };
export const terrainColors = ['', '#555', 'limegreen'];

export default class {
  /**
   * Create a new object that stores terrain data
   * @param {number} w Width of the terrain in pixels
   * @param {number} h Height of the terrain in pixels
   * @param {Iterable<number>} blockdata Used to reproduce terrain
   */
  constructor(w = 20, h = 5, blockdata) {
    this.w = w;
    this.h = h;

    if (typeof blockdata !== 'undefined')
      this.blocks = new Uint16Array(blockdata);
    else {
      this.blocks = new Uint16Array(w * h);
      for (let x = 0; x < this.w; x++) this.setBlock(x, 4, BlockType.Grass);
      // this.setBlock(2, 0, BlockType.Concrete);
    }
  }

  /**
   * Draw the terrain
   * @param {CanvasRenderingContext2D} ctx The context to draw to
   */
  draw(ctx) {
    for (let x = 0; x < this.w; x++)
      for (let y = 0; y < this.h; y++) {
        const blockType = this.getBlock(x, y);
        if (blockType !== BlockType.Air) {
          ctx.fillStyle = terrainColors[blockType];
          ctx.fillRect(x, y, 1, 1);
        }
      }
  }

  /**
   * Gets the block type at the coordinates
   * @param {number} x X coordiante of the block
   * @param {number} y Y coordinate of the block
   */
  getBlock(x, y) {
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return BlockType.Air;
    return this.blocks[this.w * y + x];
  }

  /**
   * Sets the block type at the coordinates
   * @param {number} x X coordiante of the block
   * @param {number} y Y coordinate of the block
   * @param {number} type The block type to set the block to
   */
  setBlock(x, y, type) {
    this.blocks[this.w * y + x] = type;
  }
}
