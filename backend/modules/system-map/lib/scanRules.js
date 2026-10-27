// What a repo scan recognises, as plain data. A rule turns "signals" found in a
// repo's key files into one part of the map. Each lens (lib/lenses.js) has its
// own rule list, wire rules and kinds; software is the original behaviour.
//
// Signal ids:
//   npm:<package>     dependencies or devDependencies of a package.json
//   py:<package>      requirements*.txt / pyproject.toml / Pipfile
//   go:<module>       go.mod require (prefix match, so versions/suffixes still match)
//   image:<name>      docker-compose `image:` (last path segment, no tag)
//   env:<NAME>        a variable in .env.example
//   prisma:<provider> the datasource provider in prisma/schema.prisma
//   t:<id>            a text pattern inside a key file (see TEXT_PATTERNS in repoScan.js)
//   path:<id>         a file or folder that exists in the repo (see PATH_SIGNALS in repoScan.js)
//
// Rules sharing a `group` become ONE part: the first rule listed wins the
// title, later ones only add evidence. So list the most specific rule first
// (Next.js before React, pg before a generic ORM).

const rule = (group, kind, tech, title, sub, signals) => ({ group, kind, key: `${kind}-${tech}`, title, sub, signals });

// ---- Building blocks several lenses share ---------------------------------

const API_RULES = [
  // Server: one API part, the framework decides the name.
  rule("api", "server", "nestjs", "NestJS API", "Node.js", ["npm:@nestjs/core"]),
  rule("api", "server", "express", "Express API", "Node.js", ["npm:express"]),
  rule("api", "server", "fastify", "Fastify API", "Node.js", ["npm:fastify"]),
  rule("api", "server", "koa", "Koa API", "Node.js", ["npm:koa"]),
  rule("api", "server", "hono", "Hono API", "Node.js", ["npm:hono"]),
  rule("api", "server", "django", "Django app", "Python", ["py:django"]),
  rule("api", "server", "fastapi", "FastAPI app", "Python", ["py:fastapi"]),
  rule("api", "server", "flask", "Flask app", "Python", ["py:flask"]),
  rule("api", "server", "gin", "Gin API", "Go", ["go:github.com/gin-gonic/gin"]),
  rule("api", "server", "echo", "Echo API", "Go", ["go:github.com/labstack/echo"]),
  rule("api", "server", "fiber", "Fiber API", "Go", ["go:github.com/gofiber/fiber"]),
];

const WEB_RULES = [
  // Client: one web app part.
  rule("web", "client", "nextjs", "Next.js app", "React", ["npm:next"]),
  rule("web", "client", "angular", "Angular app", "TypeScript", ["npm:@angular/core"]),
  rule("web", "client", "react", "React app", "browser", ["npm:react"]),
  rule("web", "client", "vue", "Vue app", "browser", ["npm:vue"]),
  rule("web", "client", "svelte", "Svelte app", "browser", ["npm:svelte"]),
  rule("web", "client", "vite", "Web app", "Vite", ["npm:vite"]),
];

// Databases: one part per engine family. `kind` is "database" in most lenses
// and "primary" in the data-storage lens.
const dbRules = (kind) => [
  rule("mongodb", kind, "mongodb", "MongoDB", "document database", [
    "npm:mongodb",
    "npm:mongoose",
    "py:pymongo",
    "go:go.mongodb.org/mongo-driver",
    "image:mongo",
    "prisma:mongodb",
    "env:MONGO_URI",
    "env:MONGODB_URI",
    "env:MONGO_URL",
  ]),
  rule("sql", kind, "postgresql", "PostgreSQL", "SQL database", [
    "npm:pg",
    "npm:postgres",
    "py:psycopg2",
    "py:psycopg2-binary",
    "py:psycopg",
    "go:github.com/lib/pq",
    "go:github.com/jackc/pgx",
    "image:postgres",
    "prisma:postgresql",
  ]),
  rule("sql", kind, "mysql", "MySQL", "SQL database", ["npm:mysql2", "npm:mysql", "image:mysql", "image:mariadb", "prisma:mysql"]),
  rule("sql", kind, "sqlite", "SQLite", "SQL database", ["npm:sqlite3", "npm:better-sqlite3", "prisma:sqlite"]),
  rule("sql", kind, "sql", "SQL database", "via an ORM", [
    "npm:prisma",
    "npm:@prisma/client",
    "npm:sequelize",
    "npm:typeorm",
    "npm:knex",
    "npm:drizzle-orm",
    "py:sqlalchemy",
    "env:DATABASE_URL",
  ]),
];

