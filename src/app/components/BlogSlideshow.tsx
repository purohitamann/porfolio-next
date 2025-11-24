'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BlogPost {
    title: string;
    description: string;
    link: string;
    timePosted: string;
    category?: string;
    links?: Array<{ name: string; url: string }>;
}

interface BlogSlideshowProps {
    posts: BlogPost[];
}

const BlogSlideshow = ({ posts }: BlogSlideshowProps) => {
    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
        >
            <CarouselContent>
                {posts.map((post, index) => {
                    const isInternalLink = post.link.startsWith('/blog/');
                    
                    const CardContent = (
                        <div className="space-y-4">
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="text-2xl font-semibold text-foreground">
                                    {post.title}
                                </h3>
                                <ArrowUpRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {post.description}
                            </p>
                            <div className="flex items-center gap-3 pt-4">
                                {post.category && (
                                    <span className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground">
                                        {post.category}
                                    </span>
                                )}
                                <span className="text-sm text-muted-foreground/70">
                                    {post.timePosted}
                                </span>
                            </div>
                            {post.links && post.links.length > 0 && (
                                <div className="flex flex-wrap gap-2 border-t border-border mt-4 pt-4">
                                    {post.links.map((linkItem, idx) => (
                                        <a
                                            key={idx}
                                            href={linkItem.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex"
                                        >
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <ExternalLink className="h-3 w-3" />
                                                {linkItem.name}
                                            </Button>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                    
                    return (
                        <CarouselItem key={index}>
                            <div className="glass w-full h-full rounded-2xl">
                                {isInternalLink ? (
                                    <Link
                                        href={post.link}
                                        className="block p-8 rounded-lg hover:bg-white/5 transition-all h-full cursor-pointer"
                                    >
                                        {CardContent}
                                    </Link>
                                ) : (
                                    <a
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-8 rounded-lg hover:bg-white/5 transition-all h-full cursor-pointer"
                                    >
                                        {CardContent}
                                    </a>
                                )}
                            </div>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
        </Carousel>
    );
};

export default BlogSlideshow;
