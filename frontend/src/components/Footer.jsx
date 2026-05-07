import { useNavigate } from "react-router-dom";

const SocialIcon = ({ type }) => {
  const common = {
    className: "h-5 w-5",
    fill: "currentColor",
    "aria-hidden": "true",
    viewBox: "0 0 24 24",
  };

  if (type === "facebook") {
    return (
      <svg {...common}>
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
      </svg>
    );
  }

  if (type === "x") {
    return (
      <svg {...common}>
        <path d="M17.53 3h3.08l-6.73 7.69L21.8 21h-6.2l-4.86-6.35L5.18 21H2.1l7.2-8.23L1.7 3h6.36l4.39 5.81L17.53 3Zm-1.08 16.18h1.7L7.13 4.73H5.3l11.15 14.45Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "whatsapp") {
  return (
    <svg {...common} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.48A11.82 11.82 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.16 1.6 5.98L0 24l6.3-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.46-4.44 9.9-9.9 9.9Zm5.43-7.42c-.3-.15-1.77-.87-2.04-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.48-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.52 0 1.48 1.08 2.92 1.23 3.12.15.2 2.13 3.26 5.16 4.57.72.31 1.29.5 1.73.64.73.23 1.4.2 1.93.12.59-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
     );
  }

  return (
    <svg {...common}>
      <path d="M6.94 8.98H3.78V21h3.16V8.98ZM5.36 3C4.34 3 3.5 3.84 3.5 4.86s.84 1.86 1.86 1.86 1.86-.84 1.86-1.86S6.38 3 5.36 3ZM20.5 14.34c0-3.23-1.72-5.63-4.67-5.63-1.36 0-2.34.75-2.75 1.46h-.04V8.98h-3.03V21h3.16v-5.95c0-1.57.3-3.08 2.24-3.08 1.9 0 1.93 1.78 1.93 3.18V21h3.16v-6.66Z" />
    </svg>
  );
};

export default function FooterSection() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-white font-sans">
      {/* TOP SECTION */}
      <div className="flex min-h-[420px] flex-col items-center bg-[#2092D1]/30 px-6 pt-12 text-center sm:min-h-[560px] sm:pt-16 lg:min-h-[610px]">
        <h2 className="mb-5 text-[clamp(2rem,7vw,5.125rem)] font-black leading-[1.05] text-[#184074]">
          Ready To Be Seen?
        </h2>

        <button
          type="button"
          onClick={() => goTo("/#billboards")}
          className="rounded-full bg-gradient-to-b from-[#2a5298] to-[#1a3a6e] px-8 py-3 text-[clamp(.9rem,1.5vw,1.25rem)] font-bold text-white shadow-[0_4px_18px_rgba(24,64,116,.38)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(24,64,116,.5)] sm:px-12"
        >
          Book a Billboard
        </button>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex min-h-[280px] items-end justify-center bg-[#205DAD] px-6 pb-8 pt-32 sm:min-h-[390px] sm:pb-11 sm:pt-44 lg:min-h-[560px] lg:pb-10 lg:pt-[390px]">
        <div className="text-center">
          <p className="mb-1 text-[clamp(.85rem,1.7vw,1.5rem)] font-black leading-none text-white/80">
            Design and Developed by
          </p>

          <p className="m-0 text-[clamp(1rem,1.9vw,1.625rem)] font-black leading-none text-white">
            HIIIIVE
          </p>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="pointer-events-none absolute inset-x-0 top-[34%] z-10 px-[clamp(16px,3.9vw,56px)] sm:top-[36%] lg:top-[35%]">
        <div className="pointer-events-auto mx-auto flex h-[clamp(260px,40vw,590px)] max-w-[1328px] items-center justify-center overflow-hidden rounded-[clamp(42px,12vw,174px)] border-[6px] border-white bg-[#205DAD] px-6 py-6 text-center sm:px-10 sm:py-8">
          <div className="flex w-full max-w-[820px] flex-col items-center">
            
            {/* LOGO */}
            <button
              type="button"
              onClick={() => goTo("/")}
              className="text-[clamp(2rem,5vw,3.75rem)] font-black leading-none text-white transition hover:text-[#9ED8F7]"style={{
    fontFamily: "'Arial Rounded MT Bold', sans-serif",
    fontSize: "clamp(2.25rem,8vw,4.8rem)",
    fontWeight: 900,
  }}
            >
              SIGN <span className="text-[#9ED8F7]"style={{
    fontFamily: "'Arial Rounded MT Bold', sans-serif",
    fontSize: "clamp(2.25rem,8vw,4.8rem)",
    fontWeight: 900,
  }}>ART</span>
            </button>

            {/* NAVIGATION */}
            <nav className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[clamp(.85rem,2.6vw,1.25rem)] font-black text-white sm:mt-8 sm:gap-x-8 lg:gap-x-10">
              <button
                type="button"
                onClick={() => goTo("/")}
                className="hover:text-[#9ED8F7]"
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => goTo("/services#services-top")}
                className="hover:text-[#9ED8F7]"
              >
                Services
              </button>

              <button
                type="button"
                onClick={() => goTo("/about#about-top")}
                className="hover:text-[#9ED8F7]"
              >
                About Us
              </button>

              <button
                type="button"
                onClick={() => goTo("/contact#contact-top")}
                className="hover:text-[#9ED8F7]"
              >
                Contact Us
              </button>

              <a
                href="tel:+94775788907"
                className="hover:text-[#9ED8F7]"
              >
                Call Us
              </a>
            </nav>

            {/* DESCRIPTION */}
            <p className="mt-5 max-w-[720px] text-[clamp(1rem,2.5vw,1.38rem)] font-bold leading-[1.45] text-white  sm:mt-8">
              Billboard booking, outdoor campaign support, and high-visibility
              placements across Sri Lanka.
            </p>

            {/* CTA BUTTON */}
            <button
              type="button"
              onClick={() => goTo("/contact#campaign-inquiry")}
              className="mt-5 rounded-full bg-white px-7 py-3 text-sm font-black text-[#205DAD] shadow-[0_8px_20px_rgba(0,0,0,.16)] transition hover:-translate-y-0.5 hover:bg-[#9ED8F7] sm:mt-6 sm:px-9 sm:text-base"
            >
              Get a Quote
            </button>

            {/* SOCIAL ICONS */}
            <div className="mt-5 flex items-center justify-center gap-3 text-white/80 sm:mt-6 sm:gap-5">
              {[
                ["facebook", "https://www.facebook.com/Signartads/"],
               // ["x", "https://x.com/"],
               //["instagram", "https://www.instagram.com/"],
               // ["linkedin", "https://www.linkedin.com/"],
                ["whatsapp", "https://api.whatsapp.com/send?phone=94775788907"],
              ].map(([type, href]) => (
                <a
                  key={type}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#205DAD] sm:h-12 sm:w-12"
                >
                  <SocialIcon type={type} />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, icon, children }) {
  return (
    <div>
      <h3 className="mb-6 flex items-center gap-3 text-xl font-black uppercase tracking-[1px] text-[#BDE8FA]">
        <SectionIcon type={icon} />
        {title}
      </h3>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}

function FooterButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-fit text-left text-lg font-black text-white transition hover:text-[#9ED8F7]"
    >
      {children}
    </button>
  );
}
