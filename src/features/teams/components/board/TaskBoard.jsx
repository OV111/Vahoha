import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import {
  BOARD_OPEN_STATUSES,
  TASK_STATUSES,
  TASK_STATUS_LABELS,
} from "../../../../../constants/teams";
import { teamsApi } from "../../teamsApi";
import AiPlanPanel from "./AiPlanPanel";
import SprintBar from "./SprintBar";
import TaskCard from "./TaskCard";
import TaskDialog from "./TaskDialog";

/**
 * The team's task board. Cards move by drag and drop or from the task dialog;
 * the Done column only fills from merged pull requests, so dropping there is refused.
 */

const DONE_HINT = "A task moves to Done when its pull request is merged.";

const SYNC_NOTE = {
  recent: "Already checked GitHub in the last 2 minutes.",
  "repo-unavailable": "Couldn't read the team repository on GitHub.",
};

const describeMoves = (moved) =>
  moved.map((m) => `${m.ref} → ${TASK_STATUS_LABELS[m.to]} (PR #${m.prNumber})`).join(", ");

export default function TaskBoard({ team, members }) {
  const [tasks, setTasks] = useState(null);
  const [sprints, setSprints] = useState([]);
  const [selected, setSelected] = useState("all");
  const [mine, setMine] = useState(false);
  const [dialog, setDialog] = useState(null); // null | { key: number | null }
  const [dropTarget, setDropTarget] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncNote, setSyncNote] = useState(null);

  const viewer = team.viewerId;
  const canWrite = BOARD_OPEN_STATUSES.includes(team.status) && members.some((m) => m.userId === viewer);
  const isLead = team.leadId === viewer || team.coLeadId === viewer;

  const load = useCallback(async () => {
    try {
      const [t, s] = await Promise.all([teamsApi.tasks(team._id), teamsApi.sprints(team._id)]);
      setTasks(t);
      setSprints(s);
      // Open on the active sprint the first time, if there is one.
      setSelected((cur) => (cur === "all" ? (s.find((x) => x.status === "active")?._id ?? "all") : cur));
    } catch (err) {
      setError(err.message);
    }
  }, [team._id]);

  // Pull request state lives on GitHub: check it after the board loads, then
  // reload only if a card actually moved. The server throttles this per team.
  const syncWithGithub = useCallback(
    async ({ quiet } = {}) => {
      if (!team.repo) return;
      setSyncing(true);
      try {
        const result = await teamsApi.syncBoard(team._id);
        if (result.moved.length) {
          await load();
          setSyncNote(`From GitHub: ${describeMoves(result.moved)}`);
        } else if (!quiet) {
          setSyncNote(result.synced ? "Up to date with GitHub." : (SYNC_NOTE[result.reason] ?? null));
        }
      } catch (err) {
        if (!quiet) setError(err.message);
      } finally {
        setSyncing(false);
      }
    },
    [team._id, team.repo, load],
  );

  useEffect(() => {
    load().then(() => syncWithGithub({ quiet: true }));
  }, [load, syncWithGithub]);

  const refreshSprints = () => teamsApi.sprints(team._id).then(setSprints).catch(() => {});

  const visible = useMemo(() => {
    if (!tasks) return [];
    return tasks.filter((t) => {
      if (selected === "none" && t.sprintId) return false;
      if (selected !== "all" && selected !== "none" && t.sprintId !== selected) return false;
      if (mine && t.assigneeId !== viewer) return false;
      return true;
    });
  }, [tasks, selected, mine, viewer]);

  const loginOf = (userId) => members.find((m) => m.userId === userId)?.githubLogin;

  const upsert = (task) =>
    setTasks((list) => {
      const rest = (list ?? []).filter((t) => t.key !== task.key);
      return [...rest, task].sort((a, b) => a.key - b.key);
    });

  const move = async (key, status) => {
    const task = tasks.find((t) => t.key === key);
    if (!task || task.status === status) return;
    if (status === "done") return setError(DONE_HINT);
    setError(null);
    upsert({ ...task, status }); // optimistic; put back if the server refuses
    try {
      upsert(await teamsApi.updateTask(team._id, key, { status }));
      refreshSprints();
    } catch (err) {
      upsert(task);
      setError(err.message);
    }
  };

  const createSprint = async (body) => {
    setBusy(true);
    setError(null);
    try {
      const sprint = await teamsApi.createSprint(team._id, body);
      setSprints((s) => [sprint, ...s]);
      setSelected(sprint._id);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const setSprintStatus = async (sprint, status) => {
    setBusy(true);
    setError(null);
    try {
      await teamsApi.updateSprint(team._id, sprint._id, { status });
      await load(); // closing moves unfinished tasks, so reload both lists
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!tasks && !error) return <p className="t-caption">Loading the board…</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SprintBar
          sprints={sprints}
          selected={selected}
          onSelect={setSelected}
          canPlan={canWrite && isLead}
          onCreate={createSprint}
          onSetStatus={setSprintStatus}
          busy={busy}
        />
        <div className="flex flex-wrap items-center gap-2">
          {team.repo && (
            <button
              type="button"
              className="t-btn t-btn-ghost inline-flex items-center gap-1.5"
              onClick={() => syncWithGithub()}
              disabled={syncing}
            >
              <RefreshCw size={14} aria-hidden="true" className={syncing ? "animate-spin" : ""} />
              {syncing ? "Checking GitHub…" : "Sync with GitHub"}
            </button>
          )}
          <div className="t-seg" role="group" aria-label="Whose tasks">
            <button type="button" aria-pressed={!mine} onClick={() => setMine(false)}>Everyone</button>
            <button type="button" aria-pressed={mine} onClick={() => setMine(true)}>My tasks</button>
          </div>
          {canWrite && (
            <button type="button" className="t-btn t-btn-primary inline-flex items-center gap-1.5" onClick={() => setDialog({ key: null })}>
              <Plus size={14} aria-hidden="true" />
              New task
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-[var(--t-red)]" role="alert">{error}</p>}
      {syncNote && <p className="t-caption" role="status">{syncNote}</p>}

      {canWrite && (
        <AiPlanPanel
          team={team}
          members={members}
          sprints={sprints}
          defaultSprintId={selected !== "all" && selected !== "none" ? selected : ""}
          onAccepted={(created) => {
            created.forEach(upsert);
            refreshSprints();
            setSyncNote(`Added ${created.length} ${created.length === 1 ? "task" : "tasks"} from the AI plan.`);
          }}
        />
      )}

      <div className="t-board">
        {TASK_STATUSES.map((status) => {
          const column = visible.filter((t) => t.status === status);
          const locked = status === "done";
          return (
            <section
              key={status}
              className="t-col"
              aria-label={TASK_STATUS_LABELS[status]}
              data-drop={dropTarget === status && !locked}
              data-locked={locked}
              onDragOver={(e) => {
                if (!canWrite) return;
                e.preventDefault();
                e.dataTransfer.dropEffect = locked ? "none" : "move";
                setDropTarget(status);
              }}
              onDragLeave={() => setDropTarget((cur) => (cur === status ? null : cur))}
              onDrop={(e) => {
                e.preventDefault();
                setDropTarget(null);
                move(Number(e.dataTransfer.getData("text/plain")), status);
              }}
            >
              <h3 className="flex items-center justify-between text-sm font-medium text-[var(--t-mist)]">
                {TASK_STATUS_LABELS[status]}
                <span className="t-caption t-mono">{column.length}</span>
              </h3>
              {locked && column.length === 0 && <p className="t-caption">{DONE_HINT}</p>}
              {column.map((t) => (
                <TaskCard
                  key={t.key}
                  task={t}
                  assigneeLogin={loginOf(t.assigneeId)}
                  draggable={canWrite && t.status !== "done"}
                  onOpen={() => setDialog({ key: t.key })}
                />
              ))}
            </section>
          );
        })}
      </div>

      {dialog && (
        <TaskDialog
          team={team}
          taskKey={dialog.key}
          sprints={sprints}
          defaultSprintId={selected !== "all" && selected !== "none" ? selected : ""}
          members={members}
          canWrite={canWrite}
          isLead={isLead}
          onClose={() => setDialog(null)}
          onSaved={(task) => {
            upsert(task);
            refreshSprints();
          }}
          onDeleted={(key) => {
            setTasks((list) => list.filter((t) => t.key !== key));
            refreshSprints();
          }}
        />
      )}
    </div>
  );
}
