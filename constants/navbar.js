import {
  User,
  Settings as SettingsIcon,
  Bell,
  Bookmark,
  CreditCard,
  Map,
  Library,
  Newspaper,
  Code2,
  GraduationCap,
  Bot,
  Rocket,
  Users,
  TrendingUp,
  UserSearch,
} from "lucide-react";
import { CATEGORY_OPTIONS, categoryHref } from "./categories";
import { FEATURES } from "./features";

// Career-track pages, shared by the Learn menu and the guests' Tracks menu.
export const TRACK_LINKS = CATEGORY_OPTIONS.map((category) => ({
  label: category.title,
  to: categoryHref(category),
}));

// Paths are absolute on purpose: a relative `to` resolves against the route
// tree, so the same link would point somewhere else if the navbar ever
// rendered under a nested route.

// Logged-in navigation, grouped by what the user wants to do.
// `to` on a group is where clicking the label goes; hovering shows `items`.
// `showTracks` adds the career-track list as a second column (Learn only).
// `public` marks what a guest can open; everything else is locked for guests.
// `match` (optional) is the path that makes an item active when its `to` is
// shared with another item (see findActiveNavPath).
export const NAV_GROUPS_AUTH = [
  {
    label: "Learn",
    to: "/roadmaps",
    public: true,
    showTracks: true,
    items: [
      { label: "Roadmaps", to: "/roadmaps", icon: Map, description: "Step-by-step paths to job-ready", public: true },
      { label: "Code Library", to: "/libs", icon: Library, description: "Books, docs, guides and sheets" },
      { label: "Blog", to: "/blogs", icon: Newspaper, description: "Posts from the community" },
    ],
  },
  {
    label: "Practice",
    to: "/coding-challenges",
    items: [
      { label: "Challenges", to: "/coding-challenges", icon: Code2, description: "Graded problems in the browser" },
      { label: "Exams", to: "/roadmaps", match: "/roadmaps/exam", icon: GraduationCap, description: "Pass a layer to unlock the next", public: true },
      { label: "Mentor", to: "/ai-agent", icon: Bot, description: "Get unstuck with a mentor that knows your progress" },
    ],
  },
  {
    label: "Build",
    to: "/capstone",
    items: [
      { label: "Capstone", to: "/capstone", icon: Rocket, description: "Ship a real project for your track" },
      { label: "Team", to: "/team", icon: Users, description: "Merge PRs with a team, earn public evidence" },
      { label: "Progress", to: "/progress", icon: TrendingUp, description: "Your XP, streaks and mastery" },
      // For recruiters: the rated, filterable list of developers who opted in. Closed until FEATURES.candidates is on.
      ...(FEATURES.candidates
        ? [{ label: "Candidates", to: "/candidates", icon: UserSearch, description: "Rated developers who chose to be found" }]
        : []),
    ],
  },
];

// Guests see the SAME menus as members, so nothing moves after signup and the
// whole product is visible up front. Protected items stay listed but locked:
// they go to signup instead of bouncing off the login wall. A group whose own
// page is protected loses its label link and only opens its menu.
export const NAV_GROUPS_GUEST = NAV_GROUPS_AUTH.map((group) => ({
  ...group,
  to: group.public ? group.to : undefined,
  items: group.items.map((item) =>
    item.public ? item : { ...item, to: "/get-started", locked: true },
  ),
}));

// Flat links after the menus, guests only.
export const NAV_LINKS_GUEST = [{ label: "Pricing", to: "/pricing" }];

// Personal pages only. Product pages live in NAV_GROUPS_AUTH, so nothing
// is listed twice.
export const AVATAR_MENU_ITEMS = [
  { label: "My Profile", to: "/my-profile", icon: User },
  { label: "Notifications", to: "/my-profile/notifications", icon: Bell },
  { label: "Favourites", to: "/my-profile/favourites", icon: Bookmark },
  { label: "Billing", to: "/billing", icon: CreditCard },
  { label: "Settings", to: "/my-profile/settings", icon: SettingsIcon },
];
