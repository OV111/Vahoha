import LegalPage from "../components/legal/LegalPage";
import { TERMS_EFFECTIVE_DATE, TERMS_SECTIONS } from "../../constants/legal";

const Terms = () => (
  <LegalPage
    title="Terms of Service"
    effectiveDate={TERMS_EFFECTIVE_DATE}
    sections={TERMS_SECTIONS}
    contactLead="Questions about these terms?"
    crossLink={{ to: "/privacy", label: "Privacy Policy" }}
  />
);

export default Terms;
