import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const items = [
  ["Information We Collect", "We may collect contact details, campaign inquiry details, and communication information shared through forms, calls, WhatsApp, or email."],
  ["How We Use Information", "We use submitted details to respond to inquiries, prepare campaign recommendations, confirm billboard availability, and improve our service experience."],
  ["Data Sharing", "We do not sell personal information. Details may be shared only with trusted service partners when required to support a campaign request."],
  ["Contact", "For privacy questions, contact SignArt through the contact page or the phone number listed on this website."],
];

export default function Policy() {
  return (
    <div className="min-h-screen bg-white text-[#184074]">
      <Navbar />
      <main className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-[980px]">
          <p className="text-sm font-black uppercase tracking-[8px] text-[#2092D1]">Policy</p>
          <h1 className="mt-4 text-[clamp(2.6rem,7vw,5rem)] font-black leading-none">Privacy Policy</h1>
          <div className="mt-10 grid gap-4">
            {items.map(([title, text]) => (
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
