import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "FlightReadyAI: Preflight. Done right.",
  description:
    "Your Pilot AI for every phase of flight. Checklists, emergency procedures, weight & balance, and post-flight logbook — built for the cockpit. Join the beta.",
  keywords: [
    "aviation",
    "pre-flight checklist",
    "Pilot AI",
    "general aviation",
    "pilot app",
    "flight safety",
    "emergency procedures",
    "flight logbook",
    "iPad",
  ],
  openGraph: {
    title: "FlightReadyAI: Preflight. Done right.",
    description:
      "Your Pilot AI for every phase of flight. Checklists, emergency procedures, weight & balance, and post-flight logbook — built for the cockpit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
