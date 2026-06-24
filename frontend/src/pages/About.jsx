import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CountUpValue from "../components/CountUpValue";
import { Link } from "react-router-dom";
import ad1 from "../assets/Streetlevel attention.webp";
import ad2 from "../assets/champaignintelligence.webp";
import ad3 from "../assets/launchreadydesign.webp";
import ad4 from "../assets/ad1.webp";
import ad5 from "../assets/ad2.webp";

const stats = [
  { value: "24/7", label: "Visibility", delay: "0ms" },
  { value: "100+", label: "Campaign ideas", delay: "140ms" },
  { value: "3x", label: "Stronger recall", delay: "280ms" },
];

// eslint-disable-next-line no-unused-vars
const values = [
  {
    title: "Location-Led Planning",
    text: "We help brands choose outdoor spaces that match the audience, movement, and moment.",
  },
  {
    title: "Creative That Reads Fast",
    text: "Billboard messages need instant clarity, so every layout is built for quick attention.",
  },
  {
    title: "Campaigns With Momentum",
    text: "From booking to launch, we keep the process simple, visible, and ready to scale.",
  },
];

const steps = ["Discover", "Design", "Display", "Measure"];

const missionVision = [
  {
    label: "Mission",
    title: "Make outdoor advertising simple, visible, and campaign-ready.",
    text: "We help brands find the right billboard locations, prepare clear creative, and launch outdoor campaigns with confidence.",
  },
  {
    label: "Vision",
    title: "Become Sri Lanka's most trusted outdoor media partner.",
    text: "We want every brand, from local businesses to national campaigns, to access high-impact outdoor visibility with better planning and clearer service.",
  },
];

