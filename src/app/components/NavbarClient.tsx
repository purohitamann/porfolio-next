"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarClient() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) return null;

  // Navbar is fixed at the top; add a spacer so page content isn't hidden behind it.
  // h-16 approximates the navbar height; adjust if your navbar height changes.
  return (
    <>
      <Navbar />
      <div aria-hidden="true" className="h-16 md:h-16" />
    </>
  );
}