const CACHE_RULES = [
  rule("redis", "cache", "redis", "Redis", "cache", ["npm:redis", "npm:ioredis", "py:redis", "go:github.com/redis/go-redis", "image:redis", "env:REDIS_URL"]),
];

const QUEUE_RULES = [
  // Queues: one part.
  rule("queue", "queue", "bullmq", "BullMQ queue", "Redis-backed jobs", ["npm:bullmq"]),
  rule("queue", "queue", "bull", "Bull queue", "Redis-backed jobs", ["npm:bull"]),
  rule("queue", "queue", "celery", "Celery queue", "Python jobs", ["py:celery"]),
  rule("queue", "queue", "rabbitmq", "RabbitMQ", "message broker", ["npm:amqplib", "py:pika", "image:rabbitmq"]),
  rule("queue", "queue", "kafka", "Kafka", "event stream", ["npm:kafkajs", "image:kafka"]),
];

const EXTERNAL_RULES = [
  // External services: one part each.
  rule("stripe", "external", "stripe", "Stripe", "payments", ["npm:stripe", "py:stripe", "env:STRIPE_SECRET_KEY"]),
  rule("openai", "external", "openai", "OpenAI", "AI API", ["npm:openai", "py:openai", "env:OPENAI_API_KEY"]),
  rule("anthropic", "external", "anthropic", "Anthropic", "AI API", ["npm:@anthropic-ai/sdk", "py:anthropic", "env:ANTHROPIC_API_KEY"]),
  rule("groq", "external", "groq", "Groq", "AI API", ["npm:groq-sdk", "py:groq", "env:GROQ_API_KEY"]),
  rule("twilio", "external", "twilio", "Twilio", "SMS", ["npm:twilio", "py:twilio"]),
  rule("sendgrid", "external", "sendgrid", "SendGrid", "email", ["npm:@sendgrid/mail", "env:SENDGRID_API_KEY"]),
  rule("resend", "external", "resend", "Resend", "email", ["npm:resend", "env:RESEND_API_KEY"]),
  rule("smtp", "external", "smtp", "Email (SMTP)", "nodemailer", ["npm:nodemailer"]),
];

const FILE_STORAGE_RULES = [
  // File storage.
  rule("s3", "storage", "s3", "Amazon S3", "file storage", ["npm:@aws-sdk/client-s3", "npm:aws-sdk", "py:boto3"]),
  rule("cloudinary", "storage", "cloudinary", "Cloudinary", "images", ["npm:cloudinary", "env:CLOUDINARY_URL"]),
  rule("uploads", "storage", "uploads", "File uploads", "multer", ["npm:multer"]),
];

// ---- Software (the original lens, unchanged) -------------------------------

export const SCAN_RULES = [
  ...API_RULES,
  ...WEB_RULES,
  ...dbRules("database"),
  ...CACHE_RULES,
  ...QUEUE_RULES,
  ...EXTERNAL_RULES,
  ...FILE_STORAGE_RULES,
];

// A queue with no consumer is half a design; these paths show where the jobs run.
export const WORKER_PATH = /(^|\/)(workers?|jobs|queues?)\/|(^|\/)worker\.(c|m)?(js|ts|py)$/i;

// Signals that also prove a worker exists (the library itself runs one).
export const WORKER_SIGNALS = ["py:celery"];

