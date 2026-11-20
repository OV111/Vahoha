// Paths whose layers have a published voice-exam rubric (backend/seeders/rubrics/).
// Only these show the "Voice exam" row, so learners never land on a layer with no content.
// Add a path here after its rubric files are reviewed and seeded.
const VOICE_EXAM_PATHS = ["api-dev", "go-dev", "db-engineer", "security-dev", "systems-dev", "graphql-dev", "microservices", "rust-dev", "java-spring", "py", "python-backend", "grpc-dev", "node-dev",
  "frontend-dev", "mern", "pern", "t3", "fullstack-engineer", "mean", "jamstack", "django-react", "rails-dev", "next-fullstack", "laravel-vue", "sveltekit-dev", "nuxt-dev", "astro-dev", "remix-dev"];

const LAYER_ID = /^(.+)-\d+$/;

export const hasVoiceExam = (layerId) => VOICE_EXAM_PATHS.includes(layerId?.match(LAYER_ID)?.[1]);
