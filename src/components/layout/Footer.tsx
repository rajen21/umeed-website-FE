import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { useSiteContent } from "../../contexts/SiteContentContext";

const footerNavLinkClass =
  "inline-block rounded-sm transition-colors hover:text-sidebar-primary hover:underline underline-offset-4 decoration-sidebar-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar";

const footerContactRowClass =
  "group -mx-2 flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-sidebar-accent/50";

const footerContactLinkClass =
  "inline transition-colors group-hover:text-sidebar-primary group-hover:underline underline-offset-2 decoration-sidebar-primary/80";

function InstagramBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="footer-ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="25%" stopColor="#FA7E1E" />
          <stop offset="50%" stopColor="#D62976" />
          <stop offset="75%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <path
        fill="url(#footer-ig-gradient)"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  );
}

function LinkedInBrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in new tab)`}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-all hover:scale-110 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const { getContent } = useSiteContent();

  const address = getContent("contact", "address", "Near NID, Paldi, Ahmedabad");
  const phone = getContent("contact", "phone", "+91 98765 43210");
  const email = getContent("contact", "email", "umeedchildfoundation@gmail.com");
  const footerText = getContent(
    "branding",
    "footer_text",
    "Empowering underprivileged children through education, healthcare, and community support."
  );

  const instagramUrl = getContent(
    "social",
    "instagram",
    "https://www.instagram.com/umeed_child_foundation?igsh=MWJsdzVrYWh0N2Vraw=="
  );
  const linkedinUrl = getContent(
    "social",
    "linkedin",
    "https://www.linkedin.com/in/umeed-child-foundation?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
  );

  const socialLinks = [
    { url: instagramUrl, label: "Instagram", icon: <InstagramBrandIcon className="h-5 w-5" /> },
    { url: linkedinUrl, label: "LinkedIn", icon: <LinkedInBrandIcon className="h-5 w-5" /> },
  ].filter((link) => link.url);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              to="/"
              className={`inline-block text-xl font-bold text-sidebar-primary transition-colors hover:text-sidebar-primary/80 md:text-2xl ${footerNavLinkClass}`}
            >
              UMEED
            </Link>
            <p className="mt-2 hidden text-sm leading-relaxed text-sidebar-foreground/70 md:mt-4 md:block">
              {footerText}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-4 md:mt-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sidebar-foreground/60">
                  Follow Us
                </p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map(({ url, icon, label }) => (
                    <SocialIconLink key={label} href={url} label={label}>
                      {icon}
                    </SocialIconLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-sidebar-primary md:mb-4 md:text-lg">
              Quick Links
            </h3>
            <ul className="space-y-1.5 text-sm md:space-y-2">
              <li>
                <Link to="/about" className={footerNavLinkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/programs" className={footerNavLinkClass}>
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/events" className={footerNavLinkClass}>
                  Events
                </Link>
              </li>
              <li>
                <Link to="/notices" className={footerNavLinkClass}>
                  Notices
                </Link>
              </li>
              <li>
                <Link to="/contact" className={footerNavLinkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-sidebar-primary md:mb-4 md:text-lg">
              Get Involved
            </h3>
            <ul className="space-y-1.5 text-sm md:space-y-2">
              <li>
                <Link to="/volunteer#application-form" className={footerNavLinkClass}>
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/contact" className={footerNavLinkClass}>
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className={footerNavLinkClass}>
                  Spread the Word
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="mb-2 text-sm font-semibold text-sidebar-primary md:mb-4 md:text-lg">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm md:space-y-3">
              <li className={footerContactRowClass}>
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-sidebar-primary transition-colors group-hover:text-sidebar-primary md:h-5 md:w-5"
                  aria-hidden="true"
                />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${footerContactLinkClass} inline-flex items-start gap-1`}
                >
                  <span>{address}</span>
                  <ExternalLink
                    className="mt-0.5 h-3 w-3 shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span className="sr-only"> (opens in Google Maps)</span>
                </a>
              </li>
              <li className={footerContactRowClass}>
                <Phone
                  className="h-4 w-4 shrink-0 text-sidebar-primary transition-colors group-hover:text-sidebar-primary md:h-5 md:w-5"
                  aria-hidden="true"
                />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className={footerContactLinkClass}>
                  {phone}
                </a>
              </li>
              <li className={footerContactRowClass}>
                <Mail
                  className="h-4 w-4 shrink-0 text-sidebar-primary transition-colors group-hover:text-sidebar-primary md:h-5 md:w-5"
                  aria-hidden="true"
                />
                <a href={`mailto:${email}`} className={footerContactLinkClass}>
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-sidebar-border pt-4 text-center text-xs text-sidebar-foreground/60 md:mt-8 md:pt-6 md:text-sm">
          <p>
            &copy; {new Date().getFullYear()} UMEED Child Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
