import banner from "../assets/image.png";

export default function BigBanner() {
  return (
    <section className="py-16 bg-white flex justify-center">

      <div className="max-w-[1200px] w-full px-6">

        <div className="relative rounded-2xl overflow-hidden">

          {/* IMAGE */}
          <img
            src={banner}
            alt="Big Billboard"
            className="w-full object-contain"
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