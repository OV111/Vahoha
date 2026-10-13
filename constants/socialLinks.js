import { Github, Linkedin, BookOpen } from "lucide-react";
import XIcon from "../src/components/icons/XIcon";

const SOCIAL_LINKS = [
  {
    key: "githubLink",
    label: "GitHub",
    icon: Github,
    hover: "hover:text-gray-900 dark:hover:text-gray-100",
  },
  {
    key: "linkedinLink",
    label: "LinkedIn",
    icon: Linkedin,
    hover: "hover:text-blue-600 dark:hover:text-blue-400",
  },
  {
    key: "twitterLink",
    label: "Twitter / X",
    icon: XIcon,
    hover: "hover:text-gray-900 dark:hover:text-gray-100",
  },
  {
    key: "mediumLink",
    label: "Medium",
    icon: BookOpen,
    hover: "hover:text-gray-900 dark:hover:text-gray-100",
  },
];

export default SOCIAL_LINKS;
