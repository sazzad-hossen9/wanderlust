"use client";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "cn";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
type NavLink = { href: string; label: string; active?: boolean };

const navLinks: NavLink[] = [
  { href: "/", label: "Home", active: true },
  { href: "/destinations", label: "Destinations", active: false },
  { href: "/add-destination", label: "Add-Destination", active: false },
  { href: "/my-bookings", label: "My Bookings", active: false },
];

export function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user);
  const handleSignOut = () => {
    authClient.signOut();
  };
  return (
    <header className="sticky top-0 z-40 bg-white">
      <nav className="relative mx-auto flex h-12 max-w-7xl items-center justify-between px-6">
        <ul className="flex items-center gap-6">
          {navLinks.map(({ href, label, active }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-brand",
                  active
                    ? "text-brand underline underline-offset-2"
                    : "text-foreground",
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          aria-label="Wanderlast — home"
          className="absolute left-1/2 -translate-x-1/2 max-sm:hidden"
        >
          <Image
            src="/images/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            className="h-4 w-auto"
          />
        </Link>

        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-brand"
            >
              <User className="size-3.5" />
              Profile
            </Link>
          </li>

          {user ? (
            <Popover>
              <PopoverTrigger
                render={
                  <Avatar>
                    <AvatarImage
                      referrerPolicy="no-referrer"
                      src={user?.image as string}
                    />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                }
              ></PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>{user?.name}</PopoverTitle>
                  <PopoverDescription>
                    <p>{user?.email}</p>
                    <Button onClick={handleSignOut} variant={"destructive"}>
                      Sign out{" "}
                    </Button>
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              
             
                <Link
                  href="/login"
                  className="text-sm font-semibold transition-colors hover:text-brand"
                >
                  Login
                </Link>
              
              
                <Link
                  href="/signup"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
                >
                  Sign Up
                </Link>
              
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
