import banner from "../assets/image.webp";

export default function BigBanner() {
  return (
    <section className="flex justify-center overflow-hidden bg-white pb-3 pt-8 sm:py-16">

      <div className="w-full max-w-[1200px] px-2 sm:px-6">

        <div className="relative rounded-2xl overflow-hidden">

          {/* IMAGE */}
          <img
            src={banner}
            alt="Big Billboard"
            className="w-full scale-[1.08] object-contain sm:scale-100"
          />

          {/* OPTIONAL OVERLAY TEXT (if you want dynamic instead of image text) */}
          {/* 
          <div className="absolute inset-0 flex items-center justify-between px-10">
            <h2 className="text-white text-5xl font-black">BIG</h2>
            <div className="text-right text-black">
              <h3 className="text-3xl font-bold">SPACE</h3>
              <p className="text-sm">Big Impact</p>
            </div>
          </div>
          */}

        </div>

      </div>
    </section>
  );
}
