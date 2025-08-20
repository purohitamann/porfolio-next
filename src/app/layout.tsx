import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import React from "react";


export const metadata: Metadata = {
  title: "Aman Purohit",
  description: "Aspiring Software Developer and AI Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground font-sans">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
