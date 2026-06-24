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
  description:
    "Billboard advertising, hoarding advertising, outdoor advertising, media placement and campaign activation services across Sri Lanka.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dehiwala",
    addressRegion: "Colombo",
    addressCountry": "LK"
  },
  areaServed: {
    "@type": "Country",
    name: "Sri Lanka"
  }
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
