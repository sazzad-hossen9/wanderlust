"use client";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock, Eye, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export type Booking = {
  _id: string;
  id: string;
  title: string;
  image: string;
  price: number;
  departureDate: string;
  status?: "Confirmed" | "Pending";
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function BookingCard({ booking }: { booking: Booking }) {
  const status = booking.status ?? "Confirmed";
  const isConfirmed = status === "Confirmed";

  const handleCancelButton = async () => {
    const res = await fetch(`http://localhost:5000/my-booking/${booking._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    redirect("/my-bookings");
  };

  return (
    <div className="flex flex-col gap-4 rounded-sm border border-gray-200 bg-white p-3 sm:flex-row">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={booking.image}
        alt={booking.title}
        className="h-44 w-full rounded-sm object-cover sm:h-[133px] sm:w-[235px]"
      />

      <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              isConfirmed
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {isConfirmed ? <CheckCircle2 size={14} /> : <Clock size={14} />}
            {status}
          </span>

          <h2 className="mt-2 text-2xl font-medium text-gray-900">
            {booking.title}
          </h2>

          <div className="mt-2 space-y-1 text-xs text-gray-500">
            <p className="flex items-center gap-2">
              <CalendarDays size={14} />
              Departure: {formatDate(booking.departureDate)}
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={14} />
              Booking ID: {booking._id}
            </p>
          </div>

          <p className="mt-2 text-2xl font-semibold text-[#1a9bbf]">
            ${booking.price}
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleCancelButton} variant={"destructive"}>
            cancel
          </Button>
          <Link
            href={`/destinations/${booking.id}`}
            className="flex items-center gap-2 rounded-sm bg-[#1a9bbf] px-5 py-2 text-xs font-medium text-white hover:opacity-90"
          >
            <Eye size={14} />
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
