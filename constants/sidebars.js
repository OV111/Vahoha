import {
  User,
  Users,
  Bell,
  PenLine,
  FileText,
  MessageCircle,
  Bookmark,
  Link as LinkIcon,
  UserX,
  Settings,
} from "lucide-react";

export const sidebarArr = [
  {
    section: "General",
    items: [
      { to: "/my-profile", icon: User, label: "Profile", end: true },
      {
        to: "/my-profile/followers",
        activePaths: ["/my-profile/following"],
        icon: Users,
        label: "Followers",
      },
      {
        to: "/my-profile/notifications",
        icon: Bell,
        label: "Notifications",
      },
    ],
  },
  {
    section: "Content",
    items: [
      { to: "/my-profile/add-blog", icon: PenLine, label: "Add Blog" },
      { to: "/my-profile/my-blogs", icon: FileText, label: "My Blogs" },
      { to: "/my-profile/chats", icon: MessageCircle, label: "Chats" },
      {
        to: "/my-profile/favourites",
        icon: Bookmark,
        label: "Favourites",
      },
    ],
  },
  {
    section: "Privacy",
    items: [
      {
        to: "/my-profile/connected-accounts",
        icon: LinkIcon,
        label: "Connected Accounts",
      },
      { to: "/my-profile/blocked", icon: UserX, label: "Blocked Users" },
    ],
  },
  {
    section: "Security",
    items: [
      {
        to: "/my-profile/settings",
        icon: Settings,
        label: "Settings",
      },
    ],
  },
];
