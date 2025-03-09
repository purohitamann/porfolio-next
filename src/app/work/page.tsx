'use client';
import React from 'react';
import Work from '../components/Work';
import Footer from '../components/Footer';

export default function WorkPage() {
  return (
    <div className="h-screen w-screen bg-white overflow-y-auto pt-20">
      <Work />
      <Footer />
    </div>
  );
}
