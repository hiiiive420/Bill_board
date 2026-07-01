import { useEffect, useRef, useState } from "react";
import heroImg from "../assets/Billboard.webp";
import heroVideo from "../assets/extreme_hero.webm";

// Replace these images to change the rotating billboard ad creatives.
import billboardAdImage1 from "../assets/Apiit.webp";
import billboardAdImage2 from "../assets/premiumsofa.webp";
import billboardAdImage3 from "../assets/star_gold_full_cream_milk.webp";
import billboardAdImage4 from "../assets/ECU.webp";

const getIsMobile = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches;

const billboardAds = [billboardAdImage1, billboardAdImage2, billboardAdImage3, billboardAdImage4];

// Fine-tune this wrapper if the whole distorted ad area needs moving/resizing.
const billboardAdBox = {
  left: "7%",
  top: "7%",
  width: "88%",
  height: "77%",
};

// Fine-tune these values to align the ad container with the billboard screen.
// These work like Photoshop distort corner handles:
// topLeft moves the top-left corner, topRight moves the top-right corner,
// bottomRight moves the bottom-right corner, bottomLeft moves the bottom-left corner.
const billboardAdCorners = {
  topLeft: { x: 15, y: 44 },
  topRight: { x: 85, y: 2 },
  bottomRight: { x: 90, y: 65 },
  bottomLeft: { x: 11, y: 100 },
};


const solveLinearSystem = (matrix, values) => {
  const size = values.length;
  const rows = matrix.map((row, index) => [...row, values[index]]);

  for (let column = 0; column < size; column += 1) {
    let pivotRow = column;

    for (let row = column + 1; row < size; row += 1) {
      if (Math.abs(rows[row][column]) > Math.abs(rows[pivotRow][column])) {
        pivotRow = row;
      }
    }

    if (Math.abs(rows[pivotRow][column]) < 1e-10) {
      return null;
    }

    [rows[column], rows[pivotRow]] = [rows[pivotRow], rows[column]];

    const pivot = rows[column][column];
    for (let col = column; col <= size; col += 1) {
      rows[column][col] /= pivot;
    }

    for (let row = 0; row < size; row += 1) {
      if (row === column) continue;

      const factor = rows[row][column];
      for (let col = column; col <= size; col += 1) {
        rows[row][col] -= factor * rows[column][col];
      }
    }
  }

  return rows.map((row) => row[size]);
};

const cleanMatrixValue = (value) => {
  if (!Number.isFinite(value)) return 0;
  const rounded = Math.abs(value) < 1e-10 ? 0 : value;
  return Number(rounded.toFixed(8));
};

const getDistortTransform = ({ width, height, corners }) => {
  if (!width || !height) return "none";

  const sourcePoints = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];

  const targetPoints = [
    { x: (corners.topLeft.x / 100) * width, y: (corners.topLeft.y / 100) * height },
    { x: (corners.topRight.x / 100) * width, y: (corners.topRight.y / 100) * height },
    { x: (corners.bottomRight.x / 100) * width, y: (corners.bottomRight.y / 100) * height },
    { x: (corners.bottomLeft.x / 100) * width, y: (corners.bottomLeft.y / 100) * height },
  ];

  const matrix = [];
  const values = [];

  sourcePoints.forEach((source, index) => {
    const target = targetPoints[index];
    const { x, y } = source;
    const { x: targetX, y: targetY } = target;

    matrix.push([x, y, 1, 0, 0, 0, -x * targetX, -y * targetX]);
    values.push(targetX);

    matrix.push([0, 0, 0, x, y, 1, -x * targetY, -y * targetY]);
    values.push(targetY);
  });

  const solved = solveLinearSystem(matrix, values);
  if (!solved) return "none";

  const [h11, h12, h13, h21, h22, h23, h31, h32] = solved.map(cleanMatrixValue);

  return `matrix3d(${[
    h11, h21, 0, h31,
    h12, h22, 0, h32,
    0, 0, 1, 0,
    h13, h23, 0, 1,
  ].join(",")})`;
};

const showBillboardAdDebug = false;

