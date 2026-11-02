"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
] as const;

export function BookingCard({
  title,
  price,
  departureDate,
}: {
  title: string;
  price: number | null;
  departureDate: string | null;
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const date = String(formData.get("booking-date") ?? "");

    // TODO: POST a real booking to the travel API once its checkout endpoint exists.
    toast.add({
      title: "Booking requested",
      description: `${title} · $${price ?? ""} per person${date ? ` · ${date}` : ""}`,
      type: "success",
    });
  };

  return (
    <div className="rounded-[4px] bg-white p-6 shadow-lg shadow-foreground/5 ring-1 ring-foreground/10">
      <p className="text-sm text-foreground/60">Starting from</p>
      <p className="mt-1 text-4xl font-bold tracking-tight text-brand">
        {price !== null ? `$${price}` : "—"}
      </p>
      <p className="mt-1 text-sm text-foreground/60">per person</p>

      <form onSubmit={handleSubmit} className="mt-6">
        <Input
          name="booking-date"
          type="date"
          aria-label="Booking date"
          required
          defaultValue={departureDate ?? undefined}
          className="h-10 rounded-[4px] border-transparent bg-[#eef3f7] px-4 text-sm"
        />
        <Button
          type="submit"
          className="mt-4 h-10 w-full rounded-[4px] bg-brand text-sm font-semibold text-white hover:bg-brand/90"
        >
          Book Now
          <ArrowRight data-icon="inline-end" />
        </Button>
      </form>

      <hr className="my-6 border-border" />

      <ul className="grid gap-3">
        {perks.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2.5 text-sm text-foreground/80"
          >
            <Check className="size-4 shrink-0 text-green-600" />
            {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}
