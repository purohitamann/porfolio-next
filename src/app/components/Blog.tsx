'use client';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import BlogSlideshow from './BlogSlideshow';
import blogData from '../../data/blog.json';

const Blog = () => {
    const staticPosts = [
        {
            title: "My First Open-Source Contribution to the Internet Archive",
            description: "Even though it was a small 'good first issue,' it felt incredibly exciting. Documenting my journey and the lessons learned from contributing to such an important project.",
            link: "https://medium.com/@purohitamann/my-first-open-source-contribution-to-the-internet-archive-6ec2621b8a68",
            timePosted: "January 2025",
            category: "Open Source"
        },
        {
            title: "Students guide to becoming 'AI first' at School",
            description: "There's more to using ChatGPT than just helping you paraphrase. A comprehensive guide for students to effectively leverage AI tools in their academic journey.",
            link: "https://medium.com/p/d004dbc7a633",
            timePosted: "December 2024",
            category: "AI & Education"
        }
    ];

    const jsonPosts = blogData.posts.map(post => ({
        title: post.title,
        description: post.description,
        link: post.slug ? `/blog/${post.slug}` : '#',
        timePosted: post.timePosted,
        category: post.category
    }));

    const allPosts = [...jsonPosts, ...staticPosts];

    return (
        <div id="blog" className=" py-8">
            <SectionWrapper title="Blog">
                <BlogSlideshow posts={allPosts} />
            </SectionWrapper>
        </div>
    );
};

export default Blog;