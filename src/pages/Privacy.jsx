import { Link } from "react-router-dom";
import { SITE } from "../../constants/site";

// Every statement here must match the code. If you add a per-user collection,
// a third-party service or a cookie, update this page — and for new per-user
// data, USER_KEYED_COLLECTIONS in backend/modules/account/services/accountService.js, which
// backs the "delete your account" promise below.
const EFFECTIVE_DATE = "November 1, 2026";

const SUMMARY = [
  "We collect what's needed to run your account and track your learning.",
  "We never sell your data or show you ads.",
  "Your AI mentor messages are processed by an AI provider to generate replies.",
  "Deleting your account deletes your data.",
];

const SECTIONS = [
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

const Privacy = () => (
  <div className="mx-auto grid max-w-5xl gap-12 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[200px_1fr]">
    {/* Table of contents — long legal pages are scanned, not read top to bottom. */}
    <nav aria-label="On this page" className="hidden lg:block">
      <div className="sticky top-[calc(var(--navbar-h,56px)+32px)] flex flex-col gap-2">
        <p className="mb-1 text-xs font-medium text-neutral-500">On this page</p>
        {SECTIONS.map(({ id, title }) => (
          <a key={id} href={`#${id}`} className="text-sm text-neutral-400 transition hover:text-white">
            {title}
          </a>
        ))}
      </div>
    </nav>

    <article className="flex max-w-2xl flex-col gap-12">
      <header className="flex flex-col gap-3">
        <h1
          className="text-3xl font-[450] tracking-tight text-white sm:text-4xl"
          style={{ fontFamily: '"Geist Variable", system-ui, sans-serif' }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-500">Effective {EFFECTIVE_DATE}</p>
      </header>

      <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
        <h2 className="text-sm font-medium text-white">The short version</h2>
        <ul className="mt-3 flex flex-col gap-2">
          {SUMMARY.map((line) => (
            <li key={line} className="flex gap-2 text-sm text-neutral-300">
              <span className="text-purple-400">•</span>
              {line}
            </li>
          ))}
        </ul>
      </section>

      {SECTIONS.map(({ id, title, items }) => (
        <section
          key={id}
          id={id}
          className="flex scroll-mt-[calc(var(--navbar-h,56px)+24px)] flex-col gap-4"
        >
          <h2 className="text-xl font-medium text-white">{title}</h2>
          <ul className="flex flex-col gap-3">
            {items.map(([label, text]) => (
              <li key={text} className="text-[15px] leading-relaxed text-neutral-400">
                {label && <span className="font-medium text-neutral-200">{label}: </span>}
                {text}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="flex flex-col gap-3 border-t border-neutral-800 pt-8">
        <h2 className="text-xl font-medium text-white">Contact</h2>
        <p className="text-[15px] leading-relaxed text-neutral-400">
          Questions about your data? Email{" "}
          <a href={`mailto:${SITE.email}`} className="text-purple-400 hover:text-purple-300">
            {SITE.email}
          </a>{" "}
          or use the{" "}
          <Link to="/contact" className="text-purple-400 hover:text-purple-300">
            contact form
          </Link>
          .
        </p>
      </section>
    </article>
  </div>
);

export default Privacy;
