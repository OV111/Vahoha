export default {
    slug: "parse-multipart-form-data",
    trackId: "api-dev",
    layerId: "api-dev-4",
    type: "CODE",
    difficulty: "hard",
    title: "Parse multipart form-data without a library",
    summary: "Read the boundary, parse headers and binary content by hand.",
    description:
      "Every upload library you've used is doing this underneath. Do it once yourself and multipart stops being magic.",
    task:
      "Write <code>parseMultipart(body, boundary)</code>. <code>body</code> is a <code>Uint8Array</code> holding a full multipart/form-data body; <code>boundary</code> is the boundary string from the content-type header (without the leading <code>--</code>). Return an array of parts, each <code>{ name, filename, contentType, data }</code> — <code>filename</code>/<code>contentType</code> are <code>null</code> for plain fields, and <code>data</code> is a <code>Uint8Array</code> holding that part's body.",
    constraints: [
      "No busboy, no multer, no multipart libraries, and no <code>Buffer</code> or <code>TextDecoder</code>: a <code>Uint8Array</code> has no substring search, so write a small helper that finds one byte sequence inside another.",
      "Binary content must survive intact — do not convert part bodies to strings. Only the header text of each part may be turned into a string (headers are plain ASCII, so <code>String.fromCharCode</code> is enough).",
      "Must handle the trailing boundary (the one suffixed with -- ) correctly and not emit a phantom empty part after it.",
    ],
    example: "",
    tags: ["parsing", "binary", "uploads"],
    estimatedMins: 42,
    xp: 70,
    starterFiles: [
      {
        name: "parseMultipart.js",
        lang: "js",
        code: `// parseMultipart.js
function parseMultipart(body, boundary) {
  // your code here
}

module.exports = parseMultipart;`,
      },
    ],
    testFile: {
      name: "parseMultipart_test.js",
      lang: "test",
      code: `// parseMultipart_test.js
const parseMultipart = require('./parseMultipart');

test('parses_a_single_field', () => {
  const boundary = 'X';
  const text = [
    '--X',
    'Content-Disposition: form-data; name="username"',
    '',
    'vahe',
    '--X--',
    '',
  ].join('\\r\\n');
  const body = Uint8Array.from(text, (c) => c.charCodeAt(0));
  const parts = parseMultipart(body, boundary);
  expect(parts.length).toBe(1);
  expect(parts[0].name).toBe('username');
});`,
    },
    hints: [
      {
        order: 1,
        cost: 0,
        text: "A <code>Uint8Array</code> only has <code>indexOf(number)</code>. Write <code>indexOfBytes(haystack, needle, from)</code> that compares byte by byte, then use it in a loop to find every <code>--boundary</code> instead of converting the whole body to a string — that's what keeps binary content intact.",
      },
      {
        order: 2,
        cost: 5,
        text: "Each part looks like: headers, a blank line (the bytes <code>13 10 13 10</code>, that is <code>\\r\\n\\r\\n</code>), then raw body. Find that separator with your helper to split headers from data within a part. <code>subarray(start, end)</code> gives a slice without copying.",
      },
      {
        order: 3,
        cost: 15,
        text: "The <code>Content-Disposition</code> header holds <code>name=\"...\"</code> and, for files, <code>filename=\"...\"</code> — turn only the header bytes into a string with <code>String.fromCharCode(...bytes)</code>, then a regex gets both out.",
      },
    ],
    hiddenTests: [
      {
        name: "parses_a_single_plain_field",
        code: `const bytes = (s) => Uint8Array.from(s, (c) => c.charCodeAt(0));
const text = (u8) => String.fromCharCode(...u8);
const boundary = 'X';
const body = ['--X','Content-Disposition: form-data; name="username"','','vahe','--X--',''].join('\\r\\n');
const parts = parseMultipart(bytes(body), boundary);
assert(parts.length === 1, 'expected exactly one part, got ' + parts.length);
assert(parts[0].name === 'username', 'expected field name "username"');
assert(text(parts[0].data) === 'vahe', 'expected field value "vahe"');
assert(parts[0].filename === null, 'a plain field must have filename === null');`,
      },
      {
        name: "parses_multiple_fields",
        code: `const bytes = (s) => Uint8Array.from(s, (c) => c.charCodeAt(0));
const text = (u8) => String.fromCharCode(...u8);
const boundary = 'X';
const body = [
  '--X','Content-Disposition: form-data; name="a"','','1',
  '--X','Content-Disposition: form-data; name="b"','','2',
  '--X--',''
].join('\\r\\n');
const parts = parseMultipart(bytes(body), boundary);
assert(parts.length === 2, 'expected 2 parts, got ' + parts.length);
assert(parts[0].name === 'a' && text(parts[0].data) === '1', 'first part should be a=1');
assert(parts[1].name === 'b' && text(parts[1].data) === '2', 'second part should be b=2');`,
      },
      {
        name: "parses_a_file_part_with_content_type",
        code: `const bytes = (s) => Uint8Array.from(s, (c) => c.charCodeAt(0));
const text = (u8) => String.fromCharCode(...u8);
const boundary = 'X';
const body = [
  '--X',
  'Content-Disposition: form-data; name="avatar"; filename="pic.png"',
  'Content-Type: image/png',
  '',
  'BINARYDATA',
  '--X--',
  '',
].join('\\r\\n');
const parts = parseMultipart(bytes(body), boundary);
assert(parts.length === 1, 'expected one part');
assert(parts[0].filename === 'pic.png', 'expected filename "pic.png", got ' + parts[0].filename);
assert(parts[0].contentType === 'image/png', 'expected contentType "image/png"');
assert(text(parts[0].data) === 'BINARYDATA', 'expected the file body to survive intact');`,
      },
      {
        name: "no_phantom_part_after_trailing_boundary",
        code: `const bytes = (s) => Uint8Array.from(s, (c) => c.charCodeAt(0));
const boundary = 'X';
const body = ['--X','Content-Disposition: form-data; name="a"','','only','--X--',''].join('\\r\\n');
const parts = parseMultipart(bytes(body), boundary);
assert(parts.length === 1, 'the closing --boundary-- must not produce a second, empty part — got ' + parts.length + ' parts');`,
      },
      {
        name: "binary_content_is_not_corrupted",
        code: `const bytes = (s) => Uint8Array.from(s, (c) => c.charCodeAt(0));
const concat = (...chunks) => { const out = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0)); let at = 0; for (const c of chunks) { out.set(c, at); at += c.length; } return out; };
const boundary = 'X';
const binary = Uint8Array.from([0x00, 0xff, 0x0d, 0x0a, 0x10, 0x89, 0x50, 0x4e]);
const head = bytes(['--X','Content-Disposition: form-data; name="f"; filename="x.bin"','Content-Type: application/octet-stream','',''].join('\\r\\n'));
const tail = bytes('\\r\\n--X--\\r\\n');
const parts = parseMultipart(concat(head, binary, tail), boundary);
assert(parts.length === 1, 'expected one part');
const got = parts[0].data;
assert(got instanceof Uint8Array, 'data must be a Uint8Array');
assert(got.length === binary.length && binary.every((b, i) => got[i] === b), 'binary bytes must survive byte-for-byte, including 0x00 and 0x0d0x0a inside the payload');`,
      },
    ],
    solution: {
      code: `function indexOfBytes(haystack, needle, from = 0) {
  outer: for (let i = from; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return i;
  }
  return -1;
}

const toBytes = (s) => Uint8Array.from(s, (c) => c.charCodeAt(0));
const toText = (bytes) => String.fromCharCode(...bytes);

function parseMultipart(body, boundary) {
  const delimiter = toBytes('--' + boundary);
  const blankLine = toBytes('\\r\\n\\r\\n');
  const parts = [];

  const boundaryIndices = [];
  let searchFrom = 0;
  while (true) {
    const idx = indexOfBytes(body, delimiter, searchFrom);
    if (idx === -1) break;
    boundaryIndices.push(idx);
    searchFrom = idx + delimiter.length;
  }

  for (let i = 0; i < boundaryIndices.length - 1; i++) {
    let start = boundaryIndices[i] + delimiter.length;
    const end = boundaryIndices[i + 1];

    // Skip the CRLF right after the boundary line, and stop at the
    // trailing "--" that marks the closing boundary.
    if (body[start] === 0x2d && body[start + 1] === 0x2d) continue;
    if (body[start] === 0x0d && body[start + 1] === 0x0a) start += 2;

    const part = body.subarray(start, end);
    const headerEnd = indexOfBytes(part, blankLine);
    if (headerEnd === -1) continue;

    const headerText = toText(part.subarray(0, headerEnd));
    // Trim the trailing CRLF that precedes the next boundary delimiter.
    let data = part.subarray(headerEnd + 4);
    if (data.length >= 2 && data[data.length - 2] === 0x0d && data[data.length - 1] === 0x0a) {
      data = data.subarray(0, data.length - 2);
    }

    const nameMatch = headerText.match(/name="([^"]*)"/);
    const filenameMatch = headerText.match(/filename="([^"]*)"/);
    const contentTypeMatch = headerText.match(/Content-Type:\\s*([^\\r\\n]+)/i);

    parts.push({
      name: nameMatch ? nameMatch[1] : null,
      filename: filenameMatch ? filenameMatch[1] : null,
      contentType: contentTypeMatch ? contentTypeMatch[1].trim() : null,
      data,
    });
  }

  return parts;
}

module.exports = parseMultipart;`,
      explanation:
        "Splitting happens with a byte-by-byte search rather than converting to a string first, so null bytes and CR/LF pairs inside a file's binary payload never get mangled by string decoding — only the small header slice of each part is ever turned into a string, since headers are always plain ASCII. Each part sits between two consecutive boundary occurrences; the trailing boundary is recognized by the '--' immediately following it and produces no output, which is what stops the loop from emitting a phantom empty final part. Within a part, the blank-line separator (\\r\\n\\r\\n) splits headers from the raw body, and the trailing CRLF that precedes the next boundary is trimmed off the data so it doesn't leak into the returned payload. subarray returns views, not copies, so large uploads are not duplicated in memory.",
    },
};
