// Text of the Privacy Policy and the Terms of Service (rendered by
// src/pages/Privacy.jsx and src/pages/Terms.jsx).
//
// Every privacy statement must match the code. If you add a per-user
// collection, a third-party service or a cookie, update the policy and its
// date, and for new per-user data USER_KEYED_COLLECTIONS in
// backend/modules/account/services/accountService.js, which backs the
// "delete your account" promise. Keep the terms in step with the policy.

// Privacy items are [label, text]; label may be null.
export const PRIVACY_EFFECTIVE_DATE = "November 1, 2026";

export const PRIVACY_SUMMARY = [
  "We collect what's needed to run your account and track your learning.",
  "We never sell your data or show you ads.",
  "Your AI mentor messages are processed by an AI provider to generate replies.",
  "Deleting your account deletes your data.",
];

export const PRIVACY_SECTIONS = [
  {
    id: "collect",
    title: "What we collect",
    items: [
      ["Account", "Name, username, email and a hashed password. If you sign in with Google or GitHub, the ID, name and email they share with us."],
      ["Profile", "Anything you add: bio, location, profile and banner images, and social links."],
      ["Learning", "Your roadmap path and progress, test attempts and scores, the topics you missed (weak spots), mastery levels, coding challenge attempts and the code you submit, and teach-back answers."],
      ["AI mentor", "Your conversations with the mentor and how many messages you send per day (used for usage limits)."],
      ["Capstones", "The repository link you submit, the review of your code, your defense answers and, when you pass, a certificate with your name on it."],
      ["Project maps", "The maps you draw or generate from a repository scan, the notes on their parts, your answers to the understanding check, and comments you leave on team maps."],
      ["Teams", "The teams you join, your GitHub username, the pull requests you contribute to the team repository, your defense answers and the ratings you give and receive."],
      ["Recruiter visibility", "Only if you turn it on: the settings for your public candidate page."],
      ["Community", "Posts, comments, likes, saved items, follows, notifications, and chat messages, including voice notes and files you send."],
      ["Billing", "Your plan and subscription status. Card details are handled entirely by our payment provider and never reach our servers."],
      ["Usage", "Product events such as signing up, starting a path or submitting a test, used to understand which features help people learn."],
      ["Contact", "The name, email and message you send through the contact form."],
    ],
  },
  {
    id: "use",
    title: "How we use it",
    items: [
      [null, "To run your account, sign you in and keep it secure, including rate limits and temporary lockouts after repeated failed sign-ins. These use your IP address in short-lived counters that expire on their own."],
      [null, "To track your progress, grade tests and show you which topics to revisit."],
      [null, "To give the AI mentor context about your path, test history and weak spots, so its guidance fits you."],
      [null, "To show your profile and posts to other users, as you choose."],
      [null, "To publish the pages you choose to share: a project map link, a certificate's verification page, your team's evidence page, and your candidate page if you turn recruiter visibility on."],
      [null, "To reply when you contact us, and to fix bugs and improve the product."],
    ],
  },
  {
    id: "third-parties",
    title: "Services we rely on",
    items: [
      ["MongoDB Atlas", "Database where your data is stored."],
      ["Groq", "Runs the AI models. Your mentor messages and the learning context sent with them, teach-back answers, capstone code under review, and project map understanding-check answers are sent to Groq to generate a response."],
      ["GitHub", "Optional sign-in. When you submit a capstone, scan a repository for a project map or sync a team repository, we read that public repository and its pull requests from GitHub."],
      ["Polar", "Handles payments as merchant of record, including tax. It processes your payment details, not us."],
      ["Cloudinary", "Stores and serves the images, voice notes and files you upload."],
      ["Resend", "Sends emails such as password resets and contact-form notifications."],
      ["PostHog", "Product analytics: which pages and features are used, and unhandled errors in the app. It receives an anonymous identifier and your usage events, not your passwords or the content you write."],
      ["Google", "Optional sign-in."],
    ],
  },
  {
    id: "cookies",
    title: "Cookies and storage",
    items: [
      [null, "One secure, httpOnly cookie keeps you signed in. Your session token is kept in memory, not in browser storage."],
      [null, "Your theme preference is saved in your browser's local storage."],
      [null, "Our analytics provider (PostHog) stores an anonymous identifier in your browser, in a cookie or local storage, to count visits. We use no advertising cookies."],
    ],
  },
  {
    id: "rights",
    title: "Your choices",
    items: [
      [null, "Edit your profile at any time in settings."],
      [null, "Delete your account in settings. This permanently removes your account, profile, posts, comments, learning progress, test history, weak spots, AI mentor conversations, challenge submissions, capstones and certificates, project maps and the comments you left on team maps, your team memberships and ratings, chat messages you sent, and usage events. Your certificate links stop working, and your name is removed from team evidence pages."],
      [null, "Ask for a copy of your data, or ask what we hold, by emailing us."],
    ],
  },
  {
    id: "retention",
    title: "How long we keep data",
    items: [
      [null, "For as long as your account exists. Password reset links expire after 1 hour."],
      [null, "Payment records may be kept by Polar as required by tax and accounting law."],
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    items: [
      [null, "If this policy changes, we'll update this page and its effective date. Significant changes will also be announced in the app."],
    ],
  },
];

// Terms items are plain strings.
export const TERMS_EFFECTIVE_DATE = "November 1, 2026";

export const TERMS_SECTIONS = [
  {
    id: "using",
    title: "Using Vahoha",
    items: [
      "Vahoha is a learning platform for developers: roadmaps, tests, an AI mentor, coding challenges, labs, project maps, capstone projects and team projects.",
      "By creating an account or using the site, you agree to these terms. If you don't agree, don't use the service.",
      "You must provide accurate account details and keep your password secure. You are responsible for activity under your account.",
    ],
  },
  {
    id: "conduct",
    title: "Acceptable use",
    items: [
      "Don't attack, probe or overload the service, or try to access other users' accounts or data.",
      "Don't cheat the test, challenge, capstone or team systems, for example by automating submissions, sharing answers to bypass grading, or submitting someone else's work as your own.",
      "Only submit or scan repositories you have the right to share with us.",
      "Don't post unlawful, harassing, hateful or spammy content, or content you don't have the right to share.",
      "We may remove content or suspend accounts that break these rules.",
    ],
  },
  {
    id: "content",
    title: "Your content",
    items: [
      "You own what you post and the code you submit. You give us permission to store, display and process it as needed to run the service, including showing your public profile and posts to other users.",
      "Some pages are public by design once you create or share them: certificate verification pages, team evidence pages, project map links you share, and your candidate page if you turn recruiter visibility on. Anyone with the link can see them.",
    ],
  },
  {
    id: "ai",
    title: "AI features",
    items: [
      "The AI mentor and AI-graded features (teach-back, capstone code reviews, project map checks) can be wrong. Treat their output as guidance, not as professional advice, and verify anything important.",
      "Usage limits apply and depend on your plan.",
    ],
  },
  {
    id: "billing",
    title: "Paid plans",
    items: [
      "Some features require a paid plan. Payments are handled by our payment provider, Polar, which acts as merchant of record.",
      "Subscriptions renew until cancelled. You can cancel at any time and keep access until the end of the paid period.",
      "Refunds are handled according to the payment provider's policy. Contact us if you have a billing problem.",
    ],
  },
  {
    id: "availability",
    title: "Availability and changes",
    items: [
      "The service is provided as is. We work to keep it running but don't guarantee it will be uninterrupted or error free.",
      "Features, limits and prices may change. We'll announce significant changes in the app or on this page.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    items: [
      "To the extent the law allows, Vahoha is not liable for indirect or consequential losses, or for loss of data, arising from your use of the service.",
    ],
  },
  {
    id: "termination",
    title: "Ending your account",
    items: [
      "You can delete your account in settings at any time. See the Privacy Policy for what is deleted.",
      "We may suspend or close accounts that break these terms.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    items: [
      "If these terms change, we'll update this page and its effective date. Continuing to use Vahoha after a change means you accept the new terms.",
    ],
  },
];
