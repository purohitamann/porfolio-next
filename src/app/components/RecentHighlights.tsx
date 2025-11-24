'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Award, Briefcase, Users, FileText } from 'lucide-react';
import Link from 'next/link';
import highlights from '../../data/highlights.json';

interface Highlight {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'achievement' | 'career' | 'leadership' | 'content';
  link: string | null;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'achievement':
      return <Award className="h-4 w-4" />;
    case 'career':
      return <Briefcase className="h-4 w-4" />;
    case 'leadership':
      return <Users className="h-4 w-4" />;
    case 'content':
      return <FileText className="h-4 w-4" />;
    default:
      return <Calendar className="h-4 w-4" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'achievement':
      return 'text-yellow-500';
    case 'career':
      return 'text-blue-500';
    case 'leadership':
      return 'text-purple-500';
    case 'content':
      return 'text-green-500';
    default:
      return 'text-muted-foreground';
  }
};

const RecentHighlights = () => {
  const recentHighlights = (highlights.highlights as Highlight[]).slice(0, 3);

  return (
    <section className="w-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Recent Highlights
          </h2>
          <Link 
            href="/blog" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid gap-4">
          {recentHighlights.map((highlight: Highlight, index) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {highlight.link ? (
                <a
                  href={highlight.link}
                  className="block p-4 rounded-lg border border-border hover:border-muted-foreground transition-all bg-muted hover:bg-secondary"
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${getTypeColor(highlight.type)}`}>
                      {getTypeIcon(highlight.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-foreground group-hover:text-foreground/90 transition-colors">
                          {highlight.title}
                        </h3>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {highlight.description}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-2">
                        {highlight.date}
                      </p>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="p-4 rounded-lg border border-border bg-muted">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${getTypeColor(highlight.type)}`}>
                      {getTypeIcon(highlight.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">
                        {highlight.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {highlight.description}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-2">
                        {highlight.date}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentHighlights;