import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please check your admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F9FC] px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-[1120px] items-center gap-8 lg:grid-cols-[1fr_430px]">
        <section className="hidden lg:block">
          <p className="mb-4 text-sm font-black uppercase tracking-[2px] text-[#2092D1]">
            Admin Console
          </p>
          <h1 className="max-w-[620px] text-[clamp(3rem,6vw,5rem)] font-black leading-none text-[#184074]">
            Manage Billboard Inventory
          </h1>
          <p className="mt-6 max-w-[560px] text-lg font-semibold leading-8 text-[#52606C]">
            Add new placements, keep campaign-ready billboards updated, and control what appears
            in demand across the public site.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="rounded-[8px] border border-[#D8EAF5] bg-white p-6 shadow-[0_18px_45px_rgba(24,64,116,.12)] sm:p-8"
        >
          <h2 className="text-2xl font-black leading-none text-[#184074]">Admin Login</h2>
          <p className="mt-2 text-sm font-semibold text-[#6B7280]">
            Sign in with your administrator account.
          </p>

          {error && (
            <p className="mt-5 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <label className="mt-6 block">
            <span className="text-sm font-bold text-[#184074]">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 h-12 w-full rounded-md border border-[#B0CADF] bg-[#EDF4F9] px-4 text-sm font-semibold text-[#184074] outline-none transition focus:border-[#2092D1] focus:bg-white"
              placeholder="admin@example.com"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-bold text-[#184074]">Password</span>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-2 h-12 w-full rounded-md border border-[#B0CADF] bg-[#EDF4F9] px-4 text-sm font-semibold text-[#184074] outline-none transition focus:border-[#2092D1] focus:bg-white"
              placeholder="Enter password"
            />
          </label>
<div className="mt-3 flex justify-end">
  <button
    type="button"
    onClick={() => navigate("/reset-password")}
    className="text-sm font-semibold text-[#2092D1] hover:underline"
  >
    Forgot Password?
  </button>
</div>
          <button
            type="submit"
            disabled={loading}
            className="mt-7 h-12 w-full rounded-full bg-[#184074] text-sm font-black text-white shadow-[0_10px_22px_rgba(24,64,116,.18)] transition hover:bg-[#2092D1] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
