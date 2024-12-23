

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
    <html lang="en">
      <body className="h-screen w-screen bg-white ">

        <div>
          <Navbar />
        </div>
        <section className="h-full w-screen flex flex-col justify-center items-center text-black font-sans ">
          {children}

        </section>
      </body>
    </html>
  );
}