const moments = [
  {
    image: ad1,
    title: "Street-Level Attention",
    text: "Creative built for people moving fast through high-traffic places.",
  },
  {
    image: ad2,
    title: "Campaign Intelligence",
    text: "Simple planning that keeps locations, timing, and message aligned.",
  },
  {
    image: ad3,
    title: "Launch Ready Design",
    text: "Visuals shaped for quick recall, strong contrast, and clear action.",
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>
          About SignArt | Billboard & Hoarding Advertising Company Sri Lanka
        </title>

        <meta
          name="description"
          content="Learn about SignArt, a Sri Lankan outdoor advertising company specializing in billboard advertising, hoarding campaigns, media placement, and islandwide brand visibility solutions."
        />

        <meta
          name="keywords"
          content="about signart, billboard advertising company sri lanka, hoarding advertising sri lanka, outdoor advertising company sri lanka, media placement sri lanka"
        />

        <link
          rel="canonical"
          href="https://signart.lk/about"
        />
      </Helmet>

      <div className="min-h-screen overflow-hidden bg-white text-[#184074]">
      <Navbar />

      <main>
        <section id="about-top" className="relative scroll-mt-6 px-4 pb-16 pt-8 sm:pb-20 lg:pt-12">
          <div className="mx-auto grid w-full max-w-[1324px] items-center gap-10 lg:grid-cols-[.92fr_1.08fr]">
            <div className="relative z-10 text-center lg:text-left">
              <p className="mb-3 text-sm font-black uppercase tracking-[8px] text-[#2092D1] sm:text-base">
                Outdoor Advertising & Hoarding Experts
              </p>
              <h1 className="text-[clamp(3.2rem,9vw,6.8rem)] font-black leading-[.9] text-[#184074]">
                We Make Brands Impossible To Miss
              </h1>
              <p className="mx-auto mt-6 max-w-[620px] text-base font-semibold leading-8 text-[#52677d] lg:mx-0">
                SignArt is a Sri Lankan outdoor advertising company helping brands reach audiences through billboard advertising, hoarding campaigns, media placement, and islandwide outdoor advertising solutions.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <Link
                  to="/#billboards"
                  className="rounded-full bg-[#184074] px-7 py-3 text-sm font-black text-white shadow-[0_12px_28px_rgba(24,64,116,.22)] transition hover:-translate-y-1"
                >
                  Explore Billboards
                </Link>
                <Link
                  to="/contact#campaign-inquiry"
                  className="rounded-full border-2 border-[#2092D1] px-7 py-3 text-sm font-black text-[#184074] transition hover:-translate-y-1 hover:bg-[#2092D1]/10"
                >
                  Start a Campaign
                </Link>
              </div>
            </div>

            <div className="relative min-h-[420px] sm:min-h-[520px] lg:min-h-[610px]">
              <div className="about-grid absolute inset-0 rounded-[36px] bg-[#EEF8FD]" />

              <div className="about-float absolute left-1/2 top-[48%] h-[330px] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-[32px] bg-[#184074] p-4 shadow-[0_30px_70px_rgba(24,64,116,.2)] sm:h-[410px] sm:p-5">
                <div className="relative h-full overflow-hidden rounded-[24px] bg-white">
                  <div className="absolute inset-x-0 top-0 flex h-12 items-center gap-2 bg-[#184074] px-5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF8A13]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#2092D1]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/75" />
                    <span className="ml-auto text-xs font-black uppercase tracking-[3px] text-white/80">
                      Live OOH Plan
                    </span>
                  </div>

                  <div className="absolute left-6 top-20 w-[46%] rotate-[-5deg] overflow-hidden rounded-[8px] border-[6px] border-white bg-[#D9D9D9] shadow-[0_18px_35px_rgba(24,64,116,.2)]">
                    <img src={ad4} alt="Billboard advertising campaign in Colombo Sri Lanka" className="h-[150px] w-full object-cover sm:h-[190px]" />
                    <div className="bg-[#184074] px-4 py-3 text-white">
                      <p className="text-xl font-black leading-none">City Launch</p>
                      <p className="mt-1 text-xs font-bold text-white/70">Colombo / Digital</p>
                    </div>
                  </div>

                  <div className="absolute right-5 top-24 w-[43%] rotate-[5deg] overflow-hidden rounded-[8px] border-[6px] border-white bg-[#D9D9D9] shadow-[0_18px_35px_rgba(24,64,116,.18)]">
                    <img src={ad5} alt="Outdoor advertising audience reach campaign" className="h-[135px] w-full object-cover sm:h-[175px]" />
                    <div className="bg-[#2092D1] px-4 py-3 text-white">
                      <p className="text-xl font-black leading-none">High Recall</p>
                      <p className="mt-1 text-xs font-bold text-white/75">Peak-hour visibility</p>
                    </div>
                  </div>

                  <svg className="absolute bottom-20 left-8 h-24 w-[82%]" viewBox="0 0 420 120" fill="none" aria-hidden="true">
                    <path
                      d="M12 92 C92 12 170 126 238 48 C300 -24 344 80 408 22"
                      stroke="#184074"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray="14 13"
                    />
                    <path
                      className="about-route"
                      d="M12 92 C92 12 170 126 238 48 C300 -24 344 80 408 22"
                      stroke="#2092D1"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray="48 420"
                    />
                  </svg>

                  {[
                    ["01", "Brief"],
                    ["02", "Place"],
                    ["03", "Launch"],
                  ].map(([number, label], index) => (
                    <div
                      key={label}
                      className="about-marker absolute bottom-[38px] rounded-full bg-white px-4 py-2 text-sm font-black text-[#184074] shadow-[0_10px_24px_rgba(24,64,116,.16)]"
                      style={{ left: `${12 + index * 31}%`, animationDelay: `${index * 140}ms` }}
                    >
                      <span className="text-[#2092D1]">{number}</span> {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-billboard absolute bottom-0 left-1/2 grid w-[min(88vw,560px)] -translate-x-1/2 grid-cols-3 gap-3">
                {[
                  ["24/7", "Visibility", "0ms"],
                  ["48h", "Booking", "140ms"],
                  ["3x", "Recall", "280ms"],
                ].map(([value, label, delay]) => (
                  <div
                    key={label}
                    className="about-count-card rounded-[8px] bg-white px-4 py-4 text-center shadow-[0_16px_30px_rgba(24,64,116,.12)]"
                    style={{ animationDelay: delay }}
                  >
                    <p className="about-count text-2xl font-black leading-none text-[#2092D1]">
                      <CountUpValue value={value} />
                    </p>
                    <p className="mt-1 text-xs font-black text-[#184074]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#2092D1]/10 px-4 py-10">
          <div className="mx-auto grid max-w-[1080px] gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="about-count-card rounded-[8px] bg-white px-6 py-6 text-center shadow-[0_10px_30px_rgba(24,64,116,.08)]"
                style={{ animationDelay: stat.delay }}
              >
                <p className="about-count text-[clamp(2.4rem,6vw,4rem)] font-black leading-none text-[#2092D1]">
                  <CountUpValue value={stat.value} />
                </p>
                <p className="mt-2 text-base font-black text-[#184074]">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        
       {/* <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-5 md:grid-cols-2">
            {missionVision.map((item) => (
              <article
                key={item.label}
                className="rounded-[18px] border border-[#C9E4F3] bg-[#F4FAFE] p-6 shadow-[0_16px_36px_rgba(24,64,116,.08)] sm:p-8"
              >
                <p className="text-sm font-black uppercase tracking-[7px] text-[#2092D1]">
                  {item.label}
                </p>
                <h2 className="mt-4 text-[clamp(1.8rem,4vw,2.7rem)] font-black leading-none text-[#184074]">
                  {item.title}
                </h2>
                <p className="mt-5 text-base font-semibold leading-8 text-[#52677d]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>
        */}

        <section className="bg-[#F4FAFE] px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="mx-auto mb-10 max-w-[680px] text-center sm:mb-12">
              <p className="text-sm font-black uppercase tracking-[7px] text-[#2092D1]">
                About Sign Art
              </p>
              <h2 className="mt-3 text-[clamp(2.2rem,6vw,4rem)] font-black leading-none text-[#184074]">
                Mission & Vision
              </h2>
            </div>

            <div className="grid items-stretch gap-5 md:grid-cols-2 lg:gap-7">
              {missionVision.map((item) => {
                const isMission = item.label === "Mission";

                return (
                  <article
                    key={item.label}
                    className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-[24px] border border-[#C9E4F3] bg-white p-6 shadow-[0_18px_44px_rgba(24,64,116,.09)] sm:p-8"
                  >
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#184074] via-[#1f78b6] to-[#2092D1]" />
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#2092D1]/10 transition duration-500 group-hover:scale-110" />

                    <div className="relative flex items-start gap-4">
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[18px] bg-gradient-to-br from-[#184074] to-[#2092D1] text-white shadow-[0_12px_26px_rgba(32,146,209,.2)]">
                        {isMission ? (
                          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                            <path d="M14.8 9.2 20 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                            <path d="M17.5 4H20v2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          </svg>
                        ) : (
                          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M4 13.5C6.5 7.5 10 4.5 12 4.5s5.5 3 8 9c-2.5 6-6 9-8 9s-5.5-3-8-9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
                            <circle cx="12" cy="13.5" r="3" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-black uppercase tracking-[5px] text-[#2092D1]">
                          {item.label}
                        </p>
                        <h3 className="mt-3 text-[clamp(1.55rem,3vw,2.25rem)] font-black leading-tight text-[#184074]">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="relative mt-6 text-base font-semibold leading-8 text-[#52677d]">
                      {item.text}
                    </p>

                    <div className="relative mt-auto pt-7">
                      <div className="h-px w-full bg-[#D8ECF7]" />
                      <p className="mt-4 text-sm font-black text-[#2092D1]">
                        {isMission ? "Clear campaign support" : "Trusted outdoor media partner"}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

      {/*   <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-[clamp(2.2rem,6vw,4.2rem)] font-black leading-none">
                Built For Outdoor Impact
              </h2>
              <p className="mt-5 max-w-[560px] text-base font-semibold leading-8 text-[#52677d]">
                Our work sits at the intersection of media planning, creative storytelling, and local market visibility. The goal is simple: help your message get noticed, remembered, and acted on.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {values.map((value, index) => (
                <article
                  key={value.title}
                  className="about-card rounded-[8px] border border-[#C9E4F3] bg-white p-6 shadow-[0_14px_35px_rgba(24,64,116,.08)]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-sm font-black text-[#2092D1]">0{index + 1}</span>
                  <h3 className="mt-3 text-xl font-black text-[#184074]">{value.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#617386]">{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        */}


        <section className="px-4 pb-20">
          <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[36px] bg-[#184074] p-6 text-white shadow-[0_26px_70px_rgba(24,64,116,.22)] sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
              <div>
                <h2 className="text-[clamp(2rem,5vw,3.6rem)] font-black leading-none">
                  From Idea To Street-Level Attention
                </h2>
                <p className="mt-5 text-base font-semibold leading-8 text-white/75">
                  We guide each campaign through a clear flow so brands can move quickly without losing polish.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {steps.map((step, index) => (
                  <div key={step} className="rounded-[8px] bg-white/10 p-5 ring-1 ring-white/15">
                    <p className="text-sm font-black text-[#7ec8f7]">Step {index + 1}</p>
                    <p className="mt-2 text-2xl font-black">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F4FAFE] px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-[1180px]">
            <div className="mb-10 flex flex-col gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
              <div>
                <p className="mb-2 text-sm font-black uppercase tracking-[7px] text-[#2092D1]">
                  Campaign Moments
                </p>
                <h2 className="text-[clamp(2.2rem,6vw,4rem)] font-black leading-none text-[#184074]">
                  What Lives Behind The Launch
                </h2>
              </div>
              <p className="mx-auto max-w-[470px] text-sm font-semibold leading-7 text-[#5B6D7D] lg:mx-0">
                This gallery can show the real parts of your work: creative previews, media planning, installation moments, client campaigns, or completed billboard placements.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {moments.map((moment, index) => (
                <article
                  key={moment.title}
                  className="about-moment group overflow-hidden rounded-[18px] bg-white shadow-[0_18px_40px_rgba(24,64,116,.1)]"
                  style={{ animationDelay: `${index * 130}ms` }}
                >
                  <div className="relative h-[230px] overflow-hidden">
                    <img
                      src={moment.image}
                      alt={`${moment.title} outdoor advertising campaign Sri Lanka`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#184074]/70 via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-black text-[#184074]">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-black text-[#184074]">{moment.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-[#647789]">{moment.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
}
