import Link from 'next/link';
import { blogs } from '@/data/blogs';
import BlogInteractions from '../BlogInteractions';

interface BlogPostPageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogs.find(b => b.slug === params.slug);

  if (!post) {
    return <div className="p-8">Post not found.</div>;
  }

  const otherPosts = blogs.filter(b => b.slug !== post.slug);

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="whitespace-pre-line text-foreground">{post.content}</p>
      </div>

      <BlogInteractions />

      {otherPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Read more</h2>
          <ul className="space-y-2">
            {otherPosts.map(p => (
              <li key={p.slug}>
                <Link className="text-primary underline" href={`/blog/${p.slug}`}>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
