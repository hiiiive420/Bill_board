import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../api/axios";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  campaignGoal: "Brand awareness",
  location: "",
  budget: "Rs. 50,000 - 100,000",
  timeline: "This month",
  message: "",
};

const goals = ["Brand awareness", "Product launch", "Store visits", "Event promotion", "Hiring campaign"];
const budgets = ["Rs. 50,000 - 100,000", "Rs. 100,000 - 250,000", "Rs. 250,000+", "Need guidance"];
const timelines = ["This month", "Next 2-3 months", "Planning ahead", "Urgent launch"];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const res = await API.post("/contact", form);
      setStatus({ type: "success", msg: res.data?.msg || "Inquiry sent successfully." });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        msg: error.response?.data?.msg || "Could not send your inquiry. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white text-[#184074]">
      <Navbar />

      <main>
        <section id="contact-top" className="relative scroll-mt-6 px-4 pb-14 pt-6 sm:pb-16 lg:pt-8">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[420px_1fr] lg:items-start">
            <div className="relative rounded-[28px] bg-[#184074] p-6 text-white shadow-[0_24px_60px_rgba(24,64,116,.18)] sm:p-8 lg:sticky lg:top-6">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-[90px] bg-[#2092D1]/25" />
              <p className="relative mb-3 text-sm font-black uppercase tracking-[8px] text-[#7ec8f7] sm:text-base">
                Contact Sign Art
              </p>
              <h1 className="relative text-[clamp(2.7rem,6vw,4.8rem)] font-black leading-[.92] text-white">
                Tell Us What You Need Seen
              </h1>
              <p className="relative mt-5 text-sm font-semibold leading-7 text-white/75 sm:text-base">
                Share your campaign goal, location, budget, and timing. We will help you choose the right billboard space and creative direction.
              </p>

              <div className="relative mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ["01", "Plan the location"],
                  ["02", "Shape the message"],
                  ["03", "Launch with clarity"],
                ].map(([number, label]) => (
                  <div key={label} className="rounded-[8px] bg-white/10 p-4 ring-1 ring-white/15">
                    <p className="text-sm font-black text-[#7ec8f7]">{number}</p>
                    <p className="mt-2 text-sm font-black leading-5 text-white">{label}</p>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 rounded-[18px] bg-white p-5 text-[#184074]">
                <p className="text-lg font-black">Prefer direct contact?</p>
                <div className="mt-4 grid gap-2 text-sm font-bold text-[#52677d]">
                  <p>Email: signartsadds@gmail.com</p>
                  <p>Phone: +94 77 578 8907</p>
                  <p>Location: Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>

            <form
              id="campaign-inquiry"
              onSubmit={handleSubmit}
              className="rounded-[28px] border border-[#D8ECF7] bg-white p-5 shadow-[0_24px_70px_rgba(24,64,116,.1)] sm:p-7 lg:p-8"
            >
              <div className="mb-6 flex flex-col gap-2 border-b border-[#D8ECF7] pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-[4px] text-[#2092D1]">Campaign Brief</p>
                  <h2 className="mt-2 text-2xl font-black text-[#184074]">Send your requirement</h2>
                </div>
                <p className="text-sm font-bold text-[#647789]">Reply within 24 hours</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={form.name} onChange={(value) => updateField("name", value)} required />
                <Field label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} required />
                <Field label="Phone" value={form.phone} onChange={(value) => updateField("phone", value)} />
                <Field label="Company" value={form.company} onChange={(value) => updateField("company", value)} />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <SelectField label="Campaign goal" value={form.campaignGoal} options={goals} onChange={(value) => updateField("campaignGoal", value)} />
                <Field label="Preferred location" value={form.location} onChange={(value) => updateField("location", value)} required />
                <SelectField label="Budget" value={form.budget} options={budgets} onChange={(value) => updateField("budget", value)} />
                <SelectField label="Timeline" value={form.timeline} options={timelines} onChange={(value) => updateField("timeline", value)} />
              </div>

              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-black text-[#184074]">Tell us the need</span>
                <textarea
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  required
                  rows={5}
                  placeholder="Example: We need a premium billboard near Colombo for a product launch..."
                  className="w-full resize-none rounded-[8px] border border-[#C9E4F3] bg-[#F8FCFE] px-4 py-3 text-sm font-semibold text-[#184074] outline-none transition focus:border-[#2092D1] focus:bg-white focus:ring-4 focus:ring-[#2092D1]/10"
                />
              </label>

              {status.msg && (
                <p
                  className={`mt-4 rounded-[8px] px-4 py-3 text-sm font-black ${
                    status.type === "success"
                      ? "bg-[#2092D1]/10 text-[#184074]"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {status.msg}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-[#184074] to-[#2092D1] px-8 py-4 text-sm font-black text-white shadow-[0_14px_30px_rgba(24,64,116,.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Sending Inquiry..." : "Send Campaign Inquiry"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-[#184074]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="h-11 w-full rounded-[8px] border border-[#C9E4F3] bg-[#F8FCFE] px-4 text-sm font-semibold text-[#184074] outline-none transition focus:border-[#2092D1] focus:bg-white focus:ring-4 focus:ring-[#2092D1]/10"
      />
    </label>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-[#184074]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-[8px] border border-[#C9E4F3] bg-[#F8FCFE] px-4 text-sm font-semibold text-[#184074] outline-none transition focus:border-[#2092D1] focus:bg-white focus:ring-4 focus:ring-[#2092D1]/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
