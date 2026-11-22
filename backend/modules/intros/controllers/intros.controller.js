import { dbOf, respond } from "../../../utils/respond.js";
import {
  acceptIntro,
  blockIntroCompany,
  declineIntro,
  listMyIntros,
  myIntroSummary,
  reportIntro,
} from "../../hiring/index.js";

// Always the signed-in developer's own requests: the id comes from the token.
const me = (req) => req.user._id;

export const list = respond((req) => listMyIntros(dbOf(req), me(req), req.query));
export const summary = respond((req) => myIntroSummary(dbOf(req), me(req)));
export const accept = respond((req) => acceptIntro(dbOf(req), me(req), req.params.id));
export const decline = respond((req) => declineIntro(dbOf(req), me(req), req.params.id));
export const block = respond((req) => blockIntroCompany(dbOf(req), me(req), req.params.id));
export const report = respond((req) => reportIntro(dbOf(req), me(req), req.params.id, req.body));