export default function Hero() {
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const billboardAdRef = useRef(null);
  const [billboardAdSize, setBillboardAdSize] = useState({ width: 0, height: 0 });

  const billboardAdDistortTransform = getDistortTransform({
    width: billboardAdSize.width,
    height: billboardAdSize.height,
    corners: billboardAdCorners,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const syncMobileState = () => setIsMobile(mediaQuery.matches);

    syncMobileState();
    mediaQuery.addEventListener("change", syncMobileState);

    return () => mediaQuery.removeEventListener("change", syncMobileState);
  }, []);


  useEffect(() => {
    if (isMobile || !billboardAdRef.current) return undefined;

    const billboardAdElement = billboardAdRef.current;

    const updateBillboardAdSize = () => {
      const { width, height } = billboardAdElement.getBoundingClientRect();

      setBillboardAdSize((previousSize) => {
        const widthChanged = Math.abs(previousSize.width - width) > 0.5;
        const heightChanged = Math.abs(previousSize.height - height) > 0.5;

        if (!widthChanged && !heightChanged) return previousSize;
        return { width, height };
      });
    };

    updateBillboardAdSize();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateBillboardAdSize) : null;

    resizeObserver?.observe(billboardAdElement);
    window.addEventListener("resize", updateBillboardAdSize);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateBillboardAdSize);
    };
  }, [isMobile]);

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

        <div className="absolute bottom-[-8px] right-[-68px] w-[min(112vw,620px)] sm:right-[-24px] sm:w-[680px] lg:bottom-[0px] lg:right-[-80px] lg:w-[1030px] xl:bottom-[0px] xl:right-[-130px] xl:w-[1100px]">
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
            Previous desktop hero billboard ad screen preserved for future restore:

            <div className="absolute left-[13.5%] top-[15.5%] h-[33.5%] w-[72%] overflow-hidden rounded-[8px] bg-white shadow-[inset_0_0_0_2px_rgba(255,255,255,.3)]">
              <img
                src={billboardAdImage}
                alt="Featured billboard advertisement"
                className="h-full w-full object-cover"
              />
            </div>
          */}
          {/*
            Previous skew/polygon billboard ad implementation preserved for future restore:

            <div
              className="absolute overflow-hidden bg-[#111827] shadow-[inset_0_0_0_1px_rgba(255,255,255,.14)]"
              style={{
                left: "15.5%",
                top: "21.2%",
                width: "73.9%",
                height: "50%",
                clipPath: "polygon(14px 10%, 89% 6px, 100% 100%, 1% 93%)",
                transform: "rotate(26deg) skewX(21deg) skewY(-34deg)",
                transformOrigin: "center center",
              }}
            >
              <img
                src={billboardAds[currentAdIndex]}
                alt="Featured billboard advertisement"
                className="h-full w-full object-cover"
              />
            </div>
          */}
          <div
            ref={billboardAdRef}
            className="absolute"
            style={{
              left: billboardAdBox.left,
              top: billboardAdBox.top,
              width: billboardAdBox.width,
              height: billboardAdBox.height,
              pointerEvents: "none",
            }}
          >
            <img
              key={currentAdIndex}
              src={billboardAds[currentAdIndex]}
              alt="Featured billboard advertisement"
              className="absolute left-0 top-0 h-full w-full object-cover shadow-[inset_0_0_0_1px_rgba(255,255,255,.14)]"
              style={{
                opacity: billboardAdSize.width && billboardAdSize.height ? 1 : 0,
                transform: billboardAdDistortTransform,
                transformOrigin: "0 0",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform",
              }}
            />
          </div>

          {showBillboardAdDebug && (
            <div
              className="pointer-events-none absolute"
              style={{
                left: billboardAdBox.left,
                top: billboardAdBox.top,
                width: billboardAdBox.width,
                height: billboardAdBox.height,
              }}
              aria-hidden="true"
            >
              <svg className="absolute inset-0 h-full w-full overflow-visible">
                <polygon
                  points={`${billboardAdCorners.topLeft.x},${billboardAdCorners.topLeft.y} ${billboardAdCorners.topRight.x},${billboardAdCorners.topRight.y} ${billboardAdCorners.bottomRight.x},${billboardAdCorners.bottomRight.y} ${billboardAdCorners.bottomLeft.x},${billboardAdCorners.bottomLeft.y}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {Object.entries(billboardAdCorners).map(([cornerName, corner]) => (
                <span
                  key={cornerName}
                  className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_0_1px_rgba(15,23,42,.9)]"
                  style={{
                    left: `${corner.x}%`,
                    top: `${corner.y}%`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
