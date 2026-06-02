import { useEffect, useState } from "react";
import heroImg from "../assets/Billboard.webp";
import heroVideo from "../assets/extreme_hero.webm";

// Replace these images to change the rotating billboard ad creatives.
import billboardAdImage1 from "../assets/ad1.webp";
import billboardAdImage2 from "../assets/ad2.webp";
import billboardAdImage3 from "../assets/ad3.webp";

const getIsMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;

const billboardAds = [billboardAdImage1, billboardAdImage2, billboardAdImage3];

// Fine-tune these values to align the ad container with the billboard screen.
const billboardAdTransform = {
  left: "15.5%",
  top: "21.2%",
  width: "73.9%",
  height: "50%",
  rotate: "26deg",
  skewX: "21deg",
  skewY: "-34deg",
  transformOrigin: "center center",
  clipPath: "polygon(14px 10%, 89% 6px, 100% 100%, 1% 93%)",
};

export default function Hero() {
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const syncMobileState = () => setIsMobile(mediaQuery.matches);

    syncMobileState();
    mediaQuery.addEventListener("change", syncMobileState);

    return () => mediaQuery.removeEventListener("change", syncMobileState);
  }, []);

  useEffect(() => {
    if (isMobile) return undefined;

    const interval = window.setInterval(() => {
      setCurrentAdIndex((current) => (current + 1) % billboardAds.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="bg-white px-4 pb-4 pt-6">
        <div className="relative mx-auto w-full max-w-[430px] overflow-hidden rounded-[42px] bg-[#184074] shadow-[0_20px_52px_rgba(24,64,116,.2)]">
          <video
            className="aspect-[9/12] w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImg}
            aria-label="SignArt hero video"
          >
            <source src={heroVideo} type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-[rgb(26_58_79_/_0.45)]" aria-hidden="true" />
          <div className="absolute bottom-7 right-5 max-w-[82%] text-right">
            <h1
              className="text-[clamp(2.25rem,11vw,3.75rem)] font-black uppercase leading-[.88] text-white"
              style={{
                textShadow:
                  "0 3px 0 rgba(0,0,0,.72), 0 8px 18px rgba(0,0,0,.72), 0 0 18px rgba(0,0,0,.48)",
              }}
            >
              <span className="block">TELL THE</span>
              <span className="block">WORLD</span>
              <span className="block">YOUR</span>
              <span className="block">STORY</span>
            </h1>
          </div>
        </div>
      </section>
    );
  }

  /*
    Previous mobile hero design preserved for future restore:

    <section className="bg-white px-4 pt-8">
      <div className="relative mx-auto flex min-h-[520px] w-full max-w-[1324px] flex-col overflow-hidden rounded-[30px] bg-[#184074] px-7 pt-9">
        <div className="relative z-10 max-w-[420px]">
          <h1 className="text-[clamp(3.2rem,10vw,4rem)] font-black leading-none text-white">
            <span className="block">TELL</span>
            <span className="block text-blue-300">THE</span>
            <span className="block">WORLD</span>
            <span className="block text-blue-300">YOUR</span>
            <span className="block">STORY</span>
          </h1>
        </div>
        <div className="absolute bottom-[-8px] right-[-68px] w-[min(112vw,620px)]">
          Billboard image and rotating ad panel.
        </div>
      </div>
    </section>
  */

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

        <div className="absolute bottom-[-8px] right-[-68px] w-[min(112vw,620px)] sm:right-[-24px] sm:w-[680px] lg:bottom-[0px] lg:right-[-80px] lg:w-[1030px] xl:bottom-[0px] xl:right-[0px] xl:w-[1098px]">
          <img
            src={heroImg}
            alt="Billboard"
            className="w-full object-contain drop-shadow-2xl"
          />

          {/*
            Previous desktop hero billboard carousel preserved for future restore:

            <div
              className="absolute left-[8%] top-[23%] h-[40%] w-[90%] rotate-[31deg] skew-x-[30deg] overflow-hidden rounded-md"
              style={{ clipPath: "polygon(5% 8%, 96% 0%, 100% 72%, 0% 100%)" }}
            >
              <img src={ads[index]} alt="Featured advertisement" className="h-full w-full object-cover" />
            </div>
          */}
          {/*
            Previous desktop hero  ad screen preserved for future restore:

            <div className="absolute left-[13.5%] top-[15.5%] h-[33.5%] w-[72%] overflow-hidden rounded-[8px] bg-white shadow-[inset_0_0_0_2px_rgba(255,255,255,.3)]">
              <img
                src={AdImage}
                alt="Featured  advertisement"
                className="h-full w-full object-cover"
              />
            </div>
          */}
          {/*
            Previous  ad implementation preserved for future restore:

            <div
              className="absolute left-[12.2%] top-[23.2%] h-[39%] w-[72.5%] overflow-hidden bg-[#111827] shadow-[inset_0_0_0_2px_rgba(255,255,255,.16)]"
              style={{
                clipPath: "polygon(0 30%, 96% 0, 100% 70%, 0% 100%)",
              }}
            >
              <img
                src={AdImage}
                alt="Featured  advertisement"
                className="h-full w-full object-cover"
              />
            </div>
          */}
          <div
            className="absolute overflow-hidden bg-[#111827] shadow-[inset_0_0_0_1px_rgba(255,255,255,.14)]"
            style={{
              left: AdTransform.left,
              top: AdTransform.top,
              width: AdTransform.width,
              height: billboardAdTransform.height,
              clipPath: billboardAdTransform.clipPath,
              transform: `rotate(${billboardAdTransform.rotate}) skewX(${billboardAdTransform.skewX}) skewY(${billboardAdTransform.skewY})`,
              transformOrigin: billboardAdTransform.transformOrigin,
            }}
          >
            <img
              key={currentAdIndex}
              src={billboardAds[currentAdIndex]}
              alt="Featured billboard advertisement"
              className="h-full w-full object-cover transition-opacity duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
