import { Link, useLocation } from "react-router-dom";
import Wordmark from "@/layouts/Wordmark";
import {
  AI_LINKS,
  CATEGORY_LINKS,
  COMPANY_LINKS,
  FOOTER_SOCIAL_LINKS,
  PRODUCT_LINKS,
} from "@/constants/footer";

const headingClass ="mb-2 text-sm font-medium text-[#F7F7F8] sm:mb-3";

const iconClass ="group flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 transition duration-200 hover:border-white/40 hover:bg-white/20";

const isLinkActive = (to, location, exact) => {
  const [path, query] = to.split("?");
  const pathMatches = exact
    ? location.pathname === path
    : location.pathname === path || location.pathname.startsWith(`${path}/`);
  if (!pathMatches) return false;
  if (query) {
    const wanted = new URLSearchParams(query);
    const current = new URLSearchParams(location.search);
    return [...wanted].every(([k, v]) => current.get(k) === v);
  }
  return exact ? !location.search : true;
};

const LinkColumn = ({ title, links, className = "", twoColumns = false, mobileLimit = Infinity, exact = false }) => {
  const location = useLocation();

  return (
    <nav aria-label={title} className={`flex flex-col gap-0 sm:gap-1 ${className}`}>
      <h2 className={headingClass}>{title}</h2>
      <div
        className={
          twoColumns ? "grid grid-cols-2 gap-x-6 sm:flex sm:flex-col sm:gap-1" : "flex flex-col sm:gap-1"
        }
      >
        {links.map(({ title, to }, index) => {
          const active = isLinkActive(to, location, exact);
          return (
            <Link
              key={title}
              to={to}
              aria-current={active ? "page" : undefined}
              className={`items-center py-1 text-sm transition hover:text-purple-500 sm:py-0 ${
                index >= mobileLimit ? "hidden sm:flex" : "flex"
              } ${active ? "text-purple-500" : "text-[#A1A0AB]"}`}
            >
              {title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="relative z-1 mt-16">
    <div className="px-5 pt-12 sm:px-8 sm:pt-16 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-10 lg:grid-cols-[1.8fr_1fr_1.3fr_1fr_1fr]">
        <div className="col-span-2 flex flex-col items-start sm:col-span-4 lg:col-span-1">
          <Wordmark className="mb-4" />
          <p className="mb-6 max-w-sm text-sm leading-6 text-[#A1A0AB]">
            Learn it, prove it, get seen for it.
          </p>

          <h2 className={headingClass}>Follow us</h2>
          <div className="flex items-center gap-3">
            {FOOTER_SOCIAL_LINKS.map(({ label, href, Icon, size }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className={iconClass}
              >
                <Icon
                  size={size}
                  className="text-[#A1A0AB] transition group-hover:text-white"
                />
              </a>
            ))}
          </div>
        </div>

        <LinkColumn
          title="Topics"
          links={CATEGORY_LINKS}
          twoColumns
          exact
          mobileLimit={6}
          className="col-span-2 sm:col-span-1"
        />
        <LinkColumn title="In the AI era" links={AI_LINKS} className="max-sm:order-1" />
        <LinkColumn
          title="Product"
          links={PRODUCT_LINKS}
          twoColumns
          className="col-span-2 sm:col-span-1"
        />
        <LinkColumn title="Company" links={COMPANY_LINKS} className="max-sm:order-1" />
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center text-sm text-[#A1A0AB] sm:mt-12">
        <p>© {new Date().getFullYear()} Vahoha. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
