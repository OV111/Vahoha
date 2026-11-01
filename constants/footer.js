import { Github, Instagram, Mail } from "lucide-react";
import XLogo from "../src/components/ui/XLogo";
import { SITE } from "./site";
import { CATEGORY_OPTIONS, categoryHref } from "./categories";

// Footer link columns and social icons (rendered by src/layouts/Footer.jsx).

// Guests see the same features as members: a protected page sends them to
// /get-started, which works as a sign-up funnel. Only account pages (progress,
// billing) are member-only; guests get Foundations and Pricing in their place.
const PRODUCT_LINKS_SHARED = [
  { title: "Roadmaps", to: "/roadmaps" },
  { title: "Challenges", to: "/coding-challenges" },
  { title: "Labs", to: "/labs" },
  { title: "Build Team", to: "/team" },
  { title: "Capstone", to: "/capstone" },
  { title: "Project Map", to: "/project-map" },
];
export const PRODUCT_LINKS_GUEST = [
  ...PRODUCT_LINKS_SHARED,
  { title: "Pricing", to: "/pricing" },
];
export const PRODUCT_LINKS_AUTH = [
  ...PRODUCT_LINKS_SHARED,
  { title: "My Progress", to: "/progress" },
  { title: "Pricing", to: "/pricing" },
  { title: "Billing", to: "/billing" },
];
export const AI_LINKS = [
  { title: "Foundations", to: "/labs/foundations" },
  { title: "AI Mentor", to: "/ai-agent" },
  { title: "Explain it back (soon)", to: "/voice-review" },
];
export const COMPANY_LINKS = [
  { title: "About", to: "/about" },
  { title: "Blog", to: "/blogs" },
  { title: "Contact", to: "/contact" },
  { title: "Privacy Policy", to: "/privacy" },
  { title: "Terms of Service", to: "/terms" },
];
export const CATEGORY_LINKS = CATEGORY_OPTIONS.map((category) => ({
  title: category.title,
  to: categoryHref(category),
}));

export const FOOTER_SOCIAL_LINKS = [
  { label: "Vahoha on X", href: SITE.socials.x.href, Icon: XLogo, size: 15 },
  {
    label: "Vahoha on Instagram",
    href: SITE.socials.instagram.href,
    Icon: Instagram,
    size: 16,
  },
  {
    label: "Vahoha on GitHub",
    href: SITE.socials.github.href,
    Icon: Github,
    size: 16,
  },
  { label: "Email Vahoha", href: `mailto:${SITE.email}`, Icon: Mail, size: 16 },
];
