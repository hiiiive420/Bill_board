export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",

    name: "SignArt",
    url: "https://signart.lk",

    logo: "https://signart.lk/logo.png",
    image: "https://signart.lk/logo.png",

    telephone: "+94775788907",
    email: "signartsadds@gmail.com",

    priceRange: "From LKR 1,500,000",

    description:
      "Billboard advertising, hoarding advertising, outdoor advertising, media placement and campaign activation services across Sri Lanka.",

    address: {
      "@type": "PostalAddress",
      addressLocality: "Dehiwala",
      addressRegion: "Colombo",
      addressCountry: "LK",
    },

    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },

    sameAs: [
      "https://www.instagram.com/sign_arts_adds",
      "https://web.facebook.com/Signartads",
      "https://api.whatsapp.com/send?phone=94775788907"
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
