import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion as Motion, MotionConfig } from "motion/react";
import OptionCards from "./components/OptionCards";
import AccountForm from "./components/AccountForm";
import CompanyForm from "./components/CompanyForm";
import FormButtons from "./components/FormButtons";
import JoinStepper from "./components/JoinStepper";
import VerifyEmailStep from "./components/VerifyEmailStep";
import TrustResult from "./components/TrustResult";
import { signUpRecruiter } from "./api/hiringApi";
import useAuthStore from "../../stores/useAuthStore";
import PixelBackground from "../../components/home/PixelBackground";
import { SURFACE } from "../../components/ui/surface";
import {
  COMPANY_ROLES,
  HIRING_LOGIN_PATH,
  JOIN_STEPS,
  JOIN_TITLES,
  ORG_TYPES,
} from "../../../constants/hiring";

const ROLE_STEP = 1;
const EASE = [0.22, 1, 0.36, 1];

// /hiring/join: company or agency → role (companies only) → login → company →
// email code → the trust engine's verdict. The account is created on the
// company step; the code step then proves the work inbox.
const HiringJoinPage = () => {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [orgType, setOrgType] = useState(null);
  const [role, setRole] = useState(null);
  const [account, setAccount] = useState(null);
  const [result, setResult] = useState(null); // { level, reasons } once finished
  const [submitError, setSubmitError] = useState("");
  const login = useAuthStore((s) => s.login);
  const isAgency = orgType === "agency";

  // Agencies skip the role step, so the stepper shows three steps for them.
  const visibleSteps = isAgency ? JOIN_STEPS.filter((_, i) => i !== ROLE_STEP) : JOIN_STEPS;
  const visibleIndex = isAgency && step > ROLE_STEP ? step - 1 : step;

  const next = () => { setDir(1); setStep((s) => (s === 0 && isAgency ? 2 : s + 1)); };
  const back = () => { setDir(-1); setStep((s) => (s === 2 && isAgency ? 0 : s - 1)); };

  const createAccount = async (companyData) => {
    setSubmitError("");
    try {
      const data = await signUpRecruiter({
        orgType,
        ...(isAgency ? {} : { companyRole: role }),
        fullName: account.fullName,
        email: account.email,
        password: account.password,
        ...companyData,
      });
      login(data.accessToken);
      next();
    } catch (err) {
      setSubmitError(err.status === 409 ? "An account with this email already exists. Log in instead." : err.message);
    }
  };

  const heading = step === 3 && isAgency ? { ...JOIN_TITLES[3], title: "About your agency" } : JOIN_TITLES[step];

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate flex min-h-dvh items-start justify-center px-4 py-12 sm:py-16">
        <PixelBackground sideDensity={3} centerDensity={1} contentWidth={600} />
        <div className={`w-full max-w-[560px] overflow-hidden px-5 py-8 sm:px-8 sm:py-10 ${SURFACE}`}>
          {result ? (
            <TrustResult level={result.level} reasons={result.reasons} />
          ) : (
            <>
              <JoinStepper steps={visibleSteps} current={visibleIndex} />

              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <Motion.div
                  key={step}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -32 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <h1 className="text-xl font-semibold text-white">{heading.title}</h1>
                  <p className="mt-1 mb-6 text-sm text-neutral-400">{heading.hint}</p>

                  {step === 0 && (
                    <>
                      <OptionCards name="orgType" options={ORG_TYPES} value={orgType} onChange={setOrgType} sideBySide />
                      <div className="mt-6">
                        <FormButtons type="button" primary="Continue" disabled={!orgType} onPrimary={next} />
                      </div>
                    </>
                  )}
                  {step === ROLE_STEP && (
                    <>
                      <OptionCards name="role" options={COMPANY_ROLES} value={role} onChange={setRole} />
                      <div className="mt-6">
                        <FormButtons type="button" onBack={back} primary="Continue" disabled={!role} onPrimary={next} />
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <AccountForm defaults={account ?? undefined} onBack={back} onSubmit={(data) => { setAccount(data); next(); }} />
                  )}
                  {step === 3 && <CompanyForm orgType={orgType} onBack={back} onSubmit={createAccount} error={submitError} />}
                  {step === 4 && (
                    <VerifyEmailStep email={account?.email} onVerified={(company) => setResult(company.trust)} />
                  )}
                </Motion.div>
              </AnimatePresence>

              {step < 4 && <p className="mt-6 text-center text-[13px] text-neutral-500">
                Already have a hiring account?{" "}
                <Link to={HIRING_LOGIN_PATH} className="text-purple-500 hover:underline">Log in</Link>
              </p>}
            </>
          )}
        </div>
      </div>
    </MotionConfig>
  );
};

export default HiringJoinPage;
