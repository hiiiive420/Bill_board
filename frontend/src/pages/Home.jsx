import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import InDemand from "../components/InDemand";
import AllBillboards from "../components/AllBillboards";
import WhatWeDo from "../components/WhatWeDo";
import BigBanner from "../components/BigBanner";
import WhyBillboard from "../components/WhyBillboard";
import Brands from "../components/Brands";
import Footer from "../components/Footer";
import OrganizationSchema from "../components/OrganizationSchema";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          SignArt | Billboard Advertising Sri Lanka & Outdoor Advertising Solutions
        </title>

        <meta
          name="description"
          content="Leading outdoor advertising company in Sri Lanka offering billboard advertising, hoarding campaigns, media placement, campaign activation, and islandwide brand visibility solutions."
        />

        <meta
          name="keywords"
          content="billboard advertising sri lanka, outdoor advertising sri lanka, hoarding advertising sri lanka, billboard booking sri lanka, outdoor campaign sri lanka"
        />

        <link rel="canonical" href="https://signart.lk/" />
      </Helmet>

      <OrganizationSchema />

      <div className="min-h-screen overflow-x-hidden bg-white">
        <Navbar />
        <Hero />
        <InDemand />
        <AllBillboards preview />
        <WhatWeDo />
        <BigBanner />
        <WhyBillboard />
        <Brands />
        <Footer />
      </div>
    </>
  );
}