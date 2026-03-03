import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "FlightReadyAI: Preflight. Done right.",
  description:
    "Your Pilot AI for smarter preflights. Checklists, briefings, and weight & balance built for the cockpit. Join the beta.",
  keywords: [
    "aviation",
    "pre-flight checklist",
    "Pilot AI",
    "general aviation",
    "pilot app",
    "flight safety",
    "iPad",
  ],
  openGraph: {
    title: "FlightReadyAI: Preflight. Done right.",
    description:
      "Your Pilot AI for smarter preflights. Checklists, briefings, and weight & balance built for the cockpit.",
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
