/**
 * The contact form's rules. ONE source of truth: the backend validates with
 * these (backend/modules/contact/schemas/contact.schemas.js) and the form uses
 * them (src/pages/Contact.jsx), so the form can never offer a topic or allow a
 * length the server refuses.
 */
export const CONTACT_TOPICS = [
  "General question",
  "Bug report",
  "Feature request",
  "Partnership",
  "Other",
];

export const CONTACT_LIMITS = Object.freeze({
  nameMax: 100,
  messageMin: 10,
  messageMax: 1000,
});
