import raw from '../data/blog.json';

export interface BlogPost {
  id?: number;
  title: string;
  slug?: string;
  description?: string;
  content?: string;
  timePosted?: string;
  category?: string;
  readTime?: string;
  tags?: string[];
  publishedDate?: string;
  author?: string;
  featured?: boolean;
  featuredImages?: string[];
  photographer?: string;
}

const posts: BlogPost[] = raw.posts || [];

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getFeaturedPosts(): BlogPost[] {
  return posts.filter(p => p.featured);
}

export function getLatest(n = 5): BlogPost[] {
  return posts.slice(0, n);
}

export function getPostBySlug(slug?: string) {
  if (!slug) return undefined;
  return posts.find(p => p.slug === slug);
}

export default {
  getAllPosts,
  getFeaturedPosts,
  getLatest,
  getPostBySlug,
};
