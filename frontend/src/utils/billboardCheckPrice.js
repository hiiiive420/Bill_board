const getBillboardTitle = (billboard) =>
  billboard.location || billboard.address || billboard.name || "Premium Billboard";

const getSizeLabel = (billboard) => {
  if (billboard.width && billboard.height) {
    return `${billboard.width}ft x ${billboard.height}ft`;
  }

  return billboard.size || "";
};

export const getCheckPriceHref = (billboard) => {
  const title = getBillboardTitle(billboard);
  const size = getSizeLabel(billboard);
  const description = billboard.description?.trim() || "";
  const messageLines = [
    "Hi, I would like to check the price for this billboard.",
    "",
    `Location: ${title}`,
    `Size: ${size || "Not specified"}`,
  ];

  if (description) {
    messageLines.push(`Description: ${description}`);
  }

  return `https://wa.me/94775788907?text=${encodeURIComponent(messageLines.join("\n"))}`;
};
