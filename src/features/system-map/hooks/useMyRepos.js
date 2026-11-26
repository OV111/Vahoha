import { useEffect, useState } from "react";
import useProfileStore from "@/stores/useProfileStore";

const MAX_REPOS = 6;

// Connected GitHub account first; the profile's typed GitHub link is the fallback.
const loginOf = (user, stats) => {
  if (user?.githubLogin) return user.githubLogin;
  const match = /github\.com\/([\w-]+)\/?$/i.exec(stats?.githubLink ?? "");
  return match?.[1] ?? null;
};

/**
 * The learner's own public GitHub repos, most recently pushed first, so the scan
 * panel can offer them instead of asking for a URL. Forks and archived repos are
 * left out: they rarely describe the learner's own project.
 */
export default function useMyRepos(signedIn) {
  const { user, stats, fetchProfile } = useProfileStore();
  const login = signedIn ? loginOf(user, stats) : null;
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (signedIn && !user) fetchProfile();
  }, [signedIn, user, fetchProfile]);

  useEffect(() => {
    if (!login) return undefined;
    const controller = new AbortController();
    // Public endpoint, no token: GitHub allows 60 calls an hour per IP, plenty for opening a panel.
    fetch(`https://api.github.com/users/${encodeURIComponent(login)}/repos?type=owner&sort=pushed&per_page=30`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((list) =>
        setRepos(
          list
            .filter((r) => !r.fork && !r.archived)
            .slice(0, MAX_REPOS)
            .map((r) => ({ fullName: r.full_name, name: r.name, htmlUrl: r.html_url })),
        ),
      )
      // Suggestions are optional: on a network error or rate limit the learner still types a URL.
      .catch(() => {});
    return () => controller.abort();
  }, [login]);

  return { login, repos: login ? repos : [] };
}
