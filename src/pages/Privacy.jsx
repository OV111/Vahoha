import LegalPage from "../components/legal/LegalPage";
import { PRIVACY_EFFECTIVE_DATE, PRIVACY_SECTIONS, PRIVACY_SUMMARY } from "../../constants/legal";

const Summary = () => (
  <section className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
    <h2 className="text-sm font-medium text-white">The short version</h2>
    <ul className="mt-3 flex flex-col gap-2">
      {PRIVACY_SUMMARY.map((line) => (
        <li key={line} className="flex gap-2 text-sm text-neutral-300">
          <span className="text-purple-400">•</span>
          {line}
        </li>
      ))}
    </ul>
  </section>
);

const Privacy = () => (
  <LegalPage
    title="Privacy Policy"
    effectiveDate={PRIVACY_EFFECTIVE_DATE}
    sections={PRIVACY_SECTIONS}
    intro={<Summary />}
    contactLead="Questions about your data?"
  />
);

export default Privacy;
