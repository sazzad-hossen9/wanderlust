import type { Metadata } from "next";
import { AddDestinationForm } from "./add-destination-form";

export const metadata: Metadata = {
  title: "Add New Travel Package | Wanderlast",
  description:
    "Create a new travel package listing with destination details, pricing and itinerary.",
};

export default function AddDestinationPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pt-10 pb-24">
      <h1 className="font-serif text-4xl">Add New Travel Package</h1>
      <AddDestinationForm />
    </main>
  );
}
