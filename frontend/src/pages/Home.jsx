import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import InDemand from "../components/InDemand";
import AllBillboards from "../components/AllBillboards";
import WhatWeDo from "../components/WhatWeDo";
import BigBanner from "../components/BigBanner";
import WhyBillboard from "../components/WhyBillboard";
import Brands from "../components/Brands";  
import Footer from "../components/Footer";

export default function Home() {
  return (
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
  );
}
