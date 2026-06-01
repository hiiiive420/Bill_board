import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import notFoundImage from "../assets/404.webp";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#184074]">
      <Navbar />
      <main className="px-4 py-14 text-center sm:py-20">
        <img
          src={notFoundImage}
          alt="404 page not found"
          className="mx-auto w-full max-w-[520px] object-contain sm:max-w-2xl"
        />
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-[#184074] px-8 py-3 text-sm font-black text-white shadow-[0_12px_28px_rgba(24,64,116,.22)] transition hover:-translate-y-0.5 sm:mt-10"
        >
          Back Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
