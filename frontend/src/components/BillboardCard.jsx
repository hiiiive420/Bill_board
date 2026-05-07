const BillboardCard = ({ billboard }) => {
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 ${
        !billboard.isAvailable && "opacity-60 pointer-events-none"
      }`}
    >
      {/* Image */}
      <img
        src={billboard.image}
        className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
      />

      {/* Overlay for unavailable */}
      {!billboard.isAvailable && (
        <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center text-white font-semibold text-lg">
          Unavailable
        </div>
      )}

      {/* Content */}
      <div className="p-4 bg-white">
        <h2 className="text-lg font-semibold text-gray-800">
          {billboard.location}
        </h2>

        <p className="text-sm text-gray-500">
          Size: {billboard.width} x {billboard.height}
        </p>
      </div>
    </div>
  );
};

export default BillboardCard;