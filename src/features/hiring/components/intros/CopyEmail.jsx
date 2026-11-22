import { useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Mail } from "lucide-react";

// The contact email an accepted intro unlocks, highlighted, with a copy button.
const CopyEmail = ({ email, note }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Select the address instead.");
    }
  };

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.07] px-3 py-2.5">
      <div className="flex items-center gap-2">
        <Mail size={15} className="shrink-0 text-emerald-300" aria-hidden="true" />
        <a href={`mailto:${email}`} className="min-w-0 flex-1 truncate text-sm font-medium text-white hover:text-emerald-200">
          {email}
        </a>
        <button type="button" onClick={copy} aria-label={`Copy ${email}`}
          className="shrink-0 rounded-md p-1.5 text-emerald-300 hover:bg-emerald-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400">
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        </button>
      </div>
      {note && <p className="mt-1 text-xs text-emerald-200/70">{note}</p>}
    </div>
  );
};

export default CopyEmail;
