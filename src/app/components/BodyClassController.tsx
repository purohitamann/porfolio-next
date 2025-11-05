"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function BodyClassController() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    if (pathname === '/') {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }

    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, [pathname]);

  return null;
}
