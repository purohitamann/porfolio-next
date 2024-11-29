import type { Metadata } from "next";

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Aman Purohit",
  description: "Welcome to my portfolio",
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
