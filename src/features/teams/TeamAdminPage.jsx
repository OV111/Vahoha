import { useCallback, useEffect, useRef, useState } from "react";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import { MAX_TEAM_MEMBERS } from "../../../constants/teams";
import { teamsApi } from "./teamsApi";
import TeamHealth from "./components/admin/TeamHealth";
import TeamList from "./components/admin/TeamList";
import SetupRail from "./components/admin/SetupRail";
import StatusControl from "./components/admin/StatusControl";
import RepoPanel from "./components/admin/RepoPanel";
import MembersPanel from "./components/admin/MembersPanel";
import SyncPanel from "./components/admin/SyncPanel";
import EvidencePanel from "./components/admin/EvidencePanel";
import { Toast } from "./components/admin/adminUi";
import { SECTION, activeMembers } from "./components/admin/adminHelpers";
import "./teams-theme.css";

const TOAST_MS = 3000;

/**
 * /team/admin: run a build team by hand. Admin-only: the API answers 404 to
 * everyone else, and so does this page.
 */
export default function TeamAdminPage() {
  const [teams, setTeams] = useState(null); // null = loading
  const [loadError, setLoadError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [syncResult, setSyncResult] = useState(null);
  const [toast, setToast] = useState(null); // { kind: "ok" | "error", message }
  const [busy, setBusy] = useState(false);
  const [version, setVersion] = useState(0); // bumps after each write so Team health refetches
  const toastTimer = useRef(null);
  const editorRef = useRef(null);

  const showToast = useCallback((kind, message) => {
    clearTimeout(toastTimer.current);
    setToast({ kind, message });
    // Errors stay until dismissed; successes clear themselves.
    if (kind === "ok") toastTimer.current = setTimeout(() => setToast(null), TOAST_MS);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const loadList = useCallback(async () => {
    try {
      setTeams(await teamsApi.list());
    } catch (err) {
      setLoadError(err);
    }
  }, []);

  const loadDetail = useCallback(
    async (id) => {
      if (!id) return;
      try {
        const [team, ev] = await Promise.all([teamsApi.get(id), teamsApi.evidenceStatus(id)]);
        setDetail(team);
        setEvidence(ev);
      } catch (err) {
        showToast("error", err.message);
      }
    },
    [showToast],
  );

  useEffect(() => {
    loadList();
  }, [loadList]);

  useEffect(() => {
    setDetail(null);
    setEvidence(null);
    setSyncResult(null);
    loadDetail(selectedId);
  }, [selectedId, loadDetail]);

  /** Run a write, then refresh both panes. Resolves to the result (or true) on success, false on failure. */
  const act = async (fn, successMessage) => {
    setBusy(true);
    try {
      const result = await fn();
      await Promise.all([loadList(), loadDetail(selectedId)]);
      setVersion((v) => v + 1);
      if (successMessage) showToast("ok", successMessage);
      return result ?? true;
    } catch (err) {
      showToast("error", err.message);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const shell = (children) => (
    <div className="teams-theme">
      <main className="mx-auto max-w-[1200px] px-4 py-10 md:py-14">{children}</main>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );

  if (loadError?.status === 404) return shell(<p className="t-muted">Not found.</p>);
  if (!teams) {
    return shell(
      loadError ? (
        <p className="text-sm text-[var(--t-red)]">{loadError.message}</p>
      ) : (
        <div className="flex min-h-[40vh]"><LoadingSuspense fill /></div>
      ),
    );
  }

  const create = async (body) => {
    const created = await act(() => teamsApi.create(body), "Team created.");
    if (created?._id) setSelectedId(created._id);
    return Boolean(created);
  };

  const members = detail ? activeMembers(detail) : [];
  const steps = detail && [
    {
      id: SECTION.repo,
      label: "Repository",
      done: Boolean(detail.repo),
      detail: detail.repo?.fullName ?? "Not set",
    },
    {
      id: SECTION.members,
      label: "Members",
      done: members.length >= 2,
      detail: `${members.length} of ${MAX_TEAM_MEMBERS}`,
    },
    {
      id: SECTION.sync,
      label: "Merged work",
      // The API keeps no "last synced" field, so this only knows about this visit (or a past publish).
      done: Boolean(syncResult || evidence),
      detail: syncResult ? `${syncResult.added} new PRs` : "Sync to pull PRs",
    },
    {
      id: SECTION.evidence,
      label: "Evidence",
      done: Boolean(evidence && !evidence.revoked),
      detail: evidence ? (evidence.revoked ? "Revoked" : "Live") : "Not published",
    },
  ];

  return shell(
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-1.5">
        <h1 className="t-h1">Team admin</h1>
        <p className="t-muted">Set up a build team, pull its merged work, then publish the evidence page.</p>
      </header>

      <TeamHealth
        version={version}
        selectedId={selectedId}
        onSelect={(id) => {
          setSelectedId(id);
          editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      <div ref={editorRef} className="grid scroll-mt-6 gap-10 md:grid-cols-[280px_minmax(0,1fr)]">
        <TeamList
          teams={teams}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onCreate={create}
          busy={busy}
        />

        <div className="flex min-w-0 flex-col gap-8">
          {!selectedId && (
            <div className="t-card flex flex-col items-start gap-2">
              <h2 className="t-h2">Pick a team</h2>
              <p className="t-muted">
                Choose a team on the left to manage it, or create a new one.
              </p>
            </div>
          )}
          {selectedId && !detail && <div className="flex min-h-40"><LoadingSuspense fill size={32} /></div>}
          {detail && (
            <>
              <header className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="t-h1">{detail.name}</h2>
                  <span className="t-mono text-[var(--t-fog)]">{detail.trackId}</span>
                </div>
                <StatusControl
                  value={detail.status}
                  busy={busy}
                  onChange={(s) => act(() => teamsApi.setStatus(detail._id, s), `Status set to ${s}.`)}
                />
                <p className="t-caption -mt-2">
                  Completed and disbanded close peer ratings. Disbanded also closes defenses.
                </p>
              </header>

              <SetupRail steps={steps} />

              <RepoPanel
                key={`repo-${detail._id}`}
                team={detail}
                busy={busy}
                onSave={(url) => act(() => teamsApi.setRepo(detail._id, url), "Repository saved.")}
              />

              <MembersPanel
                key={`members-${detail._id}`}
                team={detail}
                busy={busy}
                onAdd={(body) => act(() => teamsApi.addMember(detail._id, body), "Member added.")}
                onRemove={(userId) => act(() => teamsApi.removeMember(detail._id, userId), "Member removed.")}
              />

              <SyncPanel
                team={detail}
                result={syncResult}
                busy={busy}
                onSync={async () => {
                  const result = await act(() => teamsApi.sync(detail._id), "Sync finished.");
                  if (result && typeof result === "object") setSyncResult(result);
                }}
              />

              <EvidencePanel
                key={`evidence-${detail._id}`}
                evidence={evidence}
                busy={busy}
                onIssue={() => act(() => teamsApi.issueEvidence(detail._id), "Evidence published.")}
                onRevoke={(revoked) =>
                  act(
                    () => teamsApi.revokeEvidence(detail._id, revoked),
                    revoked ? "Evidence link revoked." : "Evidence link restored.",
                  )
                }
              />
            </>
          )}
        </div>
      </div>
    </div>,
  );
}
