import { C } from "../../lib/arenaTheme";

export default function SectionHead({ children }) {
  return (
    <h2 className="mb-2 text-[14px] font-semibold" style={{ color: C.text }}>
      {children}
    </h2>
  );
}
