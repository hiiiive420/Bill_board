import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { getCheckPriceHref } from "../utils/billboardCheckPrice";

const getTitle = (billboard) =>
  billboard?.title ||
  billboard?.name ||
  billboard?.location ||
  billboard?.address ||
  "Billboard Details";

const getSize = (billboard) => {
  if (billboard?.width && billboard?.height) {
    return `${billboard.width}ft x ${billboard.height}ft`;
  }

  return billboard?.size || billboard?.dimensions || "";
};

const getAvailability = (billboard) => {
  if (typeof billboard?.isAvailable === "boolean") {
    return billboard.isAvailable ? "Available" : "Currently unavailable";
  }

  return billboard?.availability || billboard?.status || "";
};

const Detail = ({ label, value }) => {
  if (value === undefined || value === null || value === "") return null;

  return (
    <div className="rounded-[14px] border border-[#D8ECF7] bg-[#F8FCFE] px-4 py-3">
      <p className="text-[11px] font-black uppercase tracking-[2px] text-[#2092D1]">{label}</p>
      <p className="mt-1 text-sm font-black text-[#184074]">{String(value)}</p>
    </div>
  );
};

export default function BillboardDetailsModal({ billboard, onClose }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!billboard) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [billboard]);

  if (!billboard) return null;

  const title = getTitle(billboard);
  const image = billboard.image || billboard.imageUrl;
  const size = getSize(billboard);
  const availability = getAvailability(billboard);
  const price = billboard.price || billboard.rate;
  const location = billboard.location || billboard.address;
  const checkPriceHref = getCheckPriceHref(billboard);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#081b33]/75 p-3 backdrop-blur-sm sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="billboard-details-title"
        className="relative grid max-h-[92dvh] w-full max-w-[1040px] overflow-y-auto rounded-[24px] bg-white shadow-[0_28px_80px_rgba(5,24,48,.38)] md:grid-cols-[minmax(0,1.12fr)_minmax(320px,.88fr)] md:overflow-hidden"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-[#184074] shadow-[0_8px_24px_rgba(5,24,48,.2)] transition hover:bg-[#184074] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#2092D1]/25 sm:right-4 sm:top-4"
          aria-label="Close billboard details"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="flex min-h-[260px] items-center justify-center bg-[#EAF3F9] md:min-h-[560px]">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full max-h-[48dvh] w-full object-contain md:max-h-[92dvh]"
            />
          ) : (
            <p className="px-6 text-center text-sm font-bold text-[#52677d]">
              Billboard image unavailable
            </p>
          )}
        </div>

        <div className="flex flex-col px-5 pb-6 pt-6 text-[#184074] sm:px-7 sm:pb-8 sm:pt-8 md:max-h-[92dvh] md:overflow-y-auto md:px-8 md:pb-8 md:pt-16">
          <p className="text-xs font-black uppercase tracking-[4px] text-[#2092D1]">
            Billboard Details
          </p>
          <h2
            id="billboard-details-title"
            className="mt-3 pr-10 text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-[1.02]"
          >
            {title}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <Detail label="Location" value={location !== title ? location : ""} />
            <Detail label="Size" value={size} />
            <Detail label="Availability" value={availability} />
            <Detail label="Price / Rate" value={price} />
            <Detail label="Type" value={billboard.type || billboard.category} />
            <Detail label="Visibility" value={billboard.visibility} />
            <Detail label="Demand" value={billboard.isInDemand ? "In Demand" : ""} />
          </div>

          {billboard.description?.trim() && (
            <div className="mt-6">
              <h3 className="text-sm font-black uppercase tracking-[2px] text-[#2092D1]">
                About This Billboard
              </h3>
              <p className="mt-2 text-sm font-semibold leading-7 text-[#52677d]">
                {billboard.description.trim()}
              </p>
            </div>
          )}

          <a
            href={checkPriceHref}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#184074] to-[#2092D1] px-6 py-3 text-center text-sm font-black text-white shadow-[0_12px_26px_rgba(32,146,209,.24)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(24,64,116,.28)] focus:outline-none focus:ring-4 focus:ring-[#2092D1]/25"
            aria-label={`Check price for ${title} on WhatsApp`}
          >
            Check Price
          </a>
        </div>
      </section>
    </div>,
    document.body
  );
}
