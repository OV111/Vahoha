import { getPublicCertificateService, listMyCertificatesService } from "../services/certificateService.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("certificates");


export const getPublicCertificate = async (req, res) => {
  try {
    const data = await getPublicCertificateService(req.app.locals.db, req.params.publicId);
    // A certificate can be revoked, so caches must revalidate rather than keep
    // serving a stale "valid" answer for long.
    res.set("Cache-Control", "public, max-age=60");
    res.json({ success: true, data });
  } catch (err) {
    sendError(res, err);
  }
};

export const listMyCertificates = async (req, res) => {
  try {
    const data = await listMyCertificatesService(req.app.locals.db, req.user._id.toString());
    res.json({ success: true, data });
  } catch (err) {
    sendError(res, err);
  }
};
