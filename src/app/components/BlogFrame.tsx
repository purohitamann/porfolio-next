'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface BlogFrameProps {
    title: string;
    description: string;
    link: string;
    timePosted: string;
}

const BlogFrame = ({ title, description, link, timePosted }: BlogFrameProps) => {
    return (
        <motion.div
            className="group"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-muted/30 rounded-xl border border-border hover:border-muted-foreground transition-all"
            >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                            <h2 className="text-xl font-semibold text-foreground group-hover:text-foreground/90 transition-colors">
                                {title}
                            </h2>
                            <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <p className="text-muted-foreground/80 line-clamp-2">
                            {description}
                        </p>
                    </div>
                    <div className="shrink-0">
                        <p className="text-sm text-muted-foreground">
                            {timePosted}
                        </p>
                    </div>
                </div>
            </a>
        </motion.div>
    );
};

export default BlogFrame;