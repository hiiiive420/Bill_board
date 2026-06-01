import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const emptyForm = {
  location: "",
  description: "",
  width: "",
  height: "",
  isAvailable: true,
  isInDemand: false,
};

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const Admin = () => {
  const [billboards, setBillboards] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const previewObjectUrl = useRef("");
  const navigate = useNavigate();

  const stats = useMemo(
    () => ({
      total: billboards.length,
      available: billboards.filter((b) => b.isAvailable).length,
      inDemand: billboards.filter((b) => b.isInDemand).length,
    }),
    [billboards]
  );

  const loadBillboards = async () => {
    setPageLoading(true);
    try {
      const res = await API.get("/billboards");
      setBillboards(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Unable to load billboards");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    let active = true;

    API.get("/billboards")
      .then((res) => {
        if (active) setBillboards(res.data);
      })
      .catch((err) => {
        if (active) setError(err.response?.data?.msg || "Unable to load billboards");
      })
      .finally(() => {
        if (active) setPageLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (previewObjectUrl.current) URL.revokeObjectURL(previewObjectUrl.current);
    };
  }, []);

  const revokePreviewObjectUrl = () => {
    if (!previewObjectUrl.current) return;
    URL.revokeObjectURL(previewObjectUrl.current);
    previewObjectUrl.current = "";
  };

  const updateImage = (file) => {
    revokePreviewObjectUrl();
    setImage(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      previewObjectUrl.current = objectUrl;
      setPreview(objectUrl);
      return;
    }

    const currentImage = editingId
      ? billboards.find((billboard) => billboard._id === editingId)?.image || ""
      : "";
    setPreview(currentImage);
  };

  const resetForm = () => {
    revokePreviewObjectUrl();
    setForm(emptyForm);
    setImage(null);
    setPreview("");
    setEditingId(null);
  };

  const handleAuthError = (err) => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      localStorage.removeItem("token");
      navigate("/login");
      return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!editingId && !image) {
      setError("Please add an image for the billboard.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (image) formData.append("image", image);
      formData.append("location", form.location);
      formData.append("description", form.description);
      formData.append("width", form.width);
      formData.append("height", form.height);
      formData.append("isAvailable", form.isAvailable ? "true" : "false");
      formData.append("isInDemand", form.isInDemand ? "true" : "false");

      if (editingId) {
        const res = await API.put(`/billboards/${editingId}`, formData, {
          headers: authHeader(),
        });
        setBillboards((items) => items.map((item) => (item._id === editingId ? res.data : item)));
        setMessage("Billboard updated successfully.");
      } else {
        const res = await API.post("/billboards", formData, {
          headers: authHeader(),
        });
        setBillboards((items) => [res.data, ...items]);
        setMessage("Billboard created successfully.");
      }

      resetForm();
    } catch (err) {
      if (!handleAuthError(err)) {
        setError(err.response?.data?.msg || err.response?.data?.error || "Save failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (billboard) => {
    revokePreviewObjectUrl();
    setEditingId(billboard._id);
    setImage(null);
    setPreview(billboard.image);
    setForm({
      location: billboard.location || "",
      description: billboard.description || "",
      width: billboard.width || "",
      height: billboard.height || "",
      isAvailable: Boolean(billboard.isAvailable),
      isInDemand: Boolean(billboard.isInDemand),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteBillboard = async (id) => {
    const ok = window.confirm("Delete this billboard from the admin inventory?");
    if (!ok) return;

    setError("");
    setMessage("");

    try {
      await API.delete(`/billboards/${id}`, { headers: authHeader() });
      setBillboards((items) => items.filter((item) => item._id !== id));
      if (editingId === id) resetForm();
      setMessage("Billboard deleted.");
    } catch (err) {
      if (!handleAuthError(err)) {
        setError(err.response?.data?.msg || err.response?.data?.error || "Delete failed");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-[#F5F9FC] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1320px]">
        <header className="flex flex-col justify-between gap-4 border-b border-[#D8EAF5] pb-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[2px] text-[#2092D1]">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-[clamp(2rem,5vw,3.5rem)] font-black leading-none text-[#184074]">
              Billboard Manager
            </h1>
          </div>

          <button
            type="button"
            onClick={logout}
            className="h-11 w-fit rounded-full border border-[#B0CADF] bg-white px-6 text-sm font-black text-[#184074] transition hover:border-[#2092D1] hover:text-[#2092D1]"
          >
            Logout
          </button>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["Total Billboards", stats.total],
            ["Available", stats.available],
            ["In Demand", stats.inDemand],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[8px] border border-[#D8EAF5] bg-white p-5">
              <p className="text-sm font-bold text-[#6B7280]">{label}</p>
              <p className="mt-2 text-3xl font-black text-[#184074]">{value}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[390px_minmax(0,1fr)]">
          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-[8px] border border-[#D8EAF5] bg-white p-5 shadow-[0_12px_30px_rgba(24,64,116,.08)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-black text-[#184074]">
                  {editingId ? "Edit Billboard" : "Create Billboard"}
                </h2>
                <p className="mt-1 text-sm font-semibold text-[#6B7280]">
                  Keep dimensions, descriptions, visibility, and featured status current.
                </p>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full bg-[#EDF4F9] px-4 py-2 text-xs font-black text-[#2092D1]"
                >
                  New
                </button>
              )}
            </div>

            {(message || error) && (
              <p
                className={[
                  "mt-4 rounded-md px-4 py-3 text-sm font-bold",
                  error
                    ? "border border-red-100 bg-red-50 text-red-600"
                    : "border border-emerald-100 bg-emerald-50 text-emerald-700",
                ].join(" ")}
              >
                {error || message}
              </p>
            )}

            <label className="mt-5 block">
              <span className="text-sm font-bold text-[#184074]">Image</span>
              <input
                type="file"
                accept="image/*"
                required={!editingId}
                onChange={(e) => updateImage(e.target.files?.[0] || null)}
                className="mt-2 block w-full text-sm font-semibold text-[#52606C] file:mr-4 file:rounded-full file:border-0 file:bg-[#2092D1] file:px-4 file:py-2 file:text-sm file:font-black file:text-white"
              />
            </label>

            {preview && (
              <div className="mt-4 aspect-[16/10] overflow-hidden rounded-[8px] bg-[#D9D9D9]">
                <img src={preview} alt="Billboard preview" className="h-full w-full object-cover" />
              </div>
            )}

            <label className="mt-4 block">
              <span className="text-sm font-bold text-[#184074]">Location</span>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="mt-2 h-11 w-full rounded-md border border-[#B0CADF] bg-[#EDF4F9] px-3 text-sm font-semibold text-[#184074] outline-none focus:border-[#2092D1] focus:bg-white"
                placeholder="Colombo 03"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-sm font-bold text-[#184074]">Description</span>
              <textarea
                required
                maxLength="240"
                rows="4"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="mt-2 w-full resize-none rounded-md border border-[#B0CADF] bg-[#EDF4F9] px-3 py-3 text-sm font-semibold text-[#184074] outline-none focus:border-[#2092D1] focus:bg-white"
                placeholder="Short note about visibility, nearby area, or campaign fit"
              />
              <span className="mt-1 block text-xs font-semibold text-[#6B7280]">
                {form.description.length}/240 characters
              </span>
            </label>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-sm font-bold text-[#184074]">Width ft</span>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.width}
                  onChange={(e) => setForm({ ...form, width: e.target.value })}
                  className="mt-2 h-11 w-full rounded-md border border-[#B0CADF] bg-[#EDF4F9] px-3 text-sm font-semibold text-[#184074] outline-none focus:border-[#2092D1] focus:bg-white"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-[#184074]">Height ft</span>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: e.target.value })}
                  className="mt-2 h-11 w-full rounded-md border border-[#B0CADF] bg-[#EDF4F9] px-3 text-sm font-semibold text-[#184074] outline-none focus:border-[#2092D1] focus:bg-white"
                />
              </label>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded-md border border-[#D8EAF5] p-3">
                <input
                  type="checkbox"
                  checked={form.isAvailable}
                  onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
                  className="h-4 w-4 accent-[#2092D1]"
                />
                <span className="text-sm font-bold text-[#184074]">Available</span>
              </label>

              <label className="flex items-center gap-3 rounded-md border border-[#D8EAF5] p-3">
                <input
                  type="checkbox"
                  checked={form.isInDemand}
                  onChange={(e) => setForm({ ...form, isInDemand: e.target.checked })}
                  className="h-4 w-4 accent-[#2092D1]"
                />
                <span className="text-sm font-bold text-[#184074]">In Demand</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 h-12 w-full rounded-full bg-[#184074] text-sm font-black text-white transition hover:bg-[#2092D1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Saving..." : editingId ? "Save Changes" : "Create Billboard"}
            </button>
          </form>

          <section className="rounded-[8px] border border-[#D8EAF5] bg-white shadow-[0_12px_30px_rgba(24,64,116,.08)]">
            <div className="flex flex-col justify-between gap-2 border-b border-[#D8EAF5] p-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-black text-[#184074]">Maintain Billboards</h2>
                <p className="mt-1 text-sm font-semibold text-[#6B7280]">
                  View, edit, and remove active inventory.
                </p>
              </div>
              <button
                type="button"
                onClick={loadBillboards}
                className="h-10 w-fit rounded-full bg-[#EDF4F9] px-5 text-sm font-black text-[#2092D1]"
              >
                Refresh
              </button>
            </div>

            {pageLoading ? (
              <p className="p-6 text-sm font-bold text-[#6B7280]">Loading billboards...</p>
            ) : billboards.length === 0 ? (
              <p className="p-6 text-sm font-bold text-[#6B7280]">No billboards created yet.</p>
            ) : (
              <div className="grid gap-4 p-5 xl:grid-cols-2">
                {billboards.map((billboard) => (
                  <article
                    key={billboard._id}
                    className="grid gap-4 rounded-[8px] border border-[#D8EAF5] p-3 sm:grid-cols-[132px_1fr]"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-[8px] bg-[#D9D9D9]">
                      {billboard.image && (
                        <img
                          src={billboard.image}
                          alt={billboard.location}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-base font-black text-[#184074]">
                        {billboard.location}
                      </h3>
                      <p className="mt-1 text-sm font-bold text-[#52606C]">
                        {billboard.width}ft x {billboard.height}ft
                      </p>
                      {billboard.description && (
                        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-[#6B7280]">
                          {billboard.description}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span
                          className={[
                            "rounded-full px-3 py-1 text-xs font-black",
                            billboard.isAvailable
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-500",
                          ].join(" ")}
                        >
                          {billboard.isAvailable ? "Available" : "Unavailable"}
                        </span>
                        {billboard.isInDemand && (
                          <span className="rounded-full bg-[#EDF4F9] px-3 py-1 text-xs font-black text-[#2092D1]">
                            In Demand
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(billboard)}
                          className="h-9 rounded-full bg-[#2092D1] px-4 text-xs font-black text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteBillboard(billboard._id)}
                          className="h-9 rounded-full bg-red-50 px-4 text-xs font-black text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Admin;
