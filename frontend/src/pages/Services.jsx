import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CountUpValue from "../components/CountUpValue";
import AllBillboards from "../components/AllBillboards";
import { services } from "../data/services";

const serviceEntries = [
  ["billboards", services.billboards],
  ["media-formats", services["media-formats"]],
  ["campaign-activation", services["campaign-activation"]],
];

export default function Services() {
  const { slug } = useParams();
  const activeSlug = serviceEntries.some(([itemSlug]) => itemSlug === slug) ? slug : "billboards";
  const active = services[activeSlug];
  const isBillboards = activeSlug === "billboards";

  return (
    <div className="min-h-screen overflow-hidden bg-white text-[#184074]">
      <Navbar />

      <main>
        <section id="services-top" className="relative scroll-mt-6 px-4 pb-14 pt-8 sm:pb-20 lg:pt-12">
          <div className="service-grid absolute inset-x-0 top-0 h-[560px] bg-[#F4FAFE]" />
          <div className="relative mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[.86fr_1.14fr] lg:items-center">
            <div className="service-fade">
              <p className="mb-3 text-sm font-black uppercase tracking-[8px] text-[#2092D1]">
                Services
              </p>
              <h1 className="text-[clamp(3.1rem,8vw,6.2rem)] font-black leading-[.9]">
                Outdoor Media Built For Results
              </h1>
              <p className="mt-6 max-w-[610px] text-base font-semibold leading-8 text-[#52677d]">
                Pick a service to see how we help your brand move from campaign idea to street-level attention.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {serviceEntries.map(([itemSlug, service]) => {
                  const isActive = itemSlug === activeSlug;

                  return (
                    <Link
                      key={itemSlug}
                      to={`/services/${itemSlug}`}
                      className={[
                        "rounded-full px-5 py-3 text-sm font-black transition",
                        isActive
                          ? "bg-[#184074] text-white shadow-[0_12px_26px_rgba(24,64,116,.18)]"
                          : "bg-white text-[#184074] ring-1 ring-[#C9E4F3] hover:-translate-y-0.5 hover:bg-[#2092D1]/10",
                      ].join(" ")}
                    >
                      {service.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="service-float relative min-h-[430px]">
              <div className="absolute inset-0 rounded-[36px] bg-[#184074] shadow-[0_28px_70px_rgba(24,64,116,.22)]" />
              <img
                src={active.image}
                alt={active.title}
                className="absolute inset-4 h-[calc(100%-32px)] w-[calc(100%-32px)] rounded-[26px] object-cover opacity-80 mix-blend-screen"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-[18px] bg-white/95 p-5 shadow-[0_18px_40px_rgba(0,0,0,.12)] backdrop-blur">
                <p className="text-sm font-black uppercase tracking-[4px] text-[#2092D1]">{active.label}</p>
                <h2 className="mt-2 text-[clamp(1.7rem,4vw,2.7rem)] font-black leading-none text-[#184074]">
                  {active.title}
                </h2>
              </div>
            </div>
          </div>
        </section>

        {isBillboards ? (
          <AllBillboards />
        ) : (
          <>
            <section className="px-4 py-14 sm:py-18">
              <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
                <div>
                  <p className="text-sm font-black uppercase tracking-[7px] text-[#2092D1]">Insight</p>
                  <h2 className="mt-4 text-[clamp(2.3rem,6vw,4.4rem)] font-black leading-none">
                    {active.headline}
                  </h2>
                  <p className="mt-6 max-w-[620px] text-base font-semibold leading-8 text-[#52677d]">
                    {active.description}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {active.metrics.map(([value, label], index) => (
                    <article
                      key={label}
                      className="service-card rounded-[8px] border border-[#C9E4F3] bg-white p-6 shadow-[0_16px_34px_rgba(24,64,116,.08)]"
                      style={{ animationDelay: `${index * 120}ms` }}
                    >
                      <p className="text-[clamp(1.9rem,5vw,3rem)] font-black leading-none text-[#2092D1]">
                        <CountUpValue value={value} />
                      </p>
                      <p className="mt-2 text-sm font-black text-[#184074]">{label}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-[#184074] px-4 py-16 text-white sm:py-20">
              <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[7px] text-[#7ec8f7]">What You Get</p>
                  <h2 className="mt-4 text-[clamp(2rem,5vw,3.4rem)] font-black leading-none">
                    A service flow that keeps campaigns clear.
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {active.bullets.map((item, index) => (
                    <div key={item} className="service-card rounded-[8px] bg-white/10 p-5 ring-1 ring-white/15" style={{ animationDelay: `${index * 140}ms` }}>
                      <p className="text-sm font-black text-[#7ec8f7]">0{index + 1}</p>
                      <p className="mt-3 text-lg font-black leading-6">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-4 py-16 sm:py-20">
              <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[32px] bg-[#F4FAFE] p-6 sm:p-10">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[7px] text-[#2092D1]">Ready</p>
                    <h2 className="mt-3 text-[clamp(2rem,5vw,3.6rem)] font-black leading-none">
                      Need this service for your next campaign?
                    </h2>
                  </div>
                  <Link
                    to="/contact#campaign-inquiry"
                    className="w-fit rounded-full bg-gradient-to-r from-[#184074] via-[#1f78b6] to-[#2092D1] px-8 py-4 text-sm font-black text-white shadow-[0_12px_26px_rgba(32,146,209,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(24,64,116,.24)]"
                  >
                    Send Campaign Inquiry
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
