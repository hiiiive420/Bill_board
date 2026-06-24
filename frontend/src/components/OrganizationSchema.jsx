export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AdvertisingAgency",
    name: "SignArt",
    url: "https://signart.lk",
    telephone: "+94775788907",
    email: "signartsadds@gmail.com",
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
    services: [
      "Billboard Advertising",
      "Outdoor Advertising",
      "Hoarding Advertising",
      "Media Placement",
      "Campaign Activation",
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