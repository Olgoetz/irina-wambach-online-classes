import "./globals.css";
import type { Metadata } from "next";
import { Barlow } from "next/font/google";

const barlow = Barlow({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Online-Yoga-Kurse mit Irina",
  description: "Online-Yoga-Kurse mit Irina über Zoom",
  metadataBase: new URL(process.env.URL!),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: "/opengraph-image.jpg",
    title: "Online-Yoga-Kurse mit Irina",
    description: "Online-Yoga-Kurse mit Irina über Zoom",
    url: process.env.URL!,
  },
  twitter: {
    images: "/twitter-image.jpg",
    title: "Online-Yoga-Kurse mit Irina",
    description: "Online-Yoga-Kurse mit Irina über Zoom",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={barlow.className}>{children}</body>
    </html>
  );
}
