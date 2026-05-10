import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";

const manrope = localFont({
  src: [
    {
      path: "../public/fonts/Manrope-400.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/fonts/Manrope-500.ttf",
      weight: "500",
      style: "normal"
    },
    {
      path: "../public/fonts/Manrope-700.ttf",
      weight: "700",
      style: "normal"
    },
    {
      path: "../public/fonts/Manrope-800.ttf",
      weight: "800",
      style: "normal"
    }
  ],
  variable: "--font-body",
  display: "swap"
});

const anton = localFont({
  src: "../public/fonts/Anton-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-display",
  display: "swap"
});

const plexMono = localFont({
  src: [
    {
      path: "../public/fonts/IBMPlexMono-400.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../public/fonts/IBMPlexMono-500.ttf",
      weight: "500",
      style: "normal"
    }
  ],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Huddle",
  description: "City-first sports-culture club."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${anton.variable} ${plexMono.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
