export default {
  slug: "texture-memory",
  trackId: "web-game",
  layerId: "web-game-9",
  type: "CODE",
  difficulty: "med",
  title: "Estimate GPU memory for a texture",
  summary:
    "Compute how many bytes a texture takes on the GPU, with and without mipmaps and compression.",
  description:
    "A 2048x2048 PNG that is 4 MB on disk takes 16 MB of GPU memory once decoded, and about 21 MB with mipmaps. Compressed GPU formats such as DXT store fixed 4x4 pixel blocks and never get decoded to RGBA. Knowing this arithmetic is how you budget memory for a mobile browser.",
  task:
    "Write <code>textureMemory(width, height, format, options)</code> returning the total bytes. Formats: <code>RGBA8</code> (4 bytes per pixel), <code>RGB8</code> (3 bytes per pixel), <code>DXT1</code> (8 bytes per 4x4 block) and <code>DXT5</code> (16 bytes per 4x4 block). Block formats use <code>ceil(w/4) * ceil(h/4)</code> blocks per level. With <code>options.mipmaps</code> true, add every smaller level: each level halves the width and height (rounding down, never below 1) until the 1x1 level is included.",
  constraints: [
    "Throw <code>RangeError('unknown format: NAME')</code> for any other format.",
    "Without mipmaps only the base level counts. <code>options</code> may be omitted.",
    "Width and height must be positive integers, otherwise throw <code>RangeError('invalid size')</code>.",
    "Return a plain number of bytes (no rounding to KB or MB).",
  ],
  example: `textureMemory(256, 256, 'RGBA8');                       // 262144
textureMemory(256, 256, 'DXT1');                        // 32768
textureMemory(256, 256, 'RGBA8', { mipmaps: true });    // 349524`,
  tags: ["performance","memory","textures"],
  estimatedMins: 25,
  xp: 45,
  starterFiles: [
    {
      name: "textureMemory.js",
      lang: "js",
      code: `// textureMemory.js
function textureMemory(width, height, format, options) {
  // your code here
}

module.exports = textureMemory;`,
    },
  ],
  testFile: {
    name: "textureMemory_test.js",
    lang: "test",
    code: `// textureMemory_test.js
const textureMemory = require('./textureMemory');

test('uncompressed_base_level', () => {
  // see the hidden tests for the full checks
  expect(typeof textureMemory).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Write a helper that returns the byte size of one level, then sum it over the levels. The only difference between formats is that block formats count 4x4 blocks and the others count pixels.",
    },
    {
      order: 2,
      cost: 5,
      text: "Walk the mip chain with a loop: take the current size, add its bytes, and stop after the level where both width and height are 1. Next level is <code>Math.max(1, Math.floor(w / 2))</code> for each dimension.",
    },
    {
      order: 3,
      cost: 10,
      text: "For DXT, a level smaller than 4x4 still occupies one full block, so use <code>Math.ceil(w / 4)</code> and <code>Math.ceil(h / 4)</code> rather than dividing the pixel count.",
    },
  ],
  hiddenTests: [
    {
      name: "uncompressed_base_level",
      code: `assert(textureMemory(256, 256, 'RGBA8') === 262144, 'RGBA8 256x256 should be 262144 bytes, got ' + textureMemory(256, 256, 'RGBA8'));
assert(textureMemory(10, 10, 'RGB8') === 300, 'RGB8 10x10 should be 300 bytes');`,
    },
    {
      name: "block_compressed_base_level",
      code: `assert(textureMemory(256, 256, 'DXT1') === 32768, 'DXT1 256x256 should be 32768, got ' + textureMemory(256, 256, 'DXT1'));
assert(textureMemory(100, 30, 'DXT5') === 3200, 'DXT5 100x30 uses 25x8 blocks of 16 bytes = 3200, got ' + textureMemory(100, 30, 'DXT5'));`,
    },
    {
      name: "mipmap_chain_uncompressed",
      code: `assert(textureMemory(256, 256, 'RGBA8', { mipmaps: true }) === 349524, 'RGBA8 256x256 with mipmaps should be 349524, got ' + textureMemory(256, 256, 'RGBA8', { mipmaps: true }));`,
    },
    {
      name: "mipmap_chain_non_square_rounds_down",
      code: `const got = textureMemory(100, 30, 'RGB8', { mipmaps: true });
assert(got === 11913, 'RGB8 100x30 with mipmaps should be 11913 (levels 100x30, 50x15, 25x7, 12x3, 6x1, 3x1, 1x1), got ' + got);`,
    },
    {
      name: "mipmap_chain_block_compressed_has_one_block_minimum",
      code: `const got = textureMemory(256, 256, 'DXT1', { mipmaps: true });
assert(got === 43704, 'DXT1 256x256 with mipmaps should be 43704 (small levels still cost one 8-byte block), got ' + got);`,
    },
    {
      name: "rejects_bad_input",
      code: `let e1 = null; let e2 = null;
try { textureMemory(4, 4, 'PVRTC'); } catch (e) { e1 = e; }
try { textureMemory(0, 4, 'RGBA8'); } catch (e) { e2 = e; }
assert(e1 instanceof RangeError && e1.message === 'unknown format: PVRTC', 'unknown formats must throw RangeError("unknown format: PVRTC")');
assert(e2 instanceof RangeError && e2.message === 'invalid size', 'non-positive sizes must throw RangeError("invalid size")');`,
    },
  ],
  solution: {
    code: `function textureMemory(width, height, format, options) {
  const formats = {
    RGBA8: { bytesPerPixel: 4 },
    RGB8: { bytesPerPixel: 3 },
    DXT1: { blockBytes: 8 },
    DXT5: { blockBytes: 16 },
  };
  const f = formats[format];
  if (!f) throw new RangeError('unknown format: ' + format);
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) {
    throw new RangeError('invalid size');
  }
  const levelBytes = (w, h) =>
    f.blockBytes
      ? Math.ceil(w / 4) * Math.ceil(h / 4) * f.blockBytes
      : w * h * f.bytesPerPixel;

  let total = levelBytes(width, height);
  if (options && options.mipmaps) {
    let w = width;
    let h = height;
    while (w > 1 || h > 1) {
      w = Math.max(1, Math.floor(w / 2));
      h = Math.max(1, Math.floor(h / 2));
      total += levelBytes(w, h);
    }
  }
  return total;
}

module.exports = textureMemory;`,
    explanation:
      "Every level costs either pixels times bytes-per-pixel or whole 4x4 blocks times bytes-per-block, so a small helper hides that difference and the rest is plain summation. The block count uses ceil on each axis separately, which is why a 2x2 or 1x1 mip of a DXT texture still costs one full block. The mip chain is a loop that halves each dimension with floor and clamps at 1; it keeps going until both dimensions are 1, which matters for non-square textures where one side reaches 1 long before the other. Validation comes first so a bad format throws the documented RangeError before any maths happens.",
  },
};
