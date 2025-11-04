"use client";
import React, { useEffect, useState } from 'react';
import { getFeaturedPosts } from '../../lib/blog';
import Link from 'next/link';

export default function BlogWidget({ className = '' }: { className?: string }) {
  const featured = getFeaturedPosts() || [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!featured.length) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % featured.length);
    }, 4500);
    return () => clearInterval(t);
  }, [featured.length]);

  if (!featured.length) return null;

  const post = featured[index];

  return (
    <div className={`pointer-events-auto ${className}`}>
      <div className="w-72 md:w-80 bg-background/80 backdrop-blur border border-border/60 rounded-2xl overflow-hidden shadow-xl">
        <div className="relative h-36 bg-cover bg-center" style={{ backgroundImage: `url(${post.featuredImages?.[0] || '/ci.jpg'})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        <div className="p-3">
          <Link href={`/blog/${post.slug}`} className="block">
            <h3 className="text-sm font-semibold line-clamp-2">{post.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.description}</p>
          </Link>

          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>{post.readTime || post.timePosted}</span>
            <div className="flex items-center gap-2">
              {featured.map((_: any, i: number) => (
                <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary' : 'bg-muted/50'}`} aria-label={`Show slide ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
