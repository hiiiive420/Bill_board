import { useEffect, useState } from "react";
import heroImg from "../assets/billboard.webp";

import ad1 from "../assets/ad1.webp";
import ad2 from "../assets/ad2.webp";
import ad3 from "../assets/ad3.webp";

const ads = [ad1, ad2, ad3];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white px-4 pt-8 sm:pt-12 lg:pt-14">
      <div className="relative mx-auto flex min-h-[520px] w-full max-w-[1324px] flex-col overflow-hidden rounded-[30px] bg-[#184074] px-7 pt-9 sm:min-h-[610px] sm:rounded-[45px] sm:px-12 lg:min-h-[605px] lg:flex-row lg:items-center lg:overflow-visible lg:px-16 lg:pt-0">
        <div className="relative z-10 max-w-[420px]">
          <h1 className="text-[clamp(3.2rem,10vw,4rem)] font-black leading-none text-white lg:text-[64px]">
            <span className="block">TELL</span>
            <span className="block text-blue-300">THE</span>
            <span className="block">WORLD</span>
            <span className="block text-blue-300">YOUR</span>
            <span className="block">STORY</span>
          </h1>
        </div>

        <div className="absolute bottom-[-8px] right-[-68px] w-[min(112vw,620px)] sm:right-[-24px] sm:w-[680px] lg:bottom-0 lg:right-[60px] lg:w-[650px]">
          <img
            src={heroImg}
            alt="Billboard"
            className="w-full object-contain drop-shadow-2xl"
          />

          <div
            className="absolute left-[8%] top-[23%] h-[40%] w-[90%] rotate-[31deg] skew-x-[30deg] overflow-hidden rounded-md"
            style={{ clipPath: "polygon(5% 8%, 96% 0%, 100% 72%, 0% 100%)" }}
          >
            <img src={ads[index]} alt="Featured advertisement" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
