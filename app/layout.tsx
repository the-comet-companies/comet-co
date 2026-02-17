import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import FooterAnimation from "@/components/FooterAnimation";
import Scene3D from "@/components/Scene3D";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Comet Companies",
  description:
    "We build and operate focused businesses. No hype. No buzzwords. No storytelling for its own sake.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>

        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
        <FooterAnimation />
      </body>
    </html>
  );
}
