import Link from 'next/link';
import { blogs } from '@/data/blogs';

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      {blogs.map(post => (
        <div key={post.slug} className="space-y-2">
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <p className="text-muted-foreground">{post.excerpt}</p>
          <Link className="text-primary underline" href={`/blog/${post.slug}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
