'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Award, Briefcase, Users, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import highlights from '../../data/highlights.json';
import { getAllPosts } from '../../lib/blog';



interface Highlight {
  
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'achievement' | 'career' | 'leadership' | 'content';
  link: string | null;
}

interface BlogPost {
  title: string;
  description: string;
  link: string;
  timePosted: string;
  category: string;
  readTime?: string;
  slug?: string;
  photographer?: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'achievement':
      return <Award className="h-5 w-5" />;
    case 'career':
      return <Briefcase className="h-5 w-5" />;
    case 'leadership':
      return <Users className="h-5 w-5" />;
    case 'content':
      return <FileText className="h-5 w-5" />;
    default:
      return <Calendar className="h-5 w-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'achievement':
      return 'text-yellow-500 bg-yellow-500/10';
    case 'career':
      return 'text-blue-500 bg-blue-500/10';
    case 'leadership':
      return 'text-purple-500 bg-purple-500/10';
    case 'content':
      return 'text-green-500 bg-green-500/10';
    default:
      return 'text-muted-foreground bg-muted/10';
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'achievement':
      return 'Achievement';
    case 'career':
      return 'Career';
    case 'leadership':
      return 'Leadership';
    case 'content':
      return 'Content';
    default:
      return 'Update';
  }
};

const BlogPage = () => {
  // Use centralized JSON posts
  const jsonPosts = getAllPosts();
  const blogPosts: BlogPost[] = jsonPosts.map(post => ({
    title: post.title || '',
    description: post.description || '',
    link: post.slug ? `/blog/${post.slug}` : '#',
    timePosted: post.timePosted || '',
    category: post.category || '',
    readTime: post.readTime,
    slug: post.slug,
    photographer: post.photographer
  }));

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Blog & Highlights
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Thoughts on technology, open source, AI, and my journey as a software engineer.
            </p>
          </motion.div>
        </div>

        {/* Blog Posts Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Latest Articles</h2>
          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <a
                  href={post.link}
                  className="block p-6 rounded-lg border border-border hover:border-muted-foreground transition-all bg-card/50 hover:bg-card/70"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-foreground/90 transition-colors">
                          {post.title}
                        </h3>
                        {post.link.startsWith('/blog/') ? (
                          <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                        ) : (
                          <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-sm px-3 py-1 rounded-full bg-muted/30 text-muted-foreground">
                          {post.category}
                        </span>
                        {post.readTime && (
                          <span className="text-sm text-muted-foreground/60">
                            {post.readTime}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground/60">
                          {post.timePosted}
                        </span>
                        
                      </div>
                    </div>
                  </div>
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Recent Highlights Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Highlights</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {(highlights.highlights as Highlight[]).map((highlight, index) => (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + blogPosts.length) * 0.1 }}
                className="group"
              >
                {highlight.link ? (
                  <a
                    href={highlight.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 rounded-lg border border-border hover:border-muted-foreground transition-all bg-card/50 hover:bg-card/70 h-full"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-2 rounded-lg ${getTypeColor(highlight.type)}`}>
                        {getTypeIcon(highlight.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {getTypeLabel(highlight.type)}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-foreground/90 transition-colors mb-2">
                          {highlight.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {highlight.description}
                    </p>
                    <p className="text-sm text-muted-foreground/60">
                      {highlight.date}
                    </p>
                  </a>
                ) : (
                  <div className="p-6 rounded-lg border border-border bg-card/50 h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-2 rounded-lg ${getTypeColor(highlight.type)}`}>
                        {getTypeIcon(highlight.type)}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2 block">
                          {getTypeLabel(highlight.type)}
                        </span>
                        <h3 className="font-semibold text-foreground mb-2">
                          {highlight.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {highlight.description}
                    </p>
                    <p className="text-sm text-muted-foreground/60">
                      {highlight.date}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 p-8 rounded-lg border border-border bg-card/30 text-center"
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
    </div>
  );
};

export default BlogPage;