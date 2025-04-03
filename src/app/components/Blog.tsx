'use client';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import BlogFrame from './BlogFrame';
import { motion } from 'framer-motion';
import FloatingElement from './FloatingElement';

const Blog = () => {
    const blogs = [
        {
            title: "My First Open-Source Contribution to the Internet Archive",
            description: "Even though it was a small 'good first issue,' it felt incredibly exciting",
            link: "https://medium.com/@purohitamann/my-first-open-source-contribution-to-the-internet-archive-6ec2621b8a68",
            timePosted: "January 2025"
        },
        {
            title: "Students guide to becoming 'AI first' at School",
            description: "there's more to using ChatGPT than just helping you paraphrase",
            link: "https://medium.com/p/d004dbc7a633",
            timePosted: "December 2024"
        }
    ];

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