import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#184074]">
      <Navbar />
      <main className="px-4 py-20 text-center">
        <p className="text-sm font-black uppercase tracking-[8px] text-[#2092D1]">404</p>
        <h1 className="mx-auto mt-4 max-w-[760px] text-[clamp(2.8rem,8vw,5.5rem)] font-black leading-none">
          This page is off the billboard.
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] text-base font-semibold leading-8 text-[#52677d]">
          The page you are looking for may have moved, or the link may be incorrect.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-[#184074] px-8 py-3 text-sm font-black text-white shadow-[0_12px_28px_rgba(24,64,116,.22)] transition hover:-translate-y-0.5"
        >
          Back Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
