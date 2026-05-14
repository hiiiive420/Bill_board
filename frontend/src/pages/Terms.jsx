import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const terms = [
  ["Campaign Requests", "Billboard availability, pricing, and campaign dates are confirmed after direct communication with the SignArt team."],
  ["Creative Materials", "Clients are responsible for providing accurate campaign content. Artwork may need formatting to match selected billboard specifications."],
  ["Bookings", "A billboard placement is not reserved until availability, campaign duration, and payment terms are confirmed."],
  ["Website Use", "The content on this website is provided for general information and may be updated without prior notice."],
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-white text-[#184074]">
      <Navbar />
      <main className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-[980px]">
          <p className="text-sm font-black uppercase tracking-[8px] text-[#2092D1]">Terms</p>
          <h1 className="mt-4 text-[clamp(2.6rem,7vw,5rem)] font-black leading-none">Terms and Conditions</h1>
          <div className="mt-10 grid gap-4">
            {terms.map(([title, text]) => (
              <article key={title} className="rounded-[8px] border border-[#C9E4F3] bg-[#F4FAFE] p-6">
                <h2 className="text-xl font-black">{title}</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#52677d]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
