'use client';
import React from 'react';
import SectionWrapper from './SectionWrapper';
import BlogSlideshow from './BlogSlideshow';
import blogData from '../../data/blog.json';

const Blog = () => {
  

    const jsonPosts = blogData.posts.map(post => ({
        title: post.title,
        description: post.description,
        link: post.slug ? `/blog/${post.slug}` : '#',
        timePosted: post.timePosted,
        category: post.category,
        links: post.links || []
    }));

    const allPosts = [...jsonPosts];

    return (
        <div id="blog" className=" py-8">
            <SectionWrapper title="Blog">
                <BlogSlideshow posts={allPosts} />
            </SectionWrapper>
        </div>
    );
};

export default Blog;