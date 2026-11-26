import { Bone, BoneLines, BonePanel, SkeletonRegion } from "@/components/feedback/Skeleton";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa6";
import {
  AlertTriangle,
  BadgeCheck,
  Check,
  Copy,
  ExternalLink,
  GitCommitHorizontal,
  Github,
  ShieldAlert,
} from "lucide-react";
import { fetchCertificate } from "./certificateApi";
import { captureEvent } from "@/lib/posthog";
import useProfileStore from "@/stores/useProfileStore";
import { SITE } from "@/constants/site";

/**
 * Public certificate verification — /verify/:publicId.
 *
 * Built for someone who did NOT earn it (a recruiter): every claim links to its
 * evidence (the repo at the exact commit), and "How this was assessed" says
 * plainly what the process proves and what it does not.
 */

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function ScoreBar({ label, score, maxScore }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_96px_40px] items-center gap-3">
      <span className="truncate text-[13px] text-[#D4D4D8]">{label}</span>
      <div
        className="h-1.5 overflow-hidden rounded-full bg-zinc-800"
        role="meter"
        aria-label={`${label} score`}
        aria-valuemin={0}
        aria-valuemax={maxScore}
        aria-valuenow={score}
      >
        <div
          className="h-full rounded-full bg-purple-500"
          style={{ width: `${(score / maxScore) * 100}%` }}
        />
      </div>
      <span className="text-right font-mono text-[12px] text-[#A1A0AB]">
        {score}/{maxScore}
      </span>
    </div>
  );
}

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      captureEvent("share_created", { surface: "certificate", channel: "copy" });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (permissions, insecure origin); the URL bar still works.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[12px] text-[#D4D4D8] transition-colors hover:border-purple-500/50 hover:text-white"
    >
      {copied ? (
        <Check size={13} aria-hidden="true" />
      ) : (
        <Copy size={13} aria-hidden="true" />
      )}
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}

// LinkedIn's "Add licence or certification" form, filled in. It adds to the
// profile of whoever clicks, so only the holder is shown the button.
const linkedInAddUrl = (cert) => {
  const issued = new Date(cert.issuedAt);
  const params = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: `${cert.track.title} Capstone`,
    organizationName: SITE.name,
    issueYear: String(issued.getFullYear()),
    issueMonth: String(issued.getMonth() + 1),
    certUrl: `${SITE.url}/verify/${cert.publicId}`,
    certId: cert.publicId,
  });
  return `https://www.linkedin.com/profile/add?${params}`;
};

function AddToLinkedInButton({ cert }) {
  return (
    <a
      href={linkedInAddUrl(cert)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => captureEvent("share_created", { surface: "certificate", channel: "linkedin" })}
      className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A66C2] px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[#004182]"
    >
      <FaLinkedinIn size={13} aria-hidden="true" />
      Add to LinkedIn
    </a>
  );
}

