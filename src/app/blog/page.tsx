import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

export default async function BlogPage() {
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', 1)
    .single();

  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('blog_id', 1)
    .order('created_at', { ascending: true });

  const { count: likes } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('blog_id', 1);

  async function addComment(formData: FormData) {
    'use server';
    const name = (formData.get('name') as string) || '';
    const hideName = formData.get('hide-name') === 'on';
    const content = formData.get('content') as string;

    await supabase.from('comments').insert({
      blog_id: 1,
      name,
      hide_name: hideName,
      content,
    });

    revalidatePath('/blog');
  }

  async function likePost() {
    'use server';
    await supabase.from('likes').insert({ blog_id: 1 });
    revalidatePath('/blog');
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
      {post?.content && (
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      )}

      <form action={likePost} className="my-4">
        <button
          type="submit"
          className="rounded bg-blue-600 px-3 py-1 text-white"
        >
          Like ({likes ?? 0})
        </button>
      </form>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Comments</h2>
        {comments?.map((c) => (
          <div key={c.id} className="border-b py-2">
            <p className="font-medium">{c.hide_name ? 'Anonymous' : c.name}</p>
            <p>{c.content}</p>
          </div>
        ))}

        <form action={addComment} className="mt-4 flex flex-col gap-2">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="border p-2"
          />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="hide-name" /> Hide my name
          </label>
          <textarea
            required
            name="content"
            placeholder="Your comment"
            className="border p-2"
          />
          <button
            type="submit"
            className="rounded bg-green-600 px-3 py-1 text-white"
          >
            Post Comment
          </button>
        </form>
      </section>
    </div>
  );
}
