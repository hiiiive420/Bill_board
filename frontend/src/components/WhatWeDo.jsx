import { useState } from "react";
import { Link } from "react-router-dom";

import { services } from "../data/services";

const whatWeDoTabs = ["billboards", "media-formats", "campaign-activation"];
const mobileLabels = {
  billboards: "Billboards",
  "media-formats": "Media",
  "campaign-activation": "Campaign",
};

export default function WhatWeDo() {
  const [activeSlug, setActiveSlug] = useState(whatWeDoTabs[0]);
  const content = services[activeSlug];

  return (
    <section className="bg-white px-4 py-14 font-sans sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1215px]">
        <h2 className="mb-8 text-center text-[clamp(2rem,4vw,2.7rem)] font-black leading-none text-[#184074] md:mb-14">
          What <span className="text-[#2092D1]">We Do</span>
        </h2>

        <div className="md:hidden">
          <div className="mx-auto flex w-full max-w-[360px] flex-nowrap items-center justify-center gap-2">
            {whatWeDoTabs.map((slug) => {
              const service = services[slug];
              const isActive = activeSlug === slug;

              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setActiveSlug(slug)}
                  className={[
                    "min-h-10 min-w-0 flex-1 rounded-full px-2 py-2 text-[11px] font-black leading-tight transition duration-300 min-[380px]:text-xs",
                    isActive
                      ? "bg-gradient-to-r from-[#184074] via-[#1f78b6] to-[#2092D1] text-white shadow-[0_10px_22px_rgba(32,146,209,.22)]"
                      : "bg-[#EDF4F9] text-[#184074] ring-1 ring-[#C9E4F3] hover:bg-[#2092D1]/10",
                  ].join(" ")}
                >
                  {mobileLabels[slug] || service.label}
                </button>
              );
            })}
          </div>

          <article
            key={activeSlug}
            className="mx-auto mt-7 w-[95%] max-w-[430px] overflow-hidden rounded-[18px] border border-[#C9E4F3] bg-white shadow-[0_18px_38px_rgba(24,64,116,.1)] transition duration-300"
          >
            <div className="h-[230px] overflow-hidden bg-[#D9D9D9]">
              <img
                src={content.image}
                alt={content.title}
                className="h-full w-full object-cover transition duration-500 ease-out"
              />
            </div>

            <div className="p-5">
              <h3 className="text-[1.45rem] font-black leading-none text-[#2092D1]">
                {content.title}
              </h3>
              <p className="mt-4 text-[.98rem] font-semibold leading-7 text-[#555555]">
                {content.description}
              </p>
              <Link
                to={`/services/${activeSlug}#services-top`}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#184074] via-[#1f78b6] to-[#2092D1] px-7 text-[15px] font-bold text-white shadow-[0_10px_22px_rgba(32,146,209,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(24,64,116,.24)]"
              >
                {activeSlug === "billboards" ? "View Billboards" : "View Insights"}
              </Link>
            </div>
          </article>
        </div>

        <div className="hidden h-[330px] items-stretch gap-6 md:grid md:grid-cols-[220px_minmax(0,600px)_250px] lg:h-[390px] lg:grid-cols-[260px_minmax(0,600px)_270px] lg:gap-[34px]">
          <div className="flex h-full flex-col justify-between">
            {whatWeDoTabs.map((slug) => {
              const service = services[slug];
              const isActive = activeSlug === slug;

              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setActiveSlug(slug)}
                  className={[
                    "h-[76px] rounded-lg border px-3 text-center text-[14px] font-black leading-tight transition duration-300 lg:h-[86px] lg:text-[15px]",
                    isActive
                      ? "border-transparent text-white shadow-[0_14px_24px_rgba(24,64,116,.14)]"
                      : "border-[#DADADA] bg-white text-[#111111] shadow-[0_1px_4px_rgba(0,0,0,.08)] hover:border-[#B7D6E8]",
                  ].join(" ")}
                  style={
                    isActive
                      ? {
                          background:
                            "radial-gradient(circle at 78% 112%, rgba(126,200,247,.95) 0, rgba(32,146,209,.76) 28%, transparent 52%), linear-gradient(135deg, #184074 0%, #1F78B6 58%, #2092D1 100%)",
                        }
                      : undefined
                  }
                >
                  {service.label}
                </button>
              );
            })}
          </div>

          <div className="h-full overflow-hidden rounded-[14px] bg-[#D9D9D9] shadow-[0_4px_14px_rgba(0,0,0,.08)]">
            <img
              key={content.image}
              src={content.image}
              alt={content.title}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
          </div>

          <div className="flex h-full flex-col justify-between overflow-hidden text-left">
            <div>
              <h3 className="text-[clamp(1.35rem,2.6vw,1.75rem)] font-black leading-none text-[#2092D1]">
                {content.title}
              </h3>

              <p className="mt-5 text-[clamp(.95rem,1.6vw,1.08rem)] font-semibold leading-[1.55] text-[#555555] lg:leading-[1.62]">
                {content.description}
              </p>
            </div>

            <Link
              to={`/services/${activeSlug}#services-top`}
              className="inline-flex h-[42px] w-fit min-w-[148px] items-center justify-center rounded-full bg-gradient-to-r from-[#184074] via-[#1f78b6] to-[#2092D1] px-6 text-[14px] font-bold text-white shadow-[0_10px_22px_rgba(32,146,209,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(24,64,116,.24)]"
            >
              {activeSlug === "billboards" ? "View Billboards" : "View Insights"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
