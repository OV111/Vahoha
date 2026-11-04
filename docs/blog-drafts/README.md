# Blog drafts

Reviewed-by-nobody drafts for the blog. They are not in the database. Read each one, edit it, then publish it from the blog editor (`/my-profile/add-blog`), which stores GitHub-flavored Markdown in `content`.

Each file starts with front matter. Copy the values into the editor fields:

| Field | Notes |
| --- | --- |
| `title`, `description` | Description is the card subtitle. |
| `category` | One of `CATEGORIES` in `constants/addBlog.js`. These drafts use "Backend Development" because there is no algorithms category. |
| `difficulty` | Beginner, Intermediate or Advanced. |
| `tags` | Free text. Some are not in `RECOMMENDED_TAGS`, which is fine. |
| `layerIds` | Roadmap layer ids. Tag the post to these so it shows under "Posts for this layer" in the layer drawer. Ids come from `src/data/roadmaps/cs.json`. |

Everything after the front matter is the post body. Paste it as is.

The code samples were run before saving (Node 22). Blocks that need MongoDB, Express or Vitest were checked by reading only.

| File | Layers |
| --- | --- |
| `01-strategy-pattern-replace-if-else.md` | software-design-6, software-design-3 |
| `02-dependency-injection-without-a-framework.md` | software-design-3, software-design-8 |
| `03-ports-and-adapters-in-nodejs.md` | software-design-8 |
| `04-characterization-tests-legacy-code.md` | software-design-7 |
| `05-sliding-window-one-template.md` | leetcode-patterns-3 |
| `06-monotonic-stack-daily-temperatures.md` | leetcode-patterns-4 |
| `07-dynamic-programming-define-the-state.md` | leetcode-patterns-12, leetcode-patterns-13 |
| `08-practice-leetcode-without-memorizing.md` | leetcode-patterns-1, leetcode-patterns-15 |
