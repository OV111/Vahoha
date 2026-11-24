// Real public repos, pinned to a commit, with the right answer written by hand
// from their files (software lens). `npm run eval:scan` scores the scanner on them.
//
//   parts: id -> { kind (one or several allowed), match (any of these words in the part's key, title or sub) }
//   optional: in the code but off by default or unclear: neither rewarded nor punished
//   wires: "source>target"; wires that touch an optional part are not scored

const part = (kind, ...match) => ({ kind: [].concat(kind), match });
const optional = (kind, ...match) => ({ ...part(kind, ...match), optional: true });

export const CASES = [
  {
    repo: "dockersamples/example-voting-app",
    sha: "63e9150ca17af4ed05880d4245e486481f73fcb4",
    parts: {
      vote: part(["server", "client"], "vote", "flask"),
      result: part(["server", "client"], "result", "express"),
      worker: part("worker", "worker"),
      redis: part(["cache", "queue"], "redis"),
      db: part("database", "postgres"),
    },
    wires: ["vote>redis", "worker>redis", "worker>db", "result>db"],
  },
  {
    repo: "umami-software/umami",
    sha: "aad2c4cedd5c0b3bc4d361843830a0bb47cf79c4",
    parts: {
      app: part("client", "next", "umami"),
      db: part("database", "postgres"),
      kafka: optional("queue", "kafka"),
      redis: optional("cache", "redis"),
    },
    wires: ["app>db"],
  },
  {
    repo: "outline/outline",
    sha: "ef3a1fcb2c6da4a3f4d3e0927e2bd51b196a1912",
    parts: {
      web: part("client", "react"),
      api: part("server", "koa"),
      db: part("database", "postgres"),
      redis: part("cache", "redis"),
      queue: part("queue", "bull"),
      worker: part("worker", "worker"),
      s3: part("storage", "s3"),
      mail: part("external", "smtp", "email"),
    },
    wires: ["web>api", "api>db", "api>redis", "api>queue", "queue>worker", "worker>db", "api>s3", "worker>mail"],
  },
  {
    repo: "hagopj13/node-express-boilerplate",
    sha: "179ae84efec61b14206d0305d941daed6c6d07f9",
    parts: { api: part("server", "express"), db: part("database", "mongo"), mail: part("external", "smtp", "email") },
    wires: ["api>db", "api>mail"],
  },
  {
    repo: "fastapi/full-stack-fastapi-template",
    sha: "77e550a73bb49dd2967622c5ed11bf7a49603c93",
    parts: {
      web: part("client", "react", "frontend"),
      api: part("server", "fastapi", "backend"),
      db: part("database", "postgres"),
      mail: optional("external", "smtp", "email"),
    },
    wires: ["web>api", "api>db"],
  },
  {
    repo: "idurar/idurar-erp-crm",
    sha: "e935dec13cf8b6082a7e7fc4736669e5151a80a3",
    parts: {
      web: part("client", "react", "frontend"),
      api: part("server", "express", "backend"),
      db: part("database", "mongo"),
      mail: part("external", "resend"),
      s3: part("storage", "s3"),
      // multer receives the files; openai is installed but never imported
      uploads: optional("storage", "multer"),
    },
    wires: ["web>api", "api>db", "api>mail", "api>s3"],
  },
  {
    repo: "bradtraversy/proshop_mern",
    sha: "1d20b5b09e796e2f00779306c390360e9e573276",
    parts: {
      web: part("client", "react", "frontend"),
      api: part("server", "express"),
      db: part("database", "mongo"),
      uploads: part("storage", "uploads", "multer"),
    },
    wires: ["web>api", "api>db", "api>uploads"],
  },
  {
    repo: "testdrivenio/fastapi-celery",
    sha: "191ff138701777838c363772253f73a276c16d68",
    parts: {
      api: part("server", "fastapi", "web"),
      worker: part("worker", "worker"),
      redis: part("cache", "redis"),
      queue: optional("queue", "celery"), // the same Redis, seen as a queue
      dashboard: optional(["server", "worker"], "dashboard"),
    },
    wires: ["api>redis", "worker>redis"],
  },
  {
    repo: "GoogleCloudPlatform/microservices-demo",
    sha: "c7cb6d5bfd6ea3aed768634ebbcb98cb7a523712",
    parts: {
      frontend: part(["server", "client"], "frontend"),
      cart: part("server", "cartservice"),
      catalog: part("server", "productcatalogservice"),
      currency: part("server", "currencyservice"),
      payment: part("server", "paymentservice"),
      shipping: part("server", "shippingservice"),
      email: part("server", "emailservice"),
      checkout: part("server", "checkoutservice"),
      recommendation: part("server", "recommendationservice"),
      ad: part("server", "adservice"),
      redis: part("cache", "redis"),
      assistant: optional("server", "shoppingassistant"),
      load: optional(["server", "client"], "loadgenerator"),
    },
    wires: [
      "frontend>catalog", "frontend>currency", "frontend>cart", "frontend>recommendation", "frontend>shipping", "frontend>checkout", "frontend>ad",
      "checkout>catalog", "checkout>shipping", "checkout>payment", "checkout>email", "checkout>currency", "checkout>cart",
      "recommendation>catalog", "cart>redis",
    ],
  },
  {
    repo: "hoppscotch/hoppscotch",
    sha: "6177eae1875ea4cc8fc46604d65bf85478912d85",
    parts: {
      web: part("client", "selfhost-web"),
      admin: part("client", "sh-admin"),
      desktop: part("client", "desktop"),
      agent: optional("client", "agent"),
      api: part("server", "nest", "backend"),
      db: part("database", "postgres"),
      mail: part("external", "smtp", "email"),
      redis: optional("cache", "redis"),
    },
    wires: ["web>api", "admin>api", "desktop>api", "api>db", "api>mail"],
  },
];
