'use client';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import BlogFrame from './BlogFrame';
import { motion } from 'framer-motion';
import FloatingElement from './FloatingElement';

import blogData from '../../data/blog.json';

const Blog = () => {
    // Get latest 2 blog posts from JSON data
    const blogs = blogData.posts.slice(0, 2).map(post => ({
        title: post.title,
        description: post.description,
        link: `/blog/${post.slug}`,
        timePosted: post.timePosted
    }));

    return (
        <div id="blog" className="bg-background">
            <SectionWrapper title="Blog">
                <div className="max-w-4xl mx-auto">
                    <FloatingElement>
                        <motion.div 
                            className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="p-8 space-y-6">
                                <div className="space-y-6">
                                    {blogs.map((blog, index) => (
                                        <BlogFrame
                                            key={index}
                                            title={blog.title}
                                            description={blog.description}
                                            link={blog.link}
                                            timePosted={blog.timePosted}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </FloatingElement>
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Blog;