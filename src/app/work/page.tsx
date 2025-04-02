'use client';
import React from 'react';
import Work from '../components/Work';
import Footer from '../components/Footer';
import OpenSourceContribution from './OpenSourceContribution';

export default function WorkPage() {
  return (
    <div className="h-screen w-screen overflow-y-auto ">
      <Work />
      <OpenSourceContribution  />
      <Footer />

    </div>
  );
}
