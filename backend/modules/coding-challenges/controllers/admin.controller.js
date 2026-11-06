import {
  submitProposalService,
  listProposalsService,
  approveProposalService,
  rejectProposalService,
  listMyProposalsService,
} from "../services/proposalService.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("challenges admin");

const handle = (fn) => async (req, res) => {
  try {
    const data = await fn(req);
    res.json({ success: true, ...(data?.items ? data : { data }) });
  } catch (err) {
    sendError(err, req, res);
  }
};

// ── Submitter-facing ──────────────────────────────────────────

export const submitProposal = handle((req) =>
  submitProposalService(req.app.locals.db, req.user._id.toString(), req.body),
);

export const listMyProposals = handle((req) =>
  listMyProposalsService(req.app.locals.db, req.user._id.toString()),
);

// ── Admin-only ────────────────────────────────────────────────

export const listProposals = handle((req) =>
  listProposalsService(req.app.locals.db, req.query.status ?? "pending"),
);

export const approveProposal = handle((req) =>
  approveProposalService(
    req.app.locals.db,
    req.user._id.toString(),
    req.params.id,
  ),
);

export const rejectProposal = handle((req) =>
  rejectProposalService(
    req.app.locals.db,
    req.user._id.toString(),
    req.params.id,
    req.body?.note,
  ),
);
