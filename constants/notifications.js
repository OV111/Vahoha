import { UserPlus, MessageCircle, Heart, FileText, MessageSquare, Inbox, GraduationCap } from "lucide-react";

export const FILTERS = ["All", "Unread", "Follows", "Messages", "Comments", "Likes", "Posts"];

// `label` is a string shown after the sender's name, or a function of the
// notification. `system` types come from Vahoha itself and have no sender.
export const TYPE_META = {
  follow: {
    icon: UserPlus,
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-950/40",
    label: "followed you",
  },
  new_message: {
    icon: MessageCircle,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-950/40",
    label: "sent you a message",
  },
  message_request: {
    icon: Inbox,
    color: "text-sky-500",
    bg: "bg-sky-100 dark:bg-sky-950/40",
    label: "sent you a message request",
  },
  post_comment: {
    icon: MessageSquare,
    color: "text-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-950/40",
    label: "commented on your post",
  },
  capstone_review: {
    icon: GraduationCap,
    color: "text-amber-500",
    bg: "bg-amber-100 dark:bg-amber-950/40",
    system: true,
    label: (n) =>
      n.meta?.passed
        ? "Your capstone review passed. Your defense is next."
        : "Your capstone review is ready.",
  },
  post_like: {
    icon: Heart,
    color: "text-pink-500",
    bg: "bg-pink-100 dark:bg-pink-950/40",
    label: "liked your post",
  },
  new_post: {
    icon: FileText,
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-100 dark:bg-fuchsia-950/40",
    label: "published a new post",
  },
};

export const FILTER_TYPE_MAP = {
  Follows: ["follow"],
  Messages: ["new_message", "message_request"],
  Comments: ["post_comment"],
  Likes: ["post_like"],
  Posts: ["new_post"],
};