// Wires between kinds, drawn when both ends exist. "app" is the lens's main
// compute part (see appKinds). `unless` skips a wire when that kind exists.
export const WIRE_RULES = [
  { from: "client", to: "server", label: "HTTP" },
  { from: "app", to: "database", label: "queries" },
  { from: "app", to: "cache", label: "cache" },
  { from: "app", to: "queue", label: "jobs" },
  { from: "queue", to: "worker", label: "jobs" },
  { from: "worker", to: "database", label: "writes" },
  { from: "app", to: "external", label: "API calls" },
  { from: "app", to: "storage", label: "uploads" },
];

// ---- Data storage ----------------------------------------------------------

const DATA_STORAGE_RULES = [
  ...API_RULES,
  ...dbRules("primary"),
  rule("replica", "replica", "replica", "Read replica", "a copy of the primary", ["t:replica", "image:pgbouncer"]),
  rule("shard", "shard", "shard", "Shards", "data split across nodes", ["t:shard"]),
  rule("backup", "backup", "backup", "Backups", "copies to restore from", ["t:backup", "image:docker-volume-backup", "image:restic"]),
  rule("migration", "migration", "prisma", "Prisma Migrate", "schema changes", ["npm:prisma"]),
  rule("migration", "migration", "knex", "Knex migrations", "schema changes", ["npm:knex", "path:knexfile"]),
  rule("migration", "migration", "sequelize", "Sequelize migrations", "schema changes", ["npm:sequelize-cli"]),
  rule("migration", "migration", "typeorm", "TypeORM migrations", "schema changes", ["npm:typeorm"]),
  rule("migration", "migration", "migrate-mongo", "migrate-mongo", "schema changes", ["npm:migrate-mongo"]),
  rule("migration", "migration", "db-migrate", "db-migrate", "schema changes", ["npm:db-migrate"]),
  rule("migration", "migration", "umzug", "Umzug", "schema changes", ["npm:umzug"]),
  rule("migration", "migration", "alembic", "Alembic", "schema changes", ["py:alembic", "path:alembic"]),
  rule("migration", "migration", "yoyo", "yoyo-migrations", "schema changes", ["py:yoyo-migrations"]),
  rule("migration", "migration", "golang-migrate", "golang-migrate", "schema changes", ["go:github.com/golang-migrate/migrate"]),
  rule("migration", "migration", "goose", "goose", "schema changes", ["go:github.com/pressly/goose"]),
  rule("migration", "migration", "scripts", "Migration scripts", "schema changes", ["path:migrations"]),
  ...CACHE_RULES,
  rule("object", "storage", "s3", "Amazon S3", "object storage", ["npm:@aws-sdk/client-s3", "npm:aws-sdk", "py:boto3"]),
  rule("object", "storage", "minio", "MinIO", "object storage", ["image:minio"]),
];

const DATA_STORAGE_WIRES = [
  { from: "app", to: "primary", label: "writes" },
  { from: "app", to: "replica", label: "reads" },
  { from: "app", to: "cache", label: "cache" },
  { from: "app", to: "storage", label: "uploads" },
  { from: "primary", to: "replica", label: "replicates" },
  { from: "primary", to: "shard", label: "partitions" },
  { from: "primary", to: "backup", label: "snapshots" },
  { from: "migration", to: "primary", label: "schema changes" },
];

// ---- Data and AI -----------------------------------------------------------

