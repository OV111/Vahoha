// The capstone owns the SSRF-safe GitHub URL parser and the read-only GitHub client.
import { parseRepoUrl } from "../../capstone/index.js";
import { getFileText, getHeadCommit, getRepo, getTree } from "../../capstone/index.js";
import { detectParts, pickKeyFiles, readSignals } from "../lib/repoScan.js";
import { DEFAULT_LENS } from "../lib/lenses.js";
import { labelScan } from "./scanLabelService.js";
import { fail } from "../../../utils/httpErrors.js";

/**
 * Reads a public GitHub repo and proposes the parts of its map, in the
 * vocabulary of the chosen lens. Nothing is saved: the learner accepts or
 * rejects each part in the editor.
 *
 * GitHub failures (rate limit, outage) throw with err.status 502/503 from the
 * client; everything the learner can fix throws a 400/404/422 that says how.
 */
const NOTHING_FOUND = "We couldn't recognise any parts in this repo yet.";

export async function scanRepoService(repoUrl, lens = DEFAULT_LENS) {
  const parsed = parseRepoUrl(repoUrl);
  if (!parsed) fail(400, "Paste a public GitHub repo link, like https://github.com/owner/repo.");

  const meta = await getRepo(parsed.owner, parsed.repo);
  if (!meta || meta.private) fail(404, "We couldn't find that repo, or it's private.");

  const [owner, repo] = meta.fullName.split("/");
  const head = await getHeadCommit(owner, repo);
  if (!head) fail(422, NOTHING_FOUND);

  const tree = await getTree(owner, repo, head.treeSha);
  const keyFiles = pickKeyFiles(tree.entries, lens);
  const texts = await Promise.all(keyFiles.map((path) => getFileText(meta.fullName, head.sha, path)));
  const files = keyFiles.map((path, i) => ({ path, text: texts[i] })).filter((f) => f.text !== null);

  const { parts, wires } = detectParts(readSignals(files), tree.paths, lens);
  if (!parts.length) fail(422, NOTHING_FOUND);

  const labelled = await labelScan({ fullName: meta.fullName, parts, wires, paths: tree.paths, lens });
  return {
    lens,
    repo: { fullName: meta.fullName, sha: head.sha, htmlUrl: meta.htmlUrl },
    ...labelled,
  };
}
