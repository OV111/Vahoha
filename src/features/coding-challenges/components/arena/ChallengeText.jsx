import MarkdownMessage from "@/features/mentor/components/MarkdownMessage";
import { challengeMarkdown } from "../../lib/richText";

/** Challenge copy rendered as markdown: inline code chips and fenced code blocks. */
export default function ChallengeText({ text, className }) {
  return <MarkdownMessage content={challengeMarkdown(text)} className={className} />;
}
