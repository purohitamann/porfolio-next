'use client';
import React, { useState, useEffect } from 'react';
import { useCursorHover } from '../hooks/useCursorHover';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);
  const linkCursorHandlers = useCursorHover('link');
  
  useEffect(() => {
    // Set loading to false after a short delay to ensure iframe has time to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-white pt-20 px-4 md:px-8  lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            {...linkCursorHandlers}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center h-[calc(100vh-150px)]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-16 w-16 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        )}
        
        {/* Resume iframe */}
        <div className={`w-full  h-screen flex rounded-lg shadow-lg overflow-hidden transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <iframe 
            src="https://docs.google.com/document/d/e/2PACX-1vR2loirhku4bmZ2SFh3Bh1m5ad6PqQOOC1C7uGUBUhDJ4d_kgMji4DNIqWKBEdDy16AGy6gLgHjjTIW/pub?embedded=true"
            // src='https://docs.google.com/document/d/e/2PACX-1vR2loirhku4bmZ2SFh3Bh1m5ad6PqQOOC1C7uGUBUhDJ4d_kgMji4DNIqWKBEdDy16AGy6gLgHjjTIW/pub'
            className="w-full h-full border-0"
            
            allowFullScreen
            title="Aman Purohit Resume"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
