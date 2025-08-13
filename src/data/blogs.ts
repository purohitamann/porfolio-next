export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
};

export const blogs: BlogPost[] = [
  {
    slug: 'my-first-post',
    title: 'My First Blog Post',
    excerpt: 'This is a short introduction to my first post where I talk about building a portfolio with Next.js.',
    content: `Welcome to my blog! This is my first post on the site.

In this article, I share how I built this portfolio using Next.js and Tailwind CSS.

Thanks for reading!`
  },
  {
    slug: 'another-day-another-post',
    title: 'Another Day, Another Post',
    excerpt: 'Some thoughts on writing content and sharing updates with the world.',
    content: `Writing consistently is hard, but it is also rewarding.

With every post I try to improve a little bit and share something new.`
  }
];
