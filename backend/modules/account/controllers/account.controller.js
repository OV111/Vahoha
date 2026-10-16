import { deleteAccountService } from "../services/accountService.js";

// `authenticate` has already verified the token and set req.user, and
// `validate` has already checked the body, so this only hands over to the
// service. Controllers stay thin; the rules live in the service.
export const deleteAccount = async (req, res) => {
  try {
    const { email, password, confirmation } = req.body;

    await deleteAccountService(
      req.app.locals.db,
      req.user._id,
      email,
      password,
      confirmation,
    );

    res.status(200).json({ message: "Account deleted successfully", status: 200 });
  } catch (err) {
    res.status(err.status ?? 500).json({
      message: err.message || "Server Error",
      status: err.status ?? 500,
    });
  }
};
