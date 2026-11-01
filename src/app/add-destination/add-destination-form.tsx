"use client";

import * as React from "react";
import { Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

const categories = [
  "Beach",
  "Mountain",
  "Adventure",
  "Honeymoon",
  "Cultural",
  "Wildlife",
] as const;

const fieldClasses =
  "rounded-[4px] border-transparent bg-[#eef3f7] px-4 placeholder:text-neutral-400";

export function AddDestinationForm() {
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const res= await fetch(`http://localhost:5000/add-destination`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const submitData=await res.json()

console.log(submitData)

    // TODO: persist `data` via a server action / API route once a backend exists.
    toast.add({
      title: "Travel package added",
      description: `“${data["destination-name"]}” has been saved as a draft.`,
      type: "success",
    });
    // event.currentTarget.reset();
  };

  return (
    <Card className="mx-auto mt-12 w-full max-w-md rounded-[4px] [--card-spacing:--spacing(6)]">
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid gap-x-6 gap-y-4"
          noValidate
        >
          <div className="grid gap-1.5">
            <Label htmlFor="destination-name" className="font-semibold">
              Destination Name
            </Label>
            <Input
              id="destination-name"
              name="destination-name"
              required
              placeholder="Bali Paradise"
              className={fieldClasses}
            />
          </div>

          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="country" className="font-semibold">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                required
                placeholder="Indonesia"
                className={fieldClasses}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="category" className="font-semibold">
                Category
              </Label>
              <Select name="category">
                <SelectTrigger
                  id="category"
                  aria-label="Category"
                  className={`${fieldClasses} w-full`}
                >
                  <SelectValue placeholder="Beach" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="price" className="font-semibold">
                Price (USD)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                required
                placeholder="e.g., 1299"
                className={fieldClasses}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="duration" className="font-semibold">
                Duration
              </Label>
              <Input
                id="duration"
                name="duration"
                required
                placeholder="e.g., 7 Days/5 Nights"
                className={fieldClasses}
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="departure-date" className="font-semibold">
              Departure Date
            </Label>
            <Input
              id="departure-date"
              name="departure-date"
              type="date"
              required
              className={fieldClasses}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="image-url" className="font-semibold">
              Image URL
            </Label>
            <Input
              id="image-url"
              name="image-url"
              type="url"
              placeholder="https://example.com/image.jpg"
              className={fieldClasses}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="description" className="font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the travel experience..."
              className={`${fieldClasses} h-24 py-3`}
            />
          </div>

          <div className="mt-1 flex items-center justify-end gap-2">
            <Button
              type="reset"
              variant="outline"
              className="rounded-[4px] border-red-300 px-4 text-red-500 hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 data-icon="inline-start" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-[4px] bg-brand px-4 text-white hover:bg-brand/90"
            >
              <Save data-icon="inline-start" />
              Add Travel Package
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
