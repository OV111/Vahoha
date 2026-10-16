export default {
  slug: "texture-atlas-packer",
  trackId: "web-game",
  layerId: "web-game-9",
  type: "CODE",
  difficulty: "hard",
  title: "Pack sprites into a texture atlas with shelf packing",
  summary:
    "Place rectangles on shelves so the atlas stays narrow and short.",
  description:
    "Every separate texture costs a draw call and a GPU state change. Atlas generators pack many sprites into one image so they can be drawn together. The simplest useful algorithm is shelf packing: sort by height, fill a row left to right, and start a new row when the next sprite does not fit.",
  task:
    "Write <code>packAtlas(sprites, atlasWidth, padding)</code>. Each sprite is <code>{ name, w, h }</code>. Sort sprites by height descending (ties by name ascending). Place them left to right on the current shelf starting at <code>x = 0, y = 0</code>; a sprite occupies <code>w</code> pixels and the next one starts at <code>x + w + padding</code>. If <code>x + w</code> would exceed <code>atlasWidth</code>, start a new shelf at <code>y = previousShelfY + previousShelfHeight + padding</code> and <code>x = 0</code>. A shelf's height is the height of its first (tallest) sprite. Return <code>{ frames, height }</code> where <code>frames[name] = { x, y, w, h }</code> and <code>height</code> is the bottom edge of the last shelf (no trailing padding; 0 for no sprites). <code>padding</code> defaults to 0.",
  constraints: [
    "If a sprite is wider than <code>atlasWidth</code>, throw <code>RangeError('sprite \"NAME\" is wider than the atlas')</code> (with the real name).",
    "A sprite fits when <code>x + w &lt;= atlasWidth</code> (touching the edge is allowed).",
    "Every sprite name appears exactly once in <code>frames</code>.",
    "Do not modify the input array.",
  ],
  example: `packAtlas([
  { name: 'a', w: 50, h: 30 },
  { name: 'b', w: 50, h: 20 },
  { name: 'c', w: 40, h: 10 },
], 100, 0);
// frames: a (0,0)  b (50,0)  c (0,30)   height: 40`,
  tags: ["assets","atlas","algorithms","packing"],
  estimatedMins: 40,
  xp: 70,
  starterFiles: [
    {
      name: "packAtlas.js",
      lang: "js",
      code: `// packAtlas.js
function packAtlas(sprites, atlasWidth, padding) {
  // your code here
}

module.exports = packAtlas;`,
    },
  ],
  testFile: {
    name: "packAtlas_test.js",
    lang: "test",
    code: `// packAtlas_test.js
const packAtlas = require('./packAtlas');

test('places_sprites_on_shelves', () => {
  // see the hidden tests for the full checks
  expect(typeof packAtlas).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Copy the array before sorting (<code>[...sprites].sort(...)</code>). Sort by <code>b.h - a.h</code>, falling back to comparing names when heights are equal.",
    },
    {
      order: 2,
      cost: 5,
      text: "Keep four running numbers: <code>x</code>, the shelf's <code>y</code>, the shelf's height, and the overall bottom edge. When a sprite does not fit, move y down by shelfHeight + padding and reset x to 0.",
    },
    {
      order: 3,
      cost: 10,
      text: "The first sprite on a new shelf is its tallest (you sorted by height), so set the shelf height from it. Track height as <code>y + shelfHeight</code> of the last shelf so no trailing padding is included.",
    },
  ],
  hiddenTests: [
    {
      name: "places_sprites_on_shelves",
      code: `const r = packAtlas([
  { name: 'a', w: 50, h: 30 }, { name: 'b', w: 50, h: 20 }, { name: 'c', w: 40, h: 10 },
], 100, 0);
assert(JSON.stringify(r.frames.a) === JSON.stringify({ x: 0, y: 0, w: 50, h: 30 }), 'a should be at 0,0, got ' + JSON.stringify(r.frames.a));
assert(JSON.stringify(r.frames.b) === JSON.stringify({ x: 50, y: 0, w: 50, h: 20 }), 'b should be at 50,0 (touching the edge is allowed), got ' + JSON.stringify(r.frames.b));
assert(JSON.stringify(r.frames.c) === JSON.stringify({ x: 0, y: 30, w: 40, h: 10 }), 'c does not fit on shelf 1 and starts shelf 2 at y=30, got ' + JSON.stringify(r.frames.c));
assert(r.height === 40, 'height should be 40, got ' + r.height);`,
    },
    {
      name: "sorts_by_height_then_name",
      code: `const r = packAtlas([
  { name: 'short', w: 10, h: 5 }, { name: 'tallB', w: 10, h: 20 }, { name: 'tallA', w: 10, h: 20 },
], 100, 0);
assert(r.frames.tallA.x === 0 && r.frames.tallB.x === 10 && r.frames.short.x === 20, 'order should be tallA, tallB, short, got x values ' + r.frames.tallA.x + ',' + r.frames.tallB.x + ',' + r.frames.short.x);`,
    },
    {
      name: "padding_is_applied_between_sprites_and_shelves",
      code: `const r = packAtlas([
  { name: 'a', w: 40, h: 20 }, { name: 'b', w: 40, h: 10 }, { name: 'c', w: 20, h: 10 },
], 100, 2);
assert(r.frames.b.x === 42, 'b starts after a plus padding, got x=' + r.frames.b.x);
assert(r.frames.c.y === 22, 'c starts a new shelf at 0+20+2, got y=' + r.frames.c.y);
assert(r.height === 32, 'height should be 22+10=32, got ' + r.height);`,
    },
    {
      name: "wide_sprite_throws",
      code: `let err = null;
try { packAtlas([{ name: 'huge', w: 101, h: 4 }], 100, 0); } catch (e) { err = e; }
assert(err instanceof RangeError, 'must throw a RangeError');
assert(err.message === 'sprite "huge" is wider than the atlas', 'wrong message: ' + (err && err.message));`,
    },
    {
      name: "no_sprites",
      code: `const r = packAtlas([], 64, 1);
assert(r.height === 0, 'height of an empty atlas is 0, got ' + r.height);
assert(Object.keys(r.frames).length === 0, 'frames should be empty');`,
    },
    {
      name: "never_overlaps_and_stays_inside",
      code: `const sprites = [];
for (let i = 0; i < 12; i++) sprites.push({ name: 's' + i, w: 10 + ((i * 7) % 23), h: 8 + ((i * 11) % 19) });
const W = 64;
const r = packAtlas(sprites, W, 1);
const names = Object.keys(r.frames);
assert(names.length === 12, 'every sprite must be placed once, got ' + names.length);
for (const n of names) {
  const f = r.frames[n];
  assert(f.x >= 0 && f.y >= 0 && f.x + f.w <= W && f.y + f.h <= r.height, 'sprite ' + n + ' is outside the atlas');
}
for (let i = 0; i < names.length; i++) {
  for (let j = i + 1; j < names.length; j++) {
    const a = r.frames[names[i]]; const b = r.frames[names[j]];
    const overlap = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
    assert(!overlap, names[i] + ' and ' + names[j] + ' overlap');
  }
}`,
    },
    {
      name: "does_not_modify_input",
      code: `const input = [{ name: 'b', w: 5, h: 5 }, { name: 'a', w: 5, h: 9 }];
packAtlas(input, 50, 0);
assert(input[0].name === 'b' && input[1].name === 'a', 'the input array order must not change');`,
    },
  ],
  solution: {
    code: `function packAtlas(sprites, atlasWidth, padding) {
  const pad = padding || 0;
  const ordered = [...sprites].sort((a, b) =>
    b.h - a.h || (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
  );
  const frames = {};
  let x = 0;
  let y = 0;
  let shelfHeight = 0;
  let height = 0;

  for (const s of ordered) {
    if (s.w > atlasWidth) {
      throw new RangeError('sprite "' + s.name + '" is wider than the atlas');
    }
    if (shelfHeight === 0) {
      shelfHeight = s.h;
    } else if (x + s.w > atlasWidth) {
      y += shelfHeight + pad;
      x = 0;
      shelfHeight = s.h;
    }
    frames[s.name] = { x, y, w: s.w, h: s.h };
    x += s.w + pad;
    height = y + shelfHeight;
  }
  return { frames, height };
}

module.exports = packAtlas;`,
    explanation:
      "Shelf packing works because the height sort guarantees the first sprite on a shelf is the tallest, so the shelf height can be fixed the moment the shelf starts and later sprites on it can never stick out. The loop therefore needs only four numbers: the cursor x, the shelf's y, the shelf height, and the overall height. A sprite that would cross the right edge triggers a new shelf: y moves down by the old shelf height plus the padding, x resets, and the new shelf height comes from this sprite. Padding is added after every sprite in x, and between shelves in y, but the reported height is y plus the shelf height, so no padding is counted below the last row. Sorting a copy keeps the caller's array untouched, and the wide-sprite check happens before placing so the error carries the real name.",
  },
};
