import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getMessagePolicy, setMessagePolicy } from "../chat/chatControlsApi";

const OPTIONS = [
  { value: "everyone", label: "Everyone", hint: "Anyone can send you one message request." },
  { value: "followers", label: "People I follow back", hint: "Only people who follow you can send a request." },
  { value: "nobody", label: "Nobody", hint: "Only mutual followers can message you." },
];

/**
 * Who may send me a message request. Mutual followers can always chat; this only
 * controls strangers. It saves on click (no Save bar), because it is a single
 * choice and the server is the source of truth.
 */
export default function MessagePolicySetting() {
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    getMessagePolicy()
      .then((res) => setPolicy(res.policy))
      .catch(() => setPolicy("everyone"));
  }, []);

  const choose = async (next) => {
    const previous = policy;
    setPolicy(next); // optimistic; rolled back if the save fails
    try {
      await setMessagePolicy(next);
      toast.success("Message settings saved");
    } catch (err) {
      setPolicy(previous);
      toast.error(err.message || "Couldn't save");
    }
  };

  return (
    <fieldset className="grid gap-3 max-w-[880px]" disabled={policy === null}>
      <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Who can send you a message request
      </legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer rounded-lg border p-3 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-purple-500 ${
              policy === option.value
                ? "border-purple-500 bg-purple-500/10"
                : "border-gray-300 hover:border-gray-400 dark:border-white/10 dark:hover:border-white/20"
            }`}
          >
            <input
              type="radio"
              name="messagePolicy"
              value={option.value}
              checked={policy === option.value}
              onChange={() => choose(option.value)}
              className="sr-only"
            />
            <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              {option.label}
            </span>
            <span className="mt-1 block text-xs text-gray-500 dark:text-[#8A8A93]">{option.hint}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
