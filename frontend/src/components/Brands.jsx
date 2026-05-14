import { useState } from "react";
import brandImage from "../assets/log01.webp";
import brandLogo1 from "../assets/log02.webp";
import brandLogo2 from "../assets/log014.webp";
import brandLogo3 from "../assets/Log04.webp";
import brandLogo4 from "../assets/log05.webp";
import brandLogo6 from "../assets/log06.webp";
import brandLogo7 from "../assets/log07.webp";
import brandLogo8 from "../assets/log03.webp";
import brandLogo9 from "../assets/log09.webp";
import brandLogo10 from "../assets/log031.webp";
import brandLogo11 from "../assets/log011.webp";
import brandLogo12 from "../assets/log012.webp";
import brandLogo13 from "../assets/log013.webp";
import brandLogo14 from "../assets/log0141.webp";


const brandLogos = [
  { logo: brandImage, label: "Brand partner" },
  { logo: brandLogo1, label: "Brand partner" },
  { logo: brandLogo2, label: "Brand partner" },
  { logo: brandLogo3, label: "Brand partner" },
  { logo: brandLogo4, label: "Brand partner" },
  { logo: brandLogo6, label: "Brand partner" },
  { logo: brandLogo7, label: "Brand partner" },
  { logo: brandLogo8, label: "Brand partner" },
  { logo: brandLogo9, label: "Brand partner" },
  { logo: brandLogo10, label: "Brand partner" },
  { logo: brandLogo11, label: "Brand partner" },
  { logo: brandLogo12, label: "Brand partner" },
  { logo: brandLogo13, label: "Brand partner" },
  { logo: brandLogo14, label: "Brand partner" },
];

const bubbles = [
  { id: 1, size: 286, top: 318, left: 840 },
  { id: 2, size: 154, top: 360, left: 600 },
  { id: 3, size: 156, top: 100, left: 760 },
  { id: 4, size: 116, top: 225, left: 655 },
  { id: 5, size: 110, top: 113, left: 930 },
  { id: 6, size: 178, top: 247, left: 1065 },
  { id: 7, size: 80, top: 135, left: 590 },
  { id: 8, size: 80, top: 445, left: 700 },
  { id: 9, size: 80, top: 379, left: 1042 },
  { id: 10, size: 156, top: 570, left: 760 },
  { id: 11, size: 108, top: 519, left: 908 },
  { id: 12, size: 128, top: 504, left: 1048 },
  { id: 13, size: 108, top: 543, left: 592 },
].map((bubble, index) => ({ ...bubble, ...brandLogos[index % brandLogos.length] }));

export default function Brands() {
  const [active, setActive] = useState(null);

  return (
    <section className="overflow-hidden bg-white px-4 pb-8 pt-2 font-sans sm:pb-12">
      <h2 className="mx-auto max-w-[360px] text-center text-[clamp(1.65rem,7vw,2.1rem)] font-black leading-none text-[#184074] md:max-w-none md:text-[clamp(1.75rem,4vw,2.7rem)]">
        The Brands <span className="text-[#2092D1]">Behind Us</span>
      </h2>

      <div className="relative -mx-4 mt-8 h-[400px] w-[calc(100%+2rem)] max-w-none overflow-hidden sm:mx-auto sm:mt-12 sm:h-[480px] sm:w-full sm:max-w-[1328px] md:h-[540px] lg:mt-16 lg:h-[630px] xl:h-[680px]">
        <div className="absolute left-[calc(50%-108px)] top-1/2 h-[760px] w-[1280px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[.58] sm:left-[calc(50%-126px)] sm:scale-[.68] md:left-1/2 md:h-[690px] md:w-[1180px] md:scale-[.7] lg:scale-[.82] xl:scale-[.86]">
          <div
            className="absolute left-[14px] top-[240px] hidden h-[190px] w-[455px] bg-[#18477d] shadow-[0_10px_24px_rgba(24,64,116,.16)] md:block"
            style={{
              borderRadius: "28px 168px 22px 150px / 28px 150px 22px 150px",
            }}
          >
              <span className="absolute left-[18px] top-[18px] h-[21px] w-[21px] rounded-full bg-white shadow-[0_2px_7px_rgba(0,0,0,.28)]" />
              <span className="absolute bottom-[18px] right-[19px] h-[21px] w-[21px] rounded-full bg-white shadow-[0_2px_7px_rgba(0,0,0,.28)]" />

              <div className="absolute left-[60px] top-[43px]">
                <p className="m-0 text-[54px] font-black leading-none text-white">
                  They Trust
                </p>
                <p className="mt-[10px] text-[37px] font-black leading-none text-[#2092D1]">
                  You Should Too
                </p>
              </div>
            </div>

            {bubbles.map((bubble) => {
              const isActive = active === bubble.id;

              return (
                <div
                  key={bubble.id}
                  onMouseEnter={() => setActive(bubble.id)}
                  onMouseLeave={() => setActive(null)}
                  className="absolute overflow-hidden rounded-full bg-[#D9D9D9] transition-transform duration-300"
                  style={{
                    width: bubble.size,
                    height: bubble.size,
                    top: bubble.top,
                    left: bubble.left,
                    transform: `translate(-50%, -50%) scale(${isActive ? 1.08 : 1})`,
                    boxShadow: isActive
                      ? "0 14px 18px rgba(0,0,0,.22)"
                      : "0 6px 9px rgba(0,0,0,.2)",
                    zIndex: bubble.size,
                  }}
                  aria-label={`${bubble.label} brand`}
                >
  <img
  src={bubble.logo}
  alt={`${bubble.label} logo`}
  draggable={false}
  className="h-full w-full rounded-full object-cover"
/>
                </div>
              );
            })}
        </div>
      </div>

      <div className="relative mx-auto mt-3 h-[94px] w-[68%] max-w-[230px] bg-[#18477d] shadow-[0_8px_18px_rgba(24,64,116,.14)] md:hidden"
        style={{
          borderRadius: "16px 78px 13px 70px / 16px 66px 13px 62px",
        }}
      >
        <span className="absolute left-[11px] top-[11px] h-[10px] w-[10px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,.22)]" />
        <span className="absolute bottom-[11px] right-[11px] h-[10px] w-[10px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,.22)]" />

        <div className="absolute left-[32px] top-[27px] text-left">
          <p className="m-0 text-[clamp(1.08rem,5vw,1.42rem)] font-black leading-none text-white">
            They Trust
          </p>
          <p className="mt-1.5 text-[clamp(.76rem,3.5vw,.98rem)] font-black leading-none text-[#2092D1]">
            You Should Too
          </p>
        </div>
      </div>
    </section>
  );
}
