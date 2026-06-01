const reasons = ["High Recall Rate", "24/7 Visibility", "High Local Reach"];

export default function WhyBillboard() {
  return (
    <section className="overflow-hidden bg-white px-4 pb-12 pt-3 font-sans sm:py-14 lg:py-16">
      <div className="relative mx-auto hidden h-[310px] w-full max-w-[1000px] overflow-visible md:block lg:h-[330px]">
        <div className="absolute left-1/2 top-1/2 h-[330px] w-[1000px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[.78] lg:scale-[.9] xl:scale-100">
          <div className="absolute left-[20px] top-[112px]">
            <h2 className="m-0 text-[92px] font-black leading-[.8] text-[#184074]">
              WHY
            </h2>
            <p className="mt-[18px] text-[25px] font-black leading-none tracking-[17px] text-[#2092D1]">
              BILLBOARD
            </p>
          </div>

          <svg
            className="pointer-events-none absolute left-[340px] top-[86px] h-[190px] w-[360px]"
            viewBox="0 0 360 190"
            fill="none"
            aria-hidden="true"
          >
            <path d="M0 78 L164 42" stroke="#111111" strokeWidth="1.35" />
            <path d="M164 42 L314 0" stroke="#111111" strokeWidth="1.35" />
            <path d="M164 42 C168 71 204 82 304 81" stroke="#111111" strokeWidth="1.35" />
            <path d="M164 42 C178 112 228 142 344 142" stroke="#111111" strokeWidth="1.35" />
          </svg>

          <div className="absolute left-[695px] top-[52px] grid gap-[54px]">
            {reasons.map((reason) => (
              <p key={reason} className="m-0 text-[30px] font-black leading-none text-[#184074]">
                {reason}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mx-auto h-[150px] w-full max-w-[430px] overflow-visible md:hidden">
        <div className="absolute left-[2%] top-1/2 -translate-y-1/2">
          <h2 className="m-0 text-[clamp(2.7rem,14vw,3.7rem)] font-black leading-[.8] text-[#184074]">
            WHY
          </h2>
          <p className="mt-2 text-[clamp(.65rem,3vw,.9rem)] font-black leading-none tracking-[clamp(6px,2.4vw,10px)] text-[#2092D1]">
            BILLBOARD
          </p>
        </div>

        <svg
          className="pointer-events-none absolute left-[39%] top-1/2 h-[86px] w-[25%] -translate-y-1/2"
          viewBox="0 0 132 92"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 48 L60 34" stroke="#111111" strokeWidth="1.2" />
          <path d="M60 34 L128 8" stroke="#111111" strokeWidth="1.2" />
          <path d="M60 34 C66 49 91 54 126 48" stroke="#111111" strokeWidth="1.2" />
          <path d="M60 34 C70 68 96 83 130 82" stroke="#111111" strokeWidth="1.2" />
        </svg>

        <div className="absolute right-[1%] top-1/2 grid -translate-y-1/2 gap-5 text-left">
          {reasons.map((reason) => (
            <p key={reason} className="m-0 text-[clamp(.82rem,3.7vw,1.1rem)] font-black leading-none text-[#184074]">
              {reason}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
