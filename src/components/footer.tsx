import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/profile", label: "My Profile" },
] as const;

const supportLinks = [
  { href: "/help-center", label: "Help Center" },
  { href: "/terms-of-service", label: "Terms Of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
] as const;

// lucide-react no longer ships brand icons — define them inline.
function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0Z" />
    </svg>
  );
}

function InstagramLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const socials = [
  { href: "#", label: "Wanderlast on X", Logo: XLogo },
  { href: "#", label: "Wanderlast on LinkedIn", Logo: LinkedInLogo },
  { href: "#", label: "Wanderlast on Instagram", Logo: InstagramLogo },
] as const;

function ColumnTitle({ children }: { children: string }) {
  return (
    <h3 className="text-sm font-medium tracking-wide text-white/85">
      {children}
    </h3>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <Image
          src="/images/Wanderlast-1.png"
          alt="Wanderlast"
          width={542}
          height={80}
          className="h-20 w-auto"
        />
        <p className="mt-3 text-base text-white/55">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-[1.65fr_1fr_1fr_0.85fr]">
          <div>
            <ColumnTitle>NEWSLETTER</ColumnTitle>
            <p className="mt-4 text-base text-white/50">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form className="relative mt-3">
              <Input
                type="email"
                aria-label="Email address"
                placeholder="Enter email"
                className="h-12 rounded-[4px] border-transparent bg-white/15 px-5 text-white placeholder:text-white/60"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Subscribe"
                className="absolute top-1/2 right-1.5 -translate-y-1/2 text-white hover:bg-white/10"
              >
                <ArrowUpRight />
              </Button>
            </form>
          </div>

          <nav aria-label="Quick links">
            <ColumnTitle>QUICK LINKS</ColumnTitle>
            <ul className="mt-7 space-y-5">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-lg text-white/55 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <ColumnTitle>SUPPORT</ColumnTitle>
            <ul className="mt-7 space-y-5">
              {supportLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-lg text-white/55 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnTitle>CONTACT US</ColumnTitle>
            <ul className="mt-7 space-y-5 text-lg text-white/55">
              <li>786 901 1622</li>
              <li>info@wanderlast.com</li>
            </ul>
          </div>
        </div>

        <hr className="mt-14 border-white/15" />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/45">
            © 2025 Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {socials.map(({ href, label, Logo }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white/60 transition-colors hover:text-white"
              >
                <Logo className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
