import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-white text-[#184074]">
      <Navbar />
      <main className="px-4 py-20 text-center">
        <p className="text-sm font-black uppercase tracking-[8px] text-[#2092D1]">Error</p>
        <h1 className="mx-auto mt-4 max-w-[760px] text-[clamp(2.6rem,8vw,5.2rem)] font-black leading-none">
          Something went wrong.
        </h1>
        <p className="mx-auto mt-6 max-w-[560px] text-base font-semibold leading-8 text-[#52677d]">
          Please refresh the page or return home and try again.
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
