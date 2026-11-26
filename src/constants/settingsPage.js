export const SETTINGS_SECTIONS = Object.freeze({
  profile: {
    id: "profile",
    title: "Profile",
    note: "Shown on your public profile. Save with the bar at the bottom.",
  },
  account: {
    id: "account",
    title: "Account",
  },
  privacy: {
    id: "privacy",
    title: "Privacy",
    note: "These save as soon as you change them.",
  },
  email: {
    id: "email",
    title: "Email",
    note: "Saves as soon as you change it.",
  },
});

export const SETTINGS_LINKS = Object.freeze({
  connectedAccounts: {
    to: "/my-profile/connected-accounts",
    label: "Connected accounts",
    hint: "Sign-in methods and linked services such as GitHub.",
  },
  blocked: {
    to: "/my-profile/blocked",
    label: "Blocked users",
    hint: "People who can't message you.",
  },
});
