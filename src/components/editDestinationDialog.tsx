"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Pencil, Loader2 } from "lucide-react";

// Destination Type
type DestinationDetail = {
  id: string;
  title: string;
  country: string;
  category: string | null;
  price: number | null;
  duration: string | null;
  departureDate: string | null;
  image: string | null;
  overview: string;
};

// Props Type
type EditDestinationDialogProps = {
  detail: DestinationDetail;
};

export default function EditDestinationDialog({
  detail,
}: EditDestinationDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: detail.title,
    country: detail.country,
    category: detail.category ?? "",
    price: detail.price?.toString() ?? "",
    duration: detail.duration ?? "",
    departureDate: detail.departureDate ?? "",
    image: detail.image ?? "",
    description: detail.overview,
  });

  const [message, setMessage] = useState("");

  // Input Change Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update Destination
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5000/destination/${detail.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            "destination-name": formData.title,
            country: formData.country,
            category: formData.category,
            price: formData.price,
            duration: formData.duration,
            "departure-date": formData.departureDate,
            "image-url": formData.image,
            description: formData.description,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update destination");
      }

      setMessage("Destination updated successfully!");

      setOpen(false);

      // Refresh current page data
      window.location.reload();
    } catch (error) {
      console.error(error);

      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Edit Button */}

      <DialogTrigger >
        <Button variant="outline" className="h-9 rounded-[4px] px-4 text-sm">
          <Pencil className="mr-2 size-4" />
          Edit
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>

          <DialogDescription>
            Update your destination information below.
          </DialogDescription>
        </DialogHeader>

        {/* Edit Form */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Destination Name */}

          <div className="space-y-2">
            <Label htmlFor="title">Destination Name</Label>

            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter destination name"
              required
            />
          </div>

          {/* Country */}

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>

            <Input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              required
            />
          </div>

          {/* Category */}

          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  category: value ?? "",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Adventure">Adventure</SelectItem>

                <SelectItem value="Beach">Beach</SelectItem>

                <SelectItem value="Cultural">Cultural</SelectItem>

                <SelectItem value="Relaxation">Relaxation</SelectItem>

                <SelectItem value="Nature">Nature</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>

            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          {/* Duration */}

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>

            <Input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Example: 5 Days / 4 Nights"
            />
          </div>

          {/* Departure Date */}

          <div className="space-y-2">
            <Label htmlFor="departureDate">Departure Date</Label>

            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={handleChange}
            />
          </div>

          {/* Image URL */}

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>

            <Input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </div>

          {/* Description */}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter destination description"
              rows={5}
            />
          </div>

          {/* Message */}

          {message && <p className="text-sm text-red-500">{message}</p>}

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
