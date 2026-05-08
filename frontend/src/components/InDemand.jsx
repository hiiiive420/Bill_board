import { useCallback, useEffect, useRef, useState } from "react";
import API from "../api/axios";

const blobRadius = {
  borderTopLeftRadius: "50%",
  borderTopRightRadius: "31%",
  borderBottomRightRadius: "50%",
  borderBottomLeftRadius: "31%",
};

const ArrowIcon = ({ direction }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-5 w-5 sm:h-6 sm:w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

const getVisibleCount = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
};

const getTitle = (billboard) =>
  billboard.location || billboard.address || billboard.name || "Premium Billboard";

const getSizeLabel = (billboard) => {
  if (billboard.width && billboard.height) {
    return `${billboard.width}ft x ${billboard.height}ft`;
  }

  return billboard.size || "";
};

const getWhatsappHref = (billboard) => {
  const title = getTitle(billboard);
  const size = getSizeLabel(billboard);
  const description = billboard.description?.trim();
  const messageLines = [
    "Hi, I would like to check the price for this in-demand billboard.",
    "",
    `Location: ${title}`,
    `Size: ${size || "Not specified"}`,
  ];

  if (description) {
    messageLines.push(`Description: ${description}`);
  }

  return `https://wa.me/94775788907?text=${encodeURIComponent(messageLines.join("\n"))}`;
};

export default function InDemand() {
  const [billboards, setBillboards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);

  const dragStartX = useRef(0);
  const dragDelta = useRef(0);
  const dragging = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/billboards/in-demand");
        setBillboards(res.data);
      } catch {
        setBillboards(
          Array.from({ length: 6 }, (_, i) => ({
            _id: String(i),
            image: "",
            location: "Colombo 03",
            width: 12,
            height: 8,
          }))
        );
      }
    })();
  }, []);

  useEffect(() => {
    const onResize = () => setVisibleCount(getVisibleCount());

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const total = billboards.length;
  const itemsToShow = Math.min(visibleCount, total);
  const maxCurrent = Math.max(total - itemsToShow, 0);
  const activeCurrent = Math.min(current, maxCurrent);
  const isFirst = activeCurrent === 0;
  const isLast = activeCurrent >= maxCurrent;
  const prev = useCallback(
    () => setCurrent((c) => Math.max(Math.min(c, maxCurrent) - 1, 0)),
    [maxCurrent]
  );
  const next = useCallback(
    () => setCurrent((c) => Math.min(Math.min(c, maxCurrent) + 1, maxCurrent)),
    [maxCurrent]
  );

  const onDragStart = (x) => {
    dragging.current = true;
    dragStartX.current = x;
    dragDelta.current = 0;
  };

  const onDragMove = (x) => {
    if (dragging.current) dragDelta.current = x - dragStartX.current;
  };

  const onDragEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (total <= 1) return;
    if (dragDelta.current < -60) next();
    if (dragDelta.current > 60) prev();
  };

  const showControls = total > 1;
  const visibleItems = billboards.slice(activeCurrent, activeCurrent + itemsToShow);

  const navButtonClass =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D8EAF5] bg-white/95 text-[#184074] shadow-[0_8px_22px_rgba(24,64,116,.16)] transition duration-300 hover:-translate-y-[54%] hover:bg-[#2092D1] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#2092D1]/20 sm:h-12 sm:w-12";

  return (
    <section className="flex select-none flex-col items-center bg-white px-4 py-14 sm:py-16">
      <h2 className="mb-10 text-center text-[clamp(1.75rem,5vw,2.25rem)] font-black leading-none text-[#184074] sm:mb-14">
        In - <span className="text-[#2092D1]">DEMAND</span>
      </h2>

      <div className="relative w-full max-w-[1180px]">
        {showControls && (
          <>
            <button
              type="button"
              onClick={prev}
              disabled={isFirst}
              className={`${navButtonClass} left-0 disabled:pointer-events-none disabled:opacity-35 sm:left-2 lg:-left-2`}
              aria-label="Show previous in-demand billboard"
            >
              <ArrowIcon direction="left" />
            </button>

            <button
              type="button"
              onClick={next}
              disabled={isLast}
              className={`${navButtonClass} right-0 disabled:pointer-events-none disabled:opacity-35 sm:right-2 lg:-right-2`}
              aria-label="Show next in-demand billboard"
            >
              <ArrowIcon direction="right" />
            </button>
          </>
        )}

        <div
          className="mx-auto flex w-full max-w-[1120px] items-center justify-center gap-5 overflow-hidden px-12 sm:gap-8 sm:px-[max(16px,calc((100vw-1024px)/2))] lg:gap-10"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => onDragMove(e.clientX)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
          onTouchEnd={onDragEnd}
        >
          {visibleItems.map((item, index) => {
            const isSideItem = visibleCount === 3 && index !== 1;
            const isTabletSideItem = visibleCount === 2 && index === 1;
            const onClick =
              index === 0 && activeCurrent > 0
                ? prev
                : index === itemsToShow - 1 && activeCurrent < maxCurrent
                  ? next
                  : null;

            return (
              <InDemandCard
                key={item?._id ?? `billboard-${activeCurrent + index}`}
                item={item}
                onClick={onClick}
                isMuted={isSideItem || isTabletSideItem}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InDemandCard({ item, onClick, isMuted }) {
  const title = getTitle(item);
  const description = item.description?.trim() || "";
  const isInteractive = Boolean(onClick);

  const handleKeyDown = (event) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <article
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="relative h-[clamp(230px,58vw,321px)] w-[clamp(230px,58vw,320px)] shrink-0 overflow-hidden bg-[#D9D9D9] transition duration-500 focus:outline-none focus:ring-4 focus:ring-[#2092D1]/20"
      style={{
        ...blobRadius,
        transform: `scale(${isMuted ? 0.93 : 1})`,
        opacity: isMuted ? 0.82 : 1,
        cursor: isInteractive ? "pointer" : "default",
        boxShadow: isMuted
          ? "0 4px 16px rgba(0,0,0,0.07)"
          : "0 8px 32px rgba(0,0,0,0.13)",
      }}
      aria-label={isInteractive ? "Change featured billboard" : title}
    >
      {item?.image && (
        <img
          src={item.image}
          alt={title}
          draggable={false}
          className="h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-x-0 bottom-0 flex min-h-[42%] flex-col justify-end bg-gradient-to-t from-black/85 via-black/50 to-transparent px-5 pb-5 pt-16 text-white">
        <h3 className="m-0 text-[clamp(1rem,4vw,1.2rem)] font-black leading-tight">
          {title}
        </h3>
        {description && (
          <p className="mt-1 line-clamp-2 text-xs font-semibold leading-snug opacity-90">
            {description}
          </p>
        )}
        <a
          href={getWhatsappHref(item)}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          className="mt-3 w-fit rounded-full bg-[#2092D1] px-5 py-2 text-xs font-bold text-white shadow-[0_6px_14px_rgba(32,146,209,.28)] transition hover:-translate-y-0.5 hover:bg-[#184074]"
          aria-label={`Check price for ${title} on WhatsApp`}
        >
          Check Price
        </a>
      </div>
    </article>
  );
}