const DATA_AI_RULES = [
  ...WEB_RULES,
  rule("serve", "endpoint", "bentoml", "BentoML service", "model serving", ["py:bentoml"]),
  rule("serve", "endpoint", "torchserve", "TorchServe", "model serving", ["py:torchserve", "image:torchserve"]),
  rule("serve", "endpoint", "triton", "Triton server", "model serving", ["py:tritonclient", "image:tritonserver"]),
  rule("serve", "endpoint", "fastapi", "FastAPI endpoint", "Python", ["py:fastapi"]),
  rule("serve", "endpoint", "flask", "Flask endpoint", "Python", ["py:flask"]),
  rule("serve", "endpoint", "gradio", "Gradio app", "demo UI", ["py:gradio"]),
  rule("serve", "endpoint", "streamlit", "Streamlit app", "demo UI", ["py:streamlit"]),
  rule("model", "model", "pytorch", "PyTorch model", "deep learning", ["py:torch", "py:pytorch-lightning"]),
  rule("model", "model", "tensorflow", "TensorFlow model", "deep learning", ["py:tensorflow", "npm:@tensorflow/tfjs", "npm:@tensorflow/tfjs-node"]),
  rule("model", "model", "keras", "Keras model", "deep learning", ["py:keras"]),
  rule("model", "model", "transformers", "Hugging Face model", "transformers", ["py:transformers"]),
  rule("model", "model", "xgboost", "XGBoost model", "gradient boosting", ["py:xgboost", "py:lightgbm"]),
  rule("model", "model", "sklearn", "scikit-learn model", "classic ML", ["py:scikit-learn", "py:sklearn"]),
  rule("model", "model", "onnx", "ONNX model", "portable model", ["py:onnxruntime", "npm:onnxruntime-node"]),
  rule("eval", "evaluation", "mlflow", "MLflow tracking", "experiment metrics", ["py:mlflow"]),
  rule("eval", "evaluation", "wandb", "Weights & Biases", "experiment metrics", ["py:wandb"]),
  rule("eval", "evaluation", "evidently", "Evidently", "drift and quality reports", ["py:evidently"]),
  rule("eval", "evaluation", "deepeval", "Eval harness", "model evaluation", ["py:deepeval", "py:ragas", "py:torchmetrics"]),
  rule("eval", "evaluation", "dvc", "DVC metrics", "tracked metrics", ["t:dvc-metrics"]),
  rule("pipeline", "pipeline", "airflow", "Airflow pipeline", "orchestration", ["py:apache-airflow"]),
  rule("pipeline", "pipeline", "prefect", "Prefect pipeline", "orchestration", ["py:prefect"]),
  rule("pipeline", "pipeline", "dagster", "Dagster pipeline", "orchestration", ["py:dagster"]),
  rule("pipeline", "pipeline", "dbt", "dbt models", "SQL transforms", ["py:dbt-core", "py:dbt"]),
  rule("pipeline", "pipeline", "kedro", "Kedro pipeline", "pipelines", ["py:kedro"]),
  rule("pipeline", "pipeline", "luigi", "Luigi pipeline", "orchestration", ["py:luigi"]),
  rule("pipeline", "pipeline", "pyspark", "Spark jobs", "big data", ["py:pyspark"]),
  rule("pipeline", "pipeline", "dvc", "DVC pipeline", "reproducible stages", ["t:dvc-stages"]),
  rule("pipeline", "pipeline", "mlflow-project", "MLflow project", "reproducible runs", ["path:mlproject"]),
  rule("pipeline", "pipeline", "notebooks", "Notebooks", "exploration", ["path:notebook"]),
  rule("features", "featurestore", "feast", "Feast", "feature store", ["py:feast"]),
  rule("features", "featurestore", "tecton", "Tecton", "feature store", ["py:tecton"]),
  rule("data", "datasource", "kafka", "Kafka stream", "event data", ["py:kafka-python", "py:confluent-kafka", "npm:kafkajs", "image:kafka"]),
  rule("data", "datasource", "s3", "Amazon S3 data", "object storage", ["py:boto3", "npm:@aws-sdk/client-s3"]),
  rule("data", "datasource", "kaggle", "Kaggle datasets", "public data", ["py:kaggle"]),
  rule("data", "datasource", "datasets", "Datasets", "Hugging Face datasets", ["py:datasets"]),
  rule("data", "datasource", "files", "Data files", "csv, parquet", ["path:data-files"]),
  ...dbRules("database"),
  rule("object", "storage", "minio", "MinIO", "object storage", ["image:minio"]),
];

