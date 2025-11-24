'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
    title: string;
    description: string;
    link: string;
    timePosted: string;
    category?: string;
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
                    
                    return (
                        <CarouselItem key={index}>
                            {isInternalLink ? (
                                <Link
                                    href={post.link}
                                    className="block p-8 bg-card rounded-lg border border-border hover:border-muted-foreground transition-all shadow-sm hover:shadow-md h-full"
                                >
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
                                    </div>
                                </Link>
                            ) : (
                                <a
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-8 bg-card rounded-lg border border-border hover:border-muted-foreground transition-all shadow-sm hover:shadow-md h-full"
                                >
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
                                    </div>
                                </a>
                            )}
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
