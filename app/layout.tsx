import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FooterAnimation from "@/components/FooterAnimation";
import Scene3D from "@/components/Scene3D";

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
        <Scene3D />
        {children}
        <FooterAnimation />
      </body>
    </html>
  );
}
