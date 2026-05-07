import { useState } from "react";
import { Link } from "react-router-dom";

import { getServiceSlug, serviceTabs, services } from "../data/services";

export default function WhatWeDo() {
  const [active, setActive] = useState("Case Studies");
  const activeSlug = getServiceSlug(active);
  const content = services[activeSlug];

  return (
    <section className="bg-white px-4 py-14 font-sans sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1215px]">
        <h2 className="mb-10 text-center text-[clamp(2rem,4vw,2.7rem)] font-black leading-none text-[#184074] md:mb-14">
          What <span className="text-[#2092D1]">We Do</span>
        </h2>

        <div className="grid items-start gap-8 lg:grid-cols-[282px_minmax(0,600px)_270px] lg:gap-[34px]">
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:gap-[18px] lg:overflow-visible lg:p-0">
            {serviceTabs.map((tab) => {
              const isActive = active === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActive(tab)}
                  className={[
                    "h-[76px] min-w-[245px] rounded-lg border text-center text-[18px] font-black leading-none transition duration-300 sm:min-w-[282px] lg:w-full",
                    isActive
                      ? "border-transparent text-white shadow-[0_14px_24px_rgba(24,64,116,.14)]"
                      : "border-[#DADADA] bg-white text-[#111111] shadow-[0_1px_4px_rgba(0,0,0,.08)] hover:border-[#B7D6E8]",
                  ].join(" ")}
                  style={
                    isActive
                      ? {
                          background:
                            "radial-gradient(circle at 75% 115%, rgba(79,184,224,.95) 0, rgba(79,184,224,.65) 26%, transparent 48%), #07105A",
                        }
                      : undefined
                  }
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="h-[240px] overflow-hidden rounded-[14px] bg-[#D9D9D9] shadow-[0_4px_14px_rgba(0,0,0,.08)] sm:h-[330px] lg:h-[390px]">
            <img
              key={content.image}
              src={content.image}
              alt={content.title}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
          </div>

          <div className="max-w-[430px] text-left lg:max-w-none lg:pt-1">
            <h3 className="mb-5 text-[clamp(1.45rem,3vw,1.75rem)] font-black leading-none text-[#2092D1]">
              {content.title}
            </h3>

            <p className="mb-8 text-[clamp(.98rem,2vw,1.08rem)] font-semibold leading-[1.55] text-[#555555] lg:leading-[1.62]">
              {content.description}
            </p>

            <Link
              to={`/services/${activeSlug}#services-top`}
              className="h-[44px] min-w-[158px] rounded-full bg-gradient-to-r from-[#D63D91] to-[#FF8A13] px-7 py-3 text-[15px] font-bold text-white shadow-[0_8px_18px_rgba(226,88,71,.18)] transition hover:-translate-y-0.5"
            >
              View Insights
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
