import ad1 from "../assets/Mediaformat.webp";
import ad2 from "../assets/Audiance Reach.webp";
import ad3 from "../assets/creativesupport.webp";
import ad4 from "../assets/Champaign activation.webp";
import ad5 from "../assets/Casestudy.webp";

export const services = {
  billboards: {
    label: "All Billboards",
    title: "Browse Available Billboards",
    headline: "Find the billboard locations ready for your next campaign.",
    description:
      "Search our available billboard placements by location, name, description, or size, then ask for pricing directly from the listing.",
    image: ad1,
    metrics: [
      ["Search", "Find by location"],
      ["Direct", "WhatsApp inquiries"],
      ["Ready", "Campaign locations"],
    ],
    bullets: ["Browse available billboard locations", "Filter by location, name, or size", "Ask for pricing directly"],
    faq: [
  {
    question: "How much does billboard advertising cost in Sri Lanka?",
    answer:
      "Billboard advertising costs in Sri Lanka depend on the location, visibility, campaign duration, and billboard format. Premium Colombo locations generally have higher demand and reach."
  },
  {
    question: "How do I book a billboard in Sri Lanka?",
    answer:
      "You can contact SignArt with your preferred location, campaign duration, and advertising goals. Our team will help identify available billboard locations and provide pricing details."
  },
  {
    question: "What are the best billboard locations in Sri Lanka?",
    answer:
      "The best billboard locations depend on your target audience. Colombo, Dehiwala, Negombo, Kandy, and major highway routes are commonly chosen for high visibility."
  },
  {
    question: "What is the difference between billboard advertising and hoarding advertising?",
    answer:
      "Billboard advertising and hoarding advertising are often used interchangeably in Sri Lanka. Both refer to large outdoor advertising displays designed to maximize brand visibility."
  }
]
  },
  "media-formats": {
    label: "Media Formats",
    title: "Flexible Media Formats",
    headline: "Choose the billboard format that fits the story.",
    description:
      "We offer digital, static, premium roadside, and campaign-ready outdoor placements that help brands show up with the right scale and clarity.",
    image: ad2,
    metrics: [
      ["Digital", "Fast creative swaps"],
      ["Static", "Long-term presence"],
      ["Premium", "High-impact roads"],
    ],
    bullets: ["Digital and static billboard options", "Location-based format guidance", "Creative sizing support"],

    faq: [
  {
    question: "What outdoor advertising formats are available in Sri Lanka?",
    answer:
      "Outdoor advertising formats include static billboards, digital billboards, roadside hoardings, transit advertising, and large-format branding solutions."
  },
  {
    question: "Are digital billboards better than traditional billboards?",
    answer:
      "Digital billboards offer flexible content updates and multiple advertisement rotations, while traditional billboards provide continuous brand exposure."
  },
  {
    question: "How do I choose the right billboard format?",
    answer:
      "The ideal billboard format depends on campaign objectives, target audience, location, and budget."
  }
]
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

    faq: [
  {
    question: "What is outdoor campaign activation?",
    answer:
      "Outdoor campaign activation includes planning, booking, coordinating, and launching billboard advertising campaigns across selected locations."
  },
  {
    question: "Can SignArt manage the entire billboard campaign process?",
    answer:
      "Yes. SignArt can assist with location selection, media planning, creative support, billboard booking, and campaign activation."
  },
  {
    question: "How long does it take to launch a billboard campaign?",
    answer:
      "Campaign timelines vary based on billboard availability, creative approvals, and campaign requirements."
  }
]
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
  Object.keys(services).find((slug) => services[slug].label === label) || "billboards";
