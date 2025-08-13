'use client';

import { useState, FormEvent } from 'react';

interface Comment {
  name: string;
  text: string;
}

export default function BlogInteractions() {
  const [likes, setLikes] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const handleLike = () => setLikes(likes + 1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setComments([...comments, { name, text: comment }]);
    setName('');
    setComment('');
  };

  return (
    <div className="mt-8 space-y-6">
      <button
        onClick={handleLike}
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
      >
        Like ({likes})
      </button>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-md border border-border p-2"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your comment"
          className="w-full rounded-md border border-border p-2"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
        >
          Add Comment
        </button>
      </form>

      {comments.length > 0 && (
        <ul className="space-y-2">
          {comments.map((c, idx) => (
            <li key={idx} className="border-b border-border pb-2">
              <span className="font-semibold">{c.name}:</span> {c.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