const DATA_AI_WIRES = [
  { from: "client", to: "endpoint", label: "requests" },
  { from: "datasource", to: "pipeline", label: "raw data" },
  { from: "datasource", to: "model", label: "training data", unless: "pipeline" },
  { from: "pipeline", to: "featurestore", label: "features" },
  { from: "pipeline", to: "model", label: "training" },
  { from: "featurestore", to: "model", label: "features" },
  { from: "model", to: "evaluation", label: "metrics" },
  { from: "model", to: "endpoint", label: "serves" },
  { from: "pipeline", to: "database", label: "writes" },
  { from: "pipeline", to: "storage", label: "artifacts" },
  { from: "endpoint", to: "database", label: "stores results" },
];

// ---- Security --------------------------------------------------------------

const SECURITY_RULES = [
  ...WEB_RULES,
  rule("entry", "entry", "nginx", "Public entry (nginx)", "where traffic arrives", ["t:nginx-listen"]),
  rule("entry", "entry", "port", "Public port", "exposed by the container", ["t:expose"]),
  rule("entry", "entry", "api", "Public API", "HTTP endpoints", [
    "npm:express",
    "npm:fastify",
    "npm:koa",
    "npm:hono",
    "npm:@nestjs/core",
    "py:fastapi",
    "py:flask",
    "py:django",
  ]),
  rule("waf", "firewall", "modsecurity", "Web application firewall", "ModSecurity", ["t:modsecurity", "image:modsecurity"]),
  rule("waf", "firewall", "cloudflare", "Cloudflare", "edge protection", ["npm:cloudflare", "py:cloudflare", "env:CLOUDFLARE_API_TOKEN"]),
  rule("waf", "firewall", "rate-limit", "Rate limiting", "slows abuse", [
    "npm:express-rate-limit",
    "npm:rate-limiter-flexible",
    "py:slowapi",
    "py:flask-limiter",
    "py:django-ratelimit",
    "t:limit-req",
  ]),
  rule("waf", "firewall", "helmet", "Security headers", "Helmet", ["npm:helmet", "py:flask-talisman"]),
  rule("waf", "firewall", "cors", "CORS policy", "which sites may call the API", ["npm:cors", "py:flask-cors", "py:django-cors-headers"]),
  rule("auth", "auth", "auth0", "Auth0", "identity provider", ["npm:auth0", "npm:@auth0/auth0-react", "npm:@auth0/nextjs-auth0"]),
  rule("auth", "auth", "clerk", "Clerk", "identity provider", ["npm:@clerk/clerk-sdk-node", "npm:@clerk/nextjs", "npm:@clerk/clerk-react"]),
  rule("auth", "auth", "keycloak", "Keycloak", "identity provider", ["npm:keycloak-js", "npm:keycloak-connect", "image:keycloak"]),
  rule("auth", "auth", "supabase", "Supabase Auth", "identity provider", ["npm:@supabase/ssr", "npm:@supabase/auth-helpers-nextjs"]),
  rule("auth", "auth", "next-auth", "NextAuth", "sessions and OAuth", ["npm:next-auth", "npm:@auth/core"]),
  rule("auth", "auth", "passport", "Passport", "login strategies", ["npm:passport"]),
  rule("auth", "auth", "oauth", "OAuth / OpenID", "delegated login", [
    "npm:openid-client",
    "npm:oauth2-server",
    "npm:oauth",
    "py:authlib",
    "py:oauthlib",
    "py:django-allauth",
    "py:fastapi-users",
  ]),
  rule("auth", "auth", "jwt", "JWT login", "signed tokens", [
    "npm:jsonwebtoken",
    "npm:jose",
    "py:pyjwt",
    "py:python-jose",
    "go:github.com/golang-jwt/jwt",
    "env:JWT_SECRET",
  ]),
  rule("auth", "auth", "passwords", "Password login", "hashed passwords", ["npm:bcrypt", "npm:bcryptjs", "npm:argon2", "py:bcrypt", "py:argon2-cffi"]),
  rule("secrets", "secrets", "vault", "HashiCorp Vault", "secret store", ["npm:node-vault", "py:hvac", "image:vault"]),
  rule("secrets", "secrets", "aws-secrets", "AWS Secrets Manager", "secret store", ["npm:@aws-sdk/client-secrets-manager"]),
  rule("secrets", "secrets", "doppler", "Doppler", "secret store", ["npm:@dopplerhq/node-sdk", "env:DOPPLER_TOKEN"]),
  rule("secrets", "secrets", "dotenv-vault", "dotenv-vault", "encrypted env files", ["npm:dotenv-vault"]),
  rule("secrets", "secrets", "env", "Environment secrets", "values kept in env files", ["t:secret-env"]),
  ...API_RULES,
  ...dbRules("database"),
  ...EXTERNAL_RULES,
];

