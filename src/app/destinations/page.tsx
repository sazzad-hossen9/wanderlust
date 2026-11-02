import Image from "next/image";
import Link from "next/link";

// Fetches the external travel API at request time — a static prerender at
// `next build` would fail when the backend isn't running.
export const dynamic = "force-dynamic";

export type Destination = {
  _id: string;
  "destination-name": string;
  country: string;
  category: string;
  price: string;
  duration: string;
  "departure-date": string;
  "image-url": string;
  description: string;
};
const DestinationCard = async () => {
  const res = await fetch("http://localhost:5000/destinations");
  const data = await res.json();
  return (
    <div className=" container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((destination: Destination) => (
        <div
          key={destination._id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          {/* Image */}
          <div className="relative">
            <Image
              src={destination["image-url"]}
              alt={destination["destination-name"]}
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />

            <span className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {destination.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-5">
            <h2 className="text-2xl font-bold text-gray-900">
              {destination["destination-name"]}
            </h2>

            <p className="text-gray-500 mt-2">📍 {destination.country}</p>

            <div className="grid grid-cols-3 gap-2 border-y py-4 my-4">
              <div>
                <p className="font-bold text-lg">${destination.price}</p>
                <p className="text-sm text-gray-500">Price</p>
              </div>

              <div>
                <p className="font-semibold text-sm">
                  {destination["departure-date"]}
                </p>
                <p className="text-sm text-gray-500">Departure</p>
              </div>

              <div>
                <p className="font-semibold text-sm">{destination.duration}</p>
                <p className="text-sm text-gray-500">Duration</p>
              </div>
            </div>

            <p className="text-gray-600 mb-5">{destination.description}</p>

            <Link
              href={`/destinations/${destination._id}`}
              className="block text-center bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
            >
              View Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DestinationCard;
