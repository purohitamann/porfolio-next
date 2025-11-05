import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import NavbarClient from "@/app/components/NavbarClient";
import BodyClassController from "./components/BodyClassController";


export const metadata: Metadata = {
  title: "Aman Purohit",
  description: "Software Engineer in GenAI & DevOps",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-background text-foreground font-sans`}>
        <BodyClassController />
        <NavbarClient />
        <main className={'min-h-screen'}>
          {children}
        </main>
      </body>
    </html>
  );
}
