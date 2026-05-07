const reasons = ["High Recall Rate", "24/7 Visibility", "High Local Reach"];

export default function WhyBillboard() {
  return (
    <section className="overflow-hidden bg-white px-4 py-10 font-sans sm:py-14 lg:py-16">
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

      <div className="mx-auto grid max-w-[430px] gap-8 text-center md:hidden">
        <div>
          <h2 className="m-0 text-[clamp(4.6rem,23vw,6.25rem)] font-black leading-[.8] text-[#184074]">
            WHY
          </h2>
          <p className="mt-4 text-[clamp(1rem,4vw,1.45rem)] font-black leading-none tracking-[clamp(9px,3vw,15px)] text-[#2092D1]">
            BILLBOARD
          </p>
        </div>

        <div className="grid gap-4">
          {reasons.map((reason) => (
            <p key={reason} className="m-0 text-[clamp(1.35rem,6.4vw,1.85rem)] font-black leading-none text-[#184074]">
              {reason}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
