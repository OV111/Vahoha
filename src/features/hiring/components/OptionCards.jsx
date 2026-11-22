import { AnimatePresence, motion as Motion, MotionConfig } from "motion/react";
import { Check } from "lucide-react";

const SPRING = { type: "spring", stiffness: 420, damping: 30 };
const EASE = [0.22, 1, 0.36, 1];

// A radio group drawn as cards. `options` items: { id, Icon, title, body }.
// `sideBySide` puts two cards in a row from the sm breakpoint up.
// Motion: cards rise in one after another, lift on hover, and the chosen one
// glows while its icon pops and a check springs in. MotionConfig "user" turns
// it all off for people who ask their system to reduce motion.
const OptionCards = ({ name, options, value, onChange, sideBySide = false }) => (
  <MotionConfig reducedMotion="user">
    <div role="radiogroup" className={`grid gap-3 ${sideBySide ? "sm:grid-cols-2" : ""}`}>
      {options.map(({ id, Icon, title, body }, i) => {
        const selected = value === id;
        return (
          <Motion.label
            key={id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex cursor-pointer items-start gap-4 overflow-hidden rounded-2xl border p-4 transition-colors duration-200 has-focus-visible:ring-2 has-focus-visible:ring-purple-500/40 ${
              selected
                ? "border-purple-500 bg-purple-500/10 shadow-[0_0_0_1px_rgba(168,85,247,0.35),0_12px_32px_-12px_rgba(168,85,247,0.45)]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
            } ${sideBySide ? "sm:flex-col sm:gap-3 sm:p-5" : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={id}
              checked={selected}
              onChange={() => onChange(id)}
              className="sr-only"
            />

            <AnimatePresence>
              {selected && (
                <Motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              )}
            </AnimatePresence>

            <Motion.span
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                selected ? "bg-purple-500/20 text-purple-300" : "bg-white/[0.04] text-neutral-500"
              }`}
              animate={selected ? { scale: [1, 1.18, 1], rotate: [0, -6, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <Icon size={20} aria-hidden="true" />
            </Motion.span>

            <span className="relative flex-1">
              <span className="block font-medium text-white">{title}</span>
              <span className="mt-0.5 block text-sm text-neutral-400">{body}</span>
            </span>

            <AnimatePresence>
              {selected && (
                <Motion.span
                  key="check"
                  className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-white"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={SPRING}
                >
                  <Check size={14} strokeWidth={3} aria-hidden="true" />
                </Motion.span>
              )}
            </AnimatePresence>
          </Motion.label>
        );
      })}
    </div>
  </MotionConfig>
);

export default OptionCards;
