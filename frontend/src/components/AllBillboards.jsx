import { useEffect, useRef, useState } from "react";
import API from "../api/axios";
import BillboardCard from "./BillboardCard";

export default function AllBillboards() {
  const [billboards, setBillboards] = useState([]);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/billboards");
        setBillboards(res.data);
      } catch {
        setBillboards(
          Array.from({ length: 6 }, (_, i) => ({
            _id: String(i),
            image: "",
            size: "12ft x 8ft",
            address: "No.45, Galle Road, Colombo 03",
            price: "Rs. 45,000/mo",
          }))
        );
      }
    })();
  }, []);

  const filtered = billboards.filter((b) => {
    const q = search.toLowerCase().replace(/\s+/g, "");
    const name = b.name?.toLowerCase().replace(/\s+/g, "") || "";
    const location = (b.location || b.address || "").toLowerCase().replace(/\s+/g, "");
    const description = (b.description || "").toLowerCase().replace(/\s+/g, "");
    const size =
      b.width && b.height
        ? `${b.width}x${b.height}`
        : (b.size || "").toLowerCase().replace(/\s+/g, "");

    return !q || name.includes(q) || location.includes(q) || description.includes(q) || size.includes(q);
  });

  const normalizedSearch = search.trim().toLowerCase();
  const suggestions = Array.from(
    new Set(
      billboards
        .flatMap((b) => [b.location, b.address, b.name].filter(Boolean))
        .map((value) => value.trim())
        .filter((value) => value.toLowerCase().includes(normalizedSearch))
    )
  ).slice(0, 6);

  const shouldShowSuggestions = showSuggestions && normalizedSearch && suggestions.length > 0;

  const selectSuggestion = (value) => {
    setSearch(value);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  return (
    <section id="billboards" className="scroll-mt-6 flex flex-col items-center bg-white px-4 py-14 sm:py-16">
      <h2 className="mb-5 text-center text-[clamp(1.75rem,5vw,2.25rem)] font-black leading-none text-[#184074]">
        Stay In Their <span className="text-[#2092D1]">MINDS</span>
      </h2>

      <div className="relative mb-10 w-full max-w-[320px] sm:mb-12">
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex h-11 cursor-text items-center gap-2 rounded-full border border-[#B0CADF] bg-[#EDF4F9] px-4"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="#2092D1" strokeWidth="2" />
            <path d="M13 13l3.5 3.5" stroke="#2092D1" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Find YourView..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setShowSuggestions(false);
              if (e.key === "Enter" && suggestions[0]) selectSuggestion(suggestions[0]);
            }}
            className="min-w-0 flex-1 bg-transparent text-sm text-[#2092D1] outline-none placeholder:text-[#2092D1]/70"
            role="combobox"
            aria-expanded={shouldShowSuggestions}
            aria-controls="billboard-search-suggestions"
            aria-autocomplete="list"
          />
          {search && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSearch("");
                setShowSuggestions(false);
              }}
              className="grid h-6 w-6 place-items-center rounded-full text-lg leading-none text-[#2092D1]"
              aria-label="Clear search"
            >
              x
            </button>
          )}
        </div>

        {shouldShowSuggestions && (
          <div
            id="billboard-search-suggestions"
            className="absolute left-0 right-0 top-[50px] z-20 overflow-hidden rounded-[18px] border border-[#D8EAF5] bg-white shadow-[0_12px_28px_rgba(24,64,116,.14)]"
            role="listbox"
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectSuggestion(suggestion)}
                className="block w-full px-4 py-3 text-left text-sm font-semibold text-[#184074] transition hover:bg-[#EDF4F9] hover:text-[#2092D1]"
                role="option"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid w-full max-w-[1120px] grid-cols-[repeat(auto-fit,minmax(min(100%,250px),320px))] justify-center gap-7 sm:gap-10">
        {filtered.map((item) => (
          <BillboardCard key={item._id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-base text-gray-400">No billboards found for "{search}"</p>
      )}
    </section>
  );
}
