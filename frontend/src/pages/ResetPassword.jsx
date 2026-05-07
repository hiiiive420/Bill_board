import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function ResetPassword() {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 SEND OTP
  const sendOtp = async () => {

    try {

      setLoading(true);
      setError("");

      const res = await API.post(
        "/auth/send-reset-otp",
        {
          email: form.email
        }
      );

      setMessage(res.data.msg);
      setStep(2);

    } catch (err) {

      setError(
        err.response?.data?.msg ||
        "Failed to send OTP"
      );

    } finally {
      setLoading(false);
    }
  };

  // 🔹 RESET PASSWORD
  const resetPassword = async () => {

    try {

      setLoading(true);
      setError("");

      const res = await API.post(
        "/auth/reset-password",
        {
          email: form.email,
          otp: form.otp,
          newPassword: form.newPassword
        }
      );

      setMessage(res.data.msg);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {

      setError(
        err.response?.data?.msg ||
        "Reset failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F9FC] px-4 py-10">

      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-[480px] items-center">

        <div className="w-full rounded-[8px] border border-[#D8EAF5] bg-white p-8 shadow-[0_18px_45px_rgba(24,64,116,.12)]">

          <h2 className="text-3xl font-black text-[#184074]">
            Reset Password
          </h2>

          <p className="mt-2 text-sm font-semibold text-[#6B7280]">
            Securely reset your admin password.
          </p>

          {message && (
            <div className="mt-5 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <label className="mt-6 block">

                <span className="text-sm font-bold text-[#184074]">
                  Email
                </span>

                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value
                    })
                  }
                  className="mt-2 h-12 w-full rounded-md border border-[#B0CADF] bg-[#EDF4F9] px-4 text-sm font-semibold text-[#184074] outline-none focus:border-[#2092D1]"
                  placeholder="admin@example.com"
                />
              </label>

              <button
                onClick={sendOtp}
                disabled={loading}
                className="mt-7 h-12 w-full rounded-full bg-[#184074] text-sm font-black text-white transition hover:bg-[#2092D1]"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <label className="mt-6 block">

                <span className="text-sm font-bold text-[#184074]">
                  OTP
                </span>

                <input
                  type="text"
                  value={form.otp}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      otp: e.target.value
                    })
                  }
                  className="mt-2 h-12 w-full rounded-md border border-[#B0CADF] bg-[#EDF4F9] px-4 text-sm font-semibold text-[#184074]"
                  placeholder="Enter OTP"
                />
              </label>

              <label className="mt-4 block">

                <span className="text-sm font-bold text-[#184074]">
                  New Password
                </span>

                <input
                  type="password"
                  value={form.newPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      newPassword: e.target.value
                    })
                  }
                  className="mt-2 h-12 w-full rounded-md border border-[#B0CADF] bg-[#EDF4F9] px-4 text-sm font-semibold text-[#184074]"
                  placeholder="New Password"
                />
              </label>

              <button
                onClick={resetPassword}
                disabled={loading}
                className="mt-7 h-12 w-full rounded-full bg-[#184074] text-sm font-black text-white transition hover:bg-[#2092D1]"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}

        </div>
      </div>
    </main>
  );
}