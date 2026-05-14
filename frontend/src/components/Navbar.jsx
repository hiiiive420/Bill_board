import logoImg from "../assets/logo.webp";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
];

const serviceLinks = [
  { label: "All Billboards", to: "/services/billboards" },
  { label: "Media Formats", to: "/services/media-formats" },
  { label: "Campaign Activation", to: "/services/campaign-activation" },
];

export default function SignArtHeader() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { pathname } = useLocation();
  const isServicesActive = pathname.startsWith("/services");

  const getNavClassName = (to) => {
    const isActive = pathname === to;

    return [
      "whitespace-nowrap text-[clamp(.78rem,2.2vw,1.1rem)] font-semibold tracking-[1px] transition-colors sm:tracking-[1.5px]",
      isActive ? "text-[#7ec8f7]" : "text-white hover:text-[#7ec8f7]",
    ].join(" ");
  };

  return (
    <header className="bg-white px-4 pb-5 pt-6 sm:pb-7 sm:pt-8">
      <div className="mx-auto flex w-full max-w-[1324px] flex-col items-center gap-6">
        <Link to="/" className="flex items-center justify-center gap-2" aria-label="Sign Art home">
          <span
  className="leading-none text-[#1a5ba8]"
  style={{
    fontFamily: "'Arial Rounded MT Bold', sans-serif",
    fontSize: "clamp(2.25rem,8vw,4.8rem)",
    fontWeight: 900,
  }}
>
  SIGN
</span>
          <img
            src={logoImg}
            alt="Logo"
            className="h-[clamp(38px,6vw,62px)] w-auto object-contain"
          />
          <span
  className="leading-none text-[#1a5ba8]"
  style={{
    fontFamily: "'Arial Rounded MT Bold', sans-serif",
    fontSize: "clamp(2.25rem,8vw,4.8rem)",
    fontWeight: 900,
  }}
>
  RT
</span>
        </Link>

        <nav className="relative z-30 flex w-full max-w-[690px] flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full bg-[#1a3a4f] px-4 py-2 sm:gap-x-8 sm:px-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={getNavClassName(link.to)}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsServicesOpen((current) => !current)}
              className={[
                "inline-flex items-center gap-1 whitespace-nowrap text-[clamp(.78rem,2.2vw,1.1rem)] font-semibold tracking-[1px] transition-colors sm:tracking-[1.5px]",
                isServicesActive ? "text-[#7ec8f7]" : "text-white hover:text-[#7ec8f7]",
              ].join(" ")}
              aria-expanded={isServicesOpen}
              aria-haspopup="menu"
            >
              Services
              <span className={`text-[10px] transition-transform ${isServicesOpen ? "rotate-180" : ""}`}>
                v
              </span>
            </button>

            {isServicesOpen && (
              <div
                className="absolute left-1/2 top-[calc(100%+12px)] w-[220px] -translate-x-1/2 overflow-hidden rounded-[18px] border border-[#C9E4F3] bg-white p-2 shadow-[0_18px_36px_rgba(24,64,116,.18)]"
                role="menu"
              >
                {serviceLinks.map((service) => (
                  <Link
                    key={service.to}
                    to={service.to}
                    onClick={() => setIsServicesOpen(false)}
                    className={[
                      "block rounded-[12px] px-4 py-3 text-sm font-black transition hover:bg-[#EDF4F9] hover:text-[#2092D1]",
                      pathname === service.to ? "bg-[#EDF4F9] text-[#2092D1]" : "text-[#184074]",
                    ].join(" ")}
                    role="menuitem"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className={getNavClassName("/contact")}
          >
            Contact us
          </Link>
        </nav>
      </div>
    </header>
  );
}