const SECURITY_WIRES = [
  { from: "client", to: "entry", label: "HTTPS" },
  { from: "entry", to: "firewall", label: "requests" },
  { from: "entry", to: "server", label: "requests", unless: "firewall" },
  { from: "firewall", to: "server", label: "filtered" },
  { from: "server", to: "auth", label: "verifies" },
  { from: "server", to: "secrets", label: "reads secrets" },
  { from: "server", to: "database", label: "queries" },
  { from: "server", to: "external", label: "API calls" },
];

// ---- Infrastructure --------------------------------------------------------

const INFRA_RULES = [
  ...WEB_RULES,
  rule("dns", "dns", "route53", "Route 53", "DNS", ["t:tf-route53"]),
  rule("dns", "dns", "cloudflare", "Cloudflare DNS", "DNS", ["t:tf-cloudflare"]),
  rule("dns", "dns", "cloudfront", "CloudFront", "CDN", ["t:tf-cloudfront"]),
  rule("dns", "dns", "cdn", "CDN", "edge cache", ["t:tf-cdn"]),
  rule("lb", "loadbalancer", "terraform", "Load balancer", "from Terraform", ["t:tf-lb"]),
  rule("lb", "loadbalancer", "ingress", "Kubernetes Ingress", "routes traffic into the cluster", ["t:k8s-ingress"]),
  rule("lb", "loadbalancer", "traefik", "Traefik", "reverse proxy", ["image:traefik", "path:traefik"]),
  rule("lb", "loadbalancer", "haproxy", "HAProxy", "load balancer", ["image:haproxy", "path:haproxy"]),
  rule("lb", "loadbalancer", "envoy", "Envoy", "proxy", ["image:envoy"]),
  rule("lb", "loadbalancer", "caddy", "Caddy", "reverse proxy", ["image:caddy"]),
  rule("lb", "loadbalancer", "nginx", "nginx", "reverse proxy", ["t:nginx-proxy", "image:nginx"]),
  rule("cluster", "cluster", "managed-k8s", "Managed Kubernetes", "from Terraform", ["t:tf-eks"]),
  rule("cluster", "cluster", "kubernetes", "Kubernetes", "workloads", ["t:k8s-workload"]),
  rule("cluster", "cluster", "ecs", "ECS cluster", "containers on AWS", ["t:tf-ecs"]),
  rule("cluster", "cluster", "helm", "Helm chart", "packaged deploys", ["path:chart"]),
  rule("containers", "container", "docker", "Docker containers", "Dockerfile", ["path:dockerfile"]),
  rule("containers", "container", "compose", "Docker Compose services", "docker-compose", ["t:compose-services"]),
  rule("ci", "cicd", "github-actions", "GitHub Actions", "CI/CD", ["path:github-workflows"]),
  rule("ci", "cicd", "gitlab", "GitLab CI", "CI/CD", ["path:gitlab-ci"]),
  rule("ci", "cicd", "jenkins", "Jenkins", "CI/CD", ["path:jenkinsfile"]),
  rule("ci", "cicd", "circleci", "CircleCI", "CI/CD", ["path:circleci"]),
  ...dbRules("database"),
  rule("db", "database", "managed", "Managed database", "from Terraform", ["t:tf-db"]),
  rule("object", "storage", "s3", "Amazon S3", "object storage", ["t:tf-s3", "npm:@aws-sdk/client-s3", "py:boto3"]),
  rule("object", "storage", "minio", "MinIO", "object storage", ["image:minio"]),
];

