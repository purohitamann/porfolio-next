'use client';
import React, { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag, User, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '../../../lib/blog';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  timePosted: string;
  category: string;
  readTime: string;
  tags: string[];
  publishedDate: string;
  author: string;
  featured: boolean;
  featuredImage?: string; // Single featured image
  featuredImages?: string[]; // Multiple featured images for slideshow
  images?: string[]; // Add this for content images
  photographer?: string; // Add photographer field
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  // Unwrap the params Promise using React.use()
  const { slug } = use(params);
  
  // Find the blog post by slug
  const post = getPostBySlug(slug) as BlogPost | undefined;

  // Slideshow state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // If post not found, return 404
  if (!post) {
    notFound();
  }

  // Get images for slideshow (use featuredImages array)
  const slideshowImages =
    post.featuredImages && post.featuredImages.length > 0
      ? post.featuredImages
      : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  // Format content with line breaks and handle images
  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === '') {
        return <br key={index} />;
      }
      
      // Handle image references like ![Image Description](image-path)
      const imageMatch = paragraph.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imageMatch) {
        const [, altText, imagePath] = imageMatch;
        return (
          <div key={index} className="my-8">
            <Image
              src={imagePath}
              alt={altText}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg border border-border"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            {altText && (
              <p className="text-sm text-muted-foreground text-center mt-2 italic">
                {altText}
              </p>
            )}
          </div>
        );
      }
      
      // Handle inline images like [image:image-path]
      const inlineImageMatch = paragraph.match(/\[image:(.*?)\]/);
      if (inlineImageMatch) {
        const imagePath = inlineImageMatch[1];
        return (
          <div key={index} className="my-6">
            <Image
              src={imagePath}
              alt=""
              width={600}
              height={300}
              className="w-full h-auto rounded-lg border border-border"
            />
          </div>
        );
      }
      
      // Handle headers
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold text-foreground mt-8 mb-4">
            {paragraph.replace('# ', '')}
          </h1>
        );
      }
      
      // Handle code blocks (simple implementation)
      if (paragraph.startsWith('```')) {
        return (
          <pre key={index} className="bg-muted/30 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm">{paragraph.replace(/```\w*/, '').replace('```', '')}</code>
          </pre>
        );
      }
      
      // Handle bullet points
      if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="text-muted-foreground leading-relaxed ml-4">
            {paragraph.replace('- ', '')}
          </li>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\. /.test(paragraph)) {
        return (
          <li key={index} className="text-muted-foreground leading-relaxed ml-4 list-decimal">
            {paragraph.replace(/^\d+\. /, '')}
          </li>
        );
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <article className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        {/* Navigation */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {/* Category */}
          <div className="mb-4">
            <span className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.description}
          </p>

          {/* Featured Image/Video Slideshow */}
          {slideshowImages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 relative"
            >
              <div className="relative rounded-lg border border-border overflow-hidden bg-muted/10 w-full h-48 md:h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    {/* Check if current item is a video */}
                    {slideshowImages[currentImageIndex].toLowerCase().includes('.mov') || 
                     slideshowImages[currentImageIndex].toLowerCase().includes('.mp4') || 
                     slideshowImages[currentImageIndex].toLowerCase().includes('.webm') ? (
                      <video
                        src={slideshowImages[currentImageIndex]}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls={false}
                      />
                    ) : (
                      <Image
                        src={slideshowImages[currentImageIndex]}
                        alt={`${post.title} - Image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                        priority={currentImageIndex === 0}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows - Only show if more than 1 item */}
                {slideshowImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
                      aria-label="Previous media"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-10"
                      aria-label="Next media"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Media Counter */}
                {slideshowImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-10">
                    {currentImageIndex + 1} / {slideshowImages.length}
                  </div>
                )}

                {/* Video Indicator */}
                {(slideshowImages[currentImageIndex].toLowerCase().includes('.mov') || 
                  slideshowImages[currentImageIndex].toLowerCase().includes('.mp4') || 
                  slideshowImages[currentImageIndex].toLowerCase().includes('.webm')) && (
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm z-10">
                    VIDEO
                  </div>
                )}
              </div>

              {/* Thumbnail Navigation - Only show if more than 1 item */}
              {slideshowImages.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center overflow-x-auto pb-2">
                  {slideshowImages.map((media, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-16 h-12 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                        index === currentImageIndex 
                          ? 'border-primary scale-105' 
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      {/* Check if thumbnail is a video */}
                      {media.toLowerCase().includes('.mov') || 
                       media.toLowerCase().includes('.mp4') || 
                       media.toLowerCase().includes('.webm') ? (
                        <div className="relative w-full h-full bg-black/20 flex items-center justify-center">
                          <video
                            src={media}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-4 h-4 border-l-2 border-white"></div>
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={media}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Photographer Credit - Show below slideshow if photographer exists */}
              {post.photographer && (
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
                  <Camera className="h-4 w-4" />
                  <span>Photos by {post.photographer}</span>
                </div>
              )}
            </motion.div>
          )}

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border/30 pb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.timePosted}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div className="text-lg leading-relaxed">
            {formatContent(post.content)}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-border/30"
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded bg-muted/30 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Additional photographer credit in footer if exists */}
          {post.photographer && (
            <div className="flex items-center gap-2 mt-4">
              <Camera className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Photos:</span>
              <span className="text-sm text-muted-foreground">{post.photographer}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-medium text-muted-foreground">Surprise:</span>
            <a href="/asks" className='flex items-center underline'>
              Aman Asks
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.footer>
      </article>
      
      {/* Newsletter CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-16 p-8 rounded-lg border border-border bg-card/30 text-center max-w-4xl mx-auto px-6 md:px-8"
      >
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Stay Updated
        </h3>
        <p className="text-muted-foreground mb-6">
          Subscribe to my newsletter for the latest articles, provide Feedback and connect
        </p>
        <Button asChild className="button-hover">
          <a href="/asks">
            Aman Asks
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </motion.section>
    </div>
  );
};

export default BlogPostPage;