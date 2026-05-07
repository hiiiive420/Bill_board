import logoImg from "../assets/logo.jpeg";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Contact us", to: "/contact" },
];

export default function SignArtHeader() {
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

        <nav className="flex w-full max-w-[690px] flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full bg-[#1a3a4f] px-4 py-2 sm:gap-x-8 sm:px-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="whitespace-nowrap text-[clamp(.78rem,2.2vw,1.1rem)] font-semibold tracking-[1px] text-white transition-colors hover:text-[#7ec8f7] sm:tracking-[1.5px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
