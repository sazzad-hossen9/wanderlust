"use client";

import * as React from "react";
import { cn } from "cn";
import { useCarousel } from "@/components/ui/carousel";

export function CarouselDots({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { api } = useCarousel();

  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => undefined;
      api.on("select", onStoreChange);
      api.on("reInit", onStoreChange);
      return () => {
        api.off("select", onStoreChange);
        api.off("reInit", onStoreChange);
      };
    },
    [api],
  );

  const selectedIndex = React.useSyncExternalStore(
    subscribe,
    React.useCallback(() => api?.selectedScrollSnap() ?? 0, [api]),
    () => 0,
  );

  const snapCount = React.useSyncExternalStore(
    subscribe,
    React.useCallback(() => api?.scrollSnapList().length ?? 0, [api]),
    () => 0,
  );

  // Embla initializes after mount; render nothing until snaps are known.
  if (snapCount === 0) return null;

  return (
    <div
      className={cn("flex items-center justify-center gap-2", className)}
      aria-label="Testimonial pages"
      {...props}
    >
      {Array.from({ length: snapCount }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Go to testimonials page ${index + 1}`}
          aria-current={index === selectedIndex}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            "size-2 shrink-0 cursor-pointer rounded-full bg-foreground/15 transition-all duration-300 hover:bg-foreground/30",
            index === selectedIndex && "w-6 bg-brand hover:bg-brand",
          )}
        />
      ))}
    </div>
  );
}
