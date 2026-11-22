import { Github, Instagram, Mail } from "lucide-react";
import XLogo from "../src/components/ui/XLogo";
import { SITE } from "./site";
import { CATEGORY_OPTIONS, categoryHref } from "./categories";
import { FEATURES } from "./features";

// Footer link columns and social icons (rendered by src/layouts/Footer.jsx).

// Everyone sees the same links. Access is decided where the link lands: a guest
// on a protected page goes to /get-started, a free user on a Pro page goes to
// /pricing (RequirePro), and the server checks the plan on every request.
export const PRODUCT_LINKS = [
  { title: "Roadmaps", to: "/roadmaps" },
  { title: "Challenges", to: "/coding-challenges" },
  { title: "Labs", to: "/labs" },
  { title: "Dev Library", to: "/libs" },
  { title: "Build Team", to: "/team" },
  { title: "Capstone", to: "/capstone" },
  { title: "Project Map", to: "/project-map" },
  { title: "Pricing", to: "/pricing" },
];
export const AI_LINKS = [
  { title: "Foundations", to: "/labs/foundations" },
  { title: "Mentor", to: "/mentor" },
];
export const COMPANY_LINKS = [
  { title: "About", to: "/about" },
  ...(FEATURES.hiring ? [{ title: "For companies", to: "/hiring" }] : []),
  { title: "Blog", to: "/blogs" },
  { title: "Contact", to: "/contact" },
  { title: "Privacy Policy", to: "/privacy" },
  { title: "Terms of Service", to: "/terms" },
  { title: "Refund Policy", to: "/terms#billing" },
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
