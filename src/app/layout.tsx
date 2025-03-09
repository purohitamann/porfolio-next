import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import React from "react";
import { CursorProvider } from "./context/CursorContext";
import CustomCursor from "./components/CustomCursor";

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
    <html lang="en">
      <CursorProvider>
        <body className="h-screen w-screen bg-white cursor-none">
          <CustomCursor />
          <div className="w-screen mb-10">
            <Navbar />
          </div>
          <section className="h-full w-screen flex flex-col justify-center items-center text-black font-sans">
            {children}
          </section>
        </body>
      </CursorProvider>
    </html>
  );
}
