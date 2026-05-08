import ad1 from "../assets/Mediaformat.png";
import ad2 from "../assets/Audiance Reach.png";
import ad3 from "../assets/creativesupport.png";
import ad4 from "../assets/Champaign activation.png";
import ad5 from "../assets/Casestudy.png";

export const services = {
  "media-formats": {
    label: "Media Formats",
    title: "Flexible Media Formats",
    headline: "Choose the billboard format that fits the story.",
    description:
      "We offer digital, static, premium roadside, and campaign-ready outdoor placements that help brands show up with the right scale and clarity.",
    image: ad1,
    metrics: [
      ["Digital", "Fast creative swaps"],
      ["Static", "Long-term presence"],
      ["Premium", "High-impact roads"],
    ],
    bullets: ["Digital and static billboard options", "Location-based format guidance", "Creative sizing support"],
  },
  "audience-reach": {
    label: "Audience Reach",
    title: "Massive Audience Reach",
    headline: "Put your brand where attention already moves.",
    description:
      "We help you identify high-traffic environments where your audience passes daily, making your campaign visible, repeated, and easy to remember.",
    image: ad2,
    metrics: [
      ["24/7", "Always visible"],
      ["Local", "Market presence"],
      ["Repeat", "Daily exposure"],
    ],
    bullets: ["High-traffic location planning", "Audience and movement matching", "Local visibility strategy"],
  },
  "creative-support": {
    label: "Creative Support",
    title: "Creative Support",
    headline: "Design creative that reads in seconds.",
    description:
      "Billboard creative needs sharp hierarchy, bold contrast, and a message people can understand quickly. We help shape layouts that work outdoors.",
    image: ad3,
    metrics: [
      ["3 sec", "Readability focus"],
      ["Bold", "Visual hierarchy"],
      ["Clear", "Message direction"],
    ],
    bullets: ["OOH layout guidance", "Copy and visual hierarchy", "Campaign artwork preparation"],
  },
  "campaign-activation": {
    label: "Campaign Activation",
    title: "Campaign Activation",
    headline: "Move from campaign idea to live placement.",
    description:
      "From availability checks to launch coordination, we keep the campaign process smooth so your outdoor message reaches the street without confusion.",
    image: ad4,
    metrics: [
      ["Plan", "Location check"],
      ["Book", "Space confirmation"],
      ["Launch", "Campaign ready"],
    ],
    bullets: ["Campaign scheduling", "Placement coordination", "Launch support"],
  },
  "case-studies": {
    label: "Case Studies",
    title: "Browse our library",
    headline: "Use proven outdoor ideas to plan better campaigns.",
    description:
      "OOH influences online and offline behavior. We help turn campaign examples into practical insights for store visits, app downloads, events, and brand recall.",
    image: ad5,
    metrics: [
      ["100+", "Study ideas"],
      ["OOH", "Behavior influence"],
      ["Better", "Planning insight"],
    ],
    bullets: ["Campaign inspiration", "Performance learning", "Better creative decisions"],
  },
};

export const serviceTabs = Object.values(services).map((service) => service.label);

export const getServiceSlug = (label) =>
  Object.keys(services).find((slug) => services[slug].label === label) || "case-studies";
