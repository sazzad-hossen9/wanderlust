import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingCard, { type Booking } from "@/components/BookingCard";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.email) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-gray-600">Please log in to view your bookings.</p>
      </div>
    );
  }

  const res = await fetch(`http://localhost:5000/my-booking/${user.email}`, {
    cache: "no-store",
  });
  const data = res.ok ? await res.json() : [];
  const bookings: Booking[] = Array.isArray(data) ? data : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-medium text-gray-900">My Bookings</h1>
      <p className="mt-2 mb-8 text-sm text-gray-500">
        Manage and view your upcoming travel plans
      </p>

      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