const INFRA_WIRES = [
  { from: "client", to: "dns", label: "resolves" },
  { from: "client", to: "loadbalancer", label: "requests", unless: "dns" },
  { from: "dns", to: "loadbalancer", label: "traffic" },
  { from: "loadbalancer", to: "cluster", label: "requests" },
  { from: "loadbalancer", to: "container", label: "requests", unless: "cluster" },
  { from: "cluster", to: "container", label: "runs" },
  { from: "cicd", to: "cluster", label: "deploys" },
  { from: "cicd", to: "container", label: "deploys", unless: "cluster" },
  { from: "app", to: "database", label: "queries" },
  { from: "app", to: "storage", label: "files" },
];

/**
 * Everything the scanner needs per lens.
 *  - appKinds: the main compute part, the first kind that exists is "app" in wire rules
 *  - workers: also look for a worker next to a queue (only the software lens has one)
 */
export const LENS_SCAN = {
  software: { rules: SCAN_RULES, wires: WIRE_RULES, appKinds: ["server", "client"], workers: true },
  "data-storage": { rules: DATA_STORAGE_RULES, wires: DATA_STORAGE_WIRES, appKinds: ["server"], workers: false },
  "data-ai": { rules: DATA_AI_RULES, wires: DATA_AI_WIRES, appKinds: ["endpoint"], workers: false },
  security: { rules: SECURITY_RULES, wires: SECURITY_WIRES, appKinds: ["server"], workers: false },
  infrastructure: { rules: INFRA_RULES, wires: INFRA_WIRES, appKinds: ["container", "cluster"], workers: false },
};

export const KIND_WHY = {
  client: "The part people use in the browser.",
  server: "Receives requests and runs the app's logic.",
  database: "Keeps the app's data safe across restarts.",
  cache: "Keeps hot data in memory so reads are fast.",
  queue: "Holds slow jobs so requests don't have to wait for them.",
  worker: "Runs the queued jobs in the background.",
  external: "A service the app calls over the internet.",
  storage: "Keeps uploaded files outside the database.",
  primary: "The main database: every write goes here first.",
  replica: "A copy of the primary that serves reads and survives its failure.",
  shard: "Splits the data across nodes so no single database holds it all.",
  backup: "Copies of the data to restore from after a mistake or a disaster.",
  migration: "Changes the database schema in versioned, repeatable steps.",
  datasource: "Where the raw data comes from.",
  pipeline: "Moves and transforms data step by step, on a schedule or on demand.",
  featurestore: "Keeps the features that models train and predict with.",
  model: "The trained model that turns inputs into predictions.",
  evaluation: "Measures how good the model is, and whether it is drifting.",
  endpoint: "Serves predictions to the people and apps that ask for them.",
  entry: "The public door: where outside traffic reaches the system.",
  auth: "Checks who a request comes from.",
  secrets: "Keeps passwords and keys out of the code.",
  firewall: "Filters and slows down bad traffic before it reaches the app.",
  loadbalancer: "Spreads incoming traffic across the running copies of the app.",
  container: "Packages the app and what it needs so it runs the same everywhere.",
  cluster: "Runs and restarts many containers across machines.",
  cicd: "Tests and ships every change automatically.",
  dns: "Turns a domain name into the address people actually reach.",
};
