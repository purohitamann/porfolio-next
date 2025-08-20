'use client';
import React, { useState, useEffect } from 'react';
import { useCursorHover } from '../hooks/useCursorHover';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);
  const linkCursorHandlers = useCursorHover('link');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-background pt-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="group" {...linkCursorHandlers}>
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        {isLoading && (
          <div className="flex justify-center items-center h-[calc(100vh-150px)]">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-16 w-16 bg-muted rounded-full mb-4"></div>
              <div className="h-4 w-48 bg-muted rounded mb-2"></div>
              <div className="h-3 w-32 bg-muted rounded"></div>
            </div>
          </div>
        )}
        
        <div className={`w-full h-[calc(100vh-150px)] flex rounded-2xl border border-border overflow-hidden transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {/* <iframe 
            src="https://docs.google.com/document/d/e/2PACX-1vR2loirhku4bmZ2SFh3Bh1m5ad6PqQOOC1C7uGUBUhDJ4d_kgMji4DNIqWKBEdDy16AGy6gLgHjjTIW/pub?embedded=true"
            className="w-full h-full border-0 bg-white"
            allowFullScreen
            title="Aman Purohit Resume"
          ></iframe> */}
          {/* <p className="mt-4 text-center text-sm text-muted-foreground">
  Can't view the resume?{' '}
  <a
    href="/AmanPurohit-Resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="underline text-primary"
  >
    Open in new tab
  </a>
</p> */}

          <iframe 
  src="/AmanPurohitResume2025.pdf"
  className="w-full h-full border-0 bg-white"
  allowFullScreen

  title="Aman Purohit Resume"
/>

        </div>
      </div>
    </div>
  );
}
