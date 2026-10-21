import MarkdownMessage from "@/features/ai-agent/components/MarkdownMessage";
import { challengeMarkdown } from "../../lib/richText";

/** Challenge copy rendered as markdown: inline code chips and fenced code blocks. */
export default function ChallengeText({ text, className }) {
  return <MarkdownMessage content={challengeMarkdown(text)} className={className} />;
}
