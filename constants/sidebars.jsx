import {
  Bell,
  Bookmark,
  Highlighter,
  Link2,
  MessageSquare,
  TrendingUp,
  User,
  UserX,
  Users,
} from "lucide-react";

// One icon size and stroke for every sidebar item, so the set reads as one.
const icon = (Icon) => <Icon size={20} strokeWidth={1.75} aria-hidden="true" />;

export const sidebarArr = [
  {
    section: "General",
    items: [
      {
        to: "/my-profile",
        icon: icon(User),
        label: "Profile",
        end: true,
      },
      {
        to: "/progress",
        icon: icon(TrendingUp),
        label: "Progress",
      },
      {
        to: "/my-profile/followers",
        activePaths: ["/my-profile/following"],
        icon: icon(Users),
        label: "Followers",
      },
      {
        to: "/my-profile/notifications",
        icon: icon(Bell),
        label: "Notifications",
      },
    ],
  },
  {
    section: "Content",
    items: [
      {
        to: "/my-profile/add-blog",
        activePaths: ["/my-profile/add-blog"],
        icon: icon(Highlighter),
        label: "Add Blog",
      },
      {
        to: "/my-profile/chats",
        icon: icon(MessageSquare),
        label: "Chats",
      },
      {
        to: "/my-profile/favorites",
        icon: icon(Bookmark),
        label: "Favorites",
      },
    ],
  },
  {
    section: "Account",
    items: [
      {
        to: "/my-profile/connected-accounts",
        icon: icon(Link2),
        label: "Connected Accounts",
      },
      {
        to: "/my-profile/blocked",
        icon: icon(UserX),
        label: "Blocked Users",
      },
    ],
  },
];
