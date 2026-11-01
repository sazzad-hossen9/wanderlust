import type { Metadata } from "next";
import { Josefin_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/toast";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";


const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Wanderlast",
  description:
    "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${josefinSans.className} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
