// Known cross-module deep imports (like teams -> capstone): the capstone owns
// the SSRF-safe GitHub URL parser and the read-only GitHub client.
import { parseRepoUrl } from "../../capstone/lib/githubUrl.js";
import { getFileText, getHeadCommit, getRepo, getTree } from "../../capstone/services/githubClient.js";
import { detectParts, pickKeyFiles, readSignals } from "../lib/repoScan.js";
import { DEFAULT_LENS } from "../lib/lenses.js";
import { labelScan } from "./scanLabelService.js";

/**
 * Reads a public GitHub repo and proposes the parts of its map, in the
 * vocabulary of the chosen lens. Nothing is saved: the learner accepts or
 * rejects each part in the editor.
 *
 * GitHub failures (rate limit, outage) throw with err.status 502/503 from the
 * client; everything the learner can fix comes back as { error }.
 *
 * @returns {Promise<{ data: object } | { error: "url" | "missing" | "empty" }>}
 */
export async function scanRepoService(repoUrl, lens = DEFAULT_LENS) {
  const parsed = parseRepoUrl(repoUrl);
  if (!parsed) return { error: "url" };

  const meta = await getRepo(parsed.owner, parsed.repo);
  if (!meta || meta.private) return { error: "missing" };

  const [owner, repo] = meta.fullName.split("/");
  const head = await getHeadCommit(owner, repo);
  if (!head) return { error: "empty" };

  const tree = await getTree(owner, repo, head.treeSha);
  const keyFiles = pickKeyFiles(tree.entries, lens);
  const texts = await Promise.all(keyFiles.map((path) => getFileText(meta.fullName, head.sha, path)));
  const files = keyFiles.map((path, i) => ({ path, text: texts[i] })).filter((f) => f.text !== null);

  const { parts, wires } = detectParts(readSignals(files), tree.paths, lens);
  if (!parts.length) return { error: "empty" };

  const labelled = await labelScan({ fullName: meta.fullName, parts, wires, paths: tree.paths, lens });
  return {
    data: {
      lens,
      repo: { fullName: meta.fullName, sha: head.sha, htmlUrl: meta.htmlUrl },
      ...labelled,
    },
  };
}
