import { Link } from "react-router-dom";
import { SITE } from "../../../constants/site";

const linkClass = "text-purple-400 hover:text-purple-300";

/**
 * Layout shared by the Privacy Policy and the Terms of Service: a table of
 * contents (long legal pages are scanned, not read top to bottom), the
 * sections, and a contact block.
 *
 * `sections`: [{ id, title, items }]. An item is a string, or a
 * [label, text] pair where label may be null.
 * `intro` renders between the header and the first section.
 * `contactLead` starts the contact sentence ("Questions about these terms?").
 * `crossLink`: { to, label } for a "See also our …" link after it.
 */
const LegalPage = ({ title, effectiveDate, sections, intro, contactLead, crossLink }) => (
  <div className="mx-auto grid max-w-5xl gap-12 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[200px_1fr]">
    <nav aria-label="On this page" className="hidden lg:block">
      <div className="sticky top-[calc(var(--navbar-h,56px)+32px)] flex flex-col gap-2">
        <p className="mb-1 text-xs font-medium text-neutral-500">On this page</p>
        {sections.map(({ id, title: sectionTitle }) => (
          <a key={id} href={`#${id}`} className="text-sm text-neutral-400 transition hover:text-white">
            {sectionTitle}
          </a>
        ))}
      </div>
    </nav>

    <article className="flex max-w-2xl flex-col gap-12">
      <header className="flex flex-col gap-3">
        <h1
          className="text-3xl font-[450] tracking-tight text-white sm:text-4xl"
          style={{ fontFamily: '"Geist Variable", system-ui, sans-serif' }}
        >
          {title}
        </h1>
        <p className="text-sm text-neutral-500">Effective {effectiveDate}</p>
      </header>

      {intro}

      {sections.map(({ id, title: sectionTitle, items }) => (
        <section
          key={id}
          id={id}
          className="flex scroll-mt-[calc(var(--navbar-h,56px)+24px)] flex-col gap-4"
        >
          <h2 className="text-xl font-medium text-white">{sectionTitle}</h2>
          <ul className="flex flex-col gap-3">
            {items.map((item) => {
              const [label, text] = Array.isArray(item) ? item : [null, item];
              return (
                <li key={text} className="text-[15px] leading-relaxed text-neutral-400">
                  {label && <span className="font-medium text-neutral-200">{label}: </span>}
                  {text}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <section className="flex flex-col gap-3 border-t border-neutral-800 pt-8">
        <h2 className="text-xl font-medium text-white">Contact</h2>
        <p className="text-[15px] leading-relaxed text-neutral-400">
          {contactLead} Email{" "}
          <a href={`mailto:${SITE.email}`} className={linkClass}>
            {SITE.email}
          </a>{" "}
          or use the{" "}
          <Link to="/contact" className={linkClass}>
            contact form
          </Link>
          .
          {crossLink && (
            <>
              {" "}See also our{" "}
              <Link to={crossLink.to} className={linkClass}>
                {crossLink.label}
              </Link>
              .
            </>
          )}
        </p>
      </section>
    </article>
  </div>
);

export default LegalPage;