export default function CertificatePage() {
  const { publicId } = useParams();
  const [cert, setCert] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const myUsername = useProfileStore((s) => s.user?.username);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setCert(await fetchCertificate(publicId));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [publicId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!cert) return undefined;
    const previous = document.title;
    document.title = `${cert.holder.name} · ${cert.track.title} capstone · Vahoha`;
    return () => {
      document.title = previous; // don't leak this title into the next in-app page
    };
  }, [cert]);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 pt-28 sm:px-8">
      {loading && (
        <SkeletonRegion label="Loading certificate" className="space-y-6">
          <BonePanel className="flex items-center justify-between gap-3 rounded-xl px-5 py-4">
            <Bone className="h-4 w-56" />
            <Bone className="h-4 w-20" />
          </BonePanel>
          <BonePanel className="p-7 sm:p-9">
            <Bone soft className="h-3 w-48 max-w-full" />
            <Bone className="mt-5 h-9 w-2/3" />
            <Bone soft className="mt-3 h-3.5 w-24" />
            <BoneLines className="mt-6" widths={["w-full", "w-3/5"]} />
          </BonePanel>
        </SkeletonRegion>
      )}

      {!loading && error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 px-5 py-4 text-[14px] text-amber-200"
        >
          <AlertTriangle
            size={18}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <div className="flex-1">
            <p className="font-medium">
              {error.status === 404
                ? "No certificate exists at this address."
                : error.message}
            </p>
            {error.status === 404 && (
              <p className="mt-1 text-[13px] text-amber-200/70">
                Check the link for typos. Certificates are only valid at their
                exact address.
              </p>
            )}
          </div>
          {error.status !== 404 && (
            <button
              type="button"
              onClick={load}
              className="font-medium underline"
            >
              Retry
            </button>
          )}
        </div>
      )}

      {!loading && cert && (
        <article className="space-y-6">
          {/* A certificate built on seeded test data must never pass for a real one. */}
          {cert.testData && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-4"
            >
              <ShieldAlert
                size={18}
                className="mt-0.5 shrink-0 text-amber-300"
                aria-hidden="true"
              />
              <p className="text-[13px] font-semibold text-amber-200">
                TEST CERTIFICATE — generated from seeded test data. It is not a
                real assessment.
              </p>
            </div>
          )}
          {/* Validity banner — the first thing a verifier needs to know. */}
          {cert.revoked ? (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-4"
            >
              <ShieldAlert
                size={18}
                className="mt-0.5 shrink-0 text-red-400"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-red-300">
                  This certificate has been revoked
                </p>
                <p className="mt-0.5 text-[13px] text-red-200/80">
                  Revoked on {formatDate(cert.revokedAt)}
                  {cert.revokedReason ? ` — ${cert.revokedReason}` : ""}.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-500/30 bg-green-500/5 px-5 py-3">
              <p className="flex items-center gap-2 text-[13px] font-medium text-green-300">
                <BadgeCheck size={16} aria-hidden="true" />
                Valid certificate · issued by Vahoha
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {myUsername && myUsername === cert.holder.username && <AddToLinkedInButton cert={cert} />}
                <CopyLinkButton />
              </div>
            </div>
          )}

          {/* Main card */}
          <section className="rounded-2xl border border-white/10 bg-zinc-900/40 p-7 sm:p-9">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-purple-400">
              Capstone certificate · {cert.track.title}
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-[#F7F7F8] sm:text-4xl">
              {cert.holder.name}
            </h1>
            {cert.holder.profilePath && (
              <Link
                to={cert.holder.profilePath}
                className="mt-1 inline-block text-[13px] text-purple-400 hover:underline"
              >
                @{cert.holder.username}
              </Link>
            )}
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#A1A0AB]">
              Built, shipped and defended{" "}
              <span className="text-[#F7F7F8]">{cert.project.title}</span>.
            </p>
            {/* Own line: the twist is a full sentence with its own punctuation. */}
            {cert.project.twist && (
              <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[#71717A]">
                Assigned requirement: {cert.project.twist}
              </p>
            )}

            <dl className="mt-7 grid grid-cols-1 gap-5 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-[#71717A]">
                  Code review
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-[#F7F7F8]">
                  {cert.scores.review}%
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-[#71717A]">
                  Defense
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-[#F7F7F8]">
                  {cert.scores.defense == null
                    ? "—"
                    : `${cert.scores.defense}%`}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-[#71717A]">
                  Issued
                </dt>
                <dd className="mt-1 text-[15px] font-medium text-[#F7F7F8]">
                  {formatDate(cert.issuedAt)}
                </dd>
              </div>
            </dl>
          </section>

          {/* Evidence */}
          <section className="rounded-2xl border border-white/10 bg-zinc-900/30 p-7">
            <h2 className="text-[13px] font-semibold text-[#F7F7F8]">
              The work
            </h2>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
              <a
                href={cert.repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] text-purple-400 hover:underline"
              >
                <Github size={14} aria-hidden="true" /> {cert.repo.fullName}
                <ExternalLink size={12} aria-hidden="true" />
              </a>
              <a
                href={cert.repo.commitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[12px] text-[#A1A0AB] hover:text-white hover:underline"
              >
                <GitCommitHorizontal size={14} aria-hidden="true" /> commit{" "}
                {cert.repo.commitSha.slice(0, 7)}
              </a>
            </div>
            <p className="mt-2 text-[12px] text-[#71717A]">
              Assessed at this exact commit. Later changes to the repository are
              not part of this certificate.
            </p>

            <h3 className="mt-7 text-[13px] font-semibold text-[#F7F7F8]">
              Rubric
            </h3>
            <div className="mt-3 space-y-2.5">
              {cert.scores.criteria.map((c) => (
                <ScoreBar
                  key={c.name}
                  label={c.name}
                  score={c.score}
                  maxScore={c.maxScore}
                />
              ))}
            </div>
          </section>

          {/* Honest scope */}
          <section className="rounded-2xl border border-white/10 px-7 py-5">
            <h2 className="text-[13px] font-semibold text-[#F7F7F8]">
              How this was assessed
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-[#A1A0AB]">
              {cert.assessment}
            </p>
            <p className="mt-3 font-mono text-[11px] text-[#52525B]">
              Certificate ID {cert.publicId}
            </p>
          </section>
        </article>
      )}
    </div>
  );
}
