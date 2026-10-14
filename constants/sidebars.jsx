import {
  Bell,
  Bookmark,
  FilePlus,
  Link2,
  MessageSquare,
  PenLine,
  Settings,
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
        icon: icon(FilePlus),
        label: "Add Blog",
      },
      {
        to: "/my-profile/my-blogs",
        icon: icon(PenLine),
        label: "My Blogs",
      },
      {
        to: "/my-profile/chats",
        icon: icon(MessageSquare),
        label: "Chats",
      },
      {
        to: "/my-profile/favourites",
        icon: icon(Bookmark),
        label: "Favourites",
      },
    ],
  },
  {
    section: "Privacy",
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
  {
    section: "Security",
    items: [
      {
        to: "/my-profile/settings",
        icon: icon(Settings),
        label: "Settings",
      },
    ],
  },
];
