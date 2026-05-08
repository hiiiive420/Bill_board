const getSizeLabel = (billboard) => {
  if (billboard.width && billboard.height) {
    return `${billboard.width}ft x ${billboard.height}ft`;
  }

  return billboard.size || "";
};

const getBillboardTitle = (billboard) =>
  billboard.location || billboard.address || billboard.name || "Premium Billboard";

const getDescription = (billboard) => billboard.description?.trim() || "";

export default function BillboardCard({
  item,
  billboard,
  className = "",
  mediaClassName = "",
  style,
  onClick,
  ariaLabel,
}) {
  const data = item || billboard || {};
  const title = getBillboardTitle(data);
  const size = getSizeLabel(data);
  const description = getDescription(data);
  const priceLabel = data.price || "Check Price";
  const isInteractive = Boolean(onClick);
  const messageLines = [
    "Hi, I would like to check the price for this billboard.",
    "",
    `Location: ${title}`,
    `Size: ${size || "Not specified"}`,
  ];

  if (description) {
    messageLines.push(`Description: ${description}`);
  }

  const whatsappText = encodeURIComponent(
    messageLines.join("\n")
  );

  const handleKeyDown = (event) => {
    if (!isInteractive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <article className={`w-full max-w-[320px] ${className}`}>
      <div
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={[
          "group relative aspect-square w-full overflow-hidden rounded-[clamp(36px,12vw,53px)] bg-[#D9D9D9] transition-transform duration-300",
          isInteractive ? "cursor-pointer" : "cursor-default",
          isInteractive ? "focus:outline-none focus:ring-4 focus:ring-[#2092D1]/25" : "",
          "hover:scale-[1.03]",
          mediaClassName,
        ].join(" ")}
        style={style}
        aria-label={ariaLabel}
      >
        {data.image && (
          <img src={data.image} alt={title} draggable={false} className="h-full w-full object-cover" />
        )}

        <div className="absolute inset-x-0 bottom-0 flex min-h-[48%] flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pb-4 pt-16 text-white transition duration-300 group-hover:from-black/95 group-hover:via-black/70">
          <h3 className="m-0 max-w-full text-[clamp(1rem,4vw,1.18rem)] font-black leading-tight">
            {title}
          </h3>
          {size && <p className="mt-1 text-sm font-bold leading-tight opacity-95">{size}</p>}
          {description && (
            <p className="mt-1 line-clamp-2 text-xs font-semibold leading-snug opacity-85">
              {description}
            </p>
          )}
          <a
            href={`https://wa.me/94775788907?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => event.stopPropagation()}
            onMouseDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
            className="mt-3 w-fit rounded-full bg-[#2092D1] px-5 py-2 text-xs font-bold text-white shadow-[0_6px_14px_rgba(32,146,209,.28)] transition hover:-translate-y-0.5 hover:bg-[#184074]"
            aria-label={`Check price for ${title} on WhatsApp`}
          >
            {priceLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
