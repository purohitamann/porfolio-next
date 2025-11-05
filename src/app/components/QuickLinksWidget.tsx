"use client";
import React from "react";

export default function QuickLinksWidget() {
  const LINKS: { label: string; href: string }[] = [
    { label: "Resume", href: "/resume" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Work", href: "/work" },
  ];

  return (
    <div className="w-56 bg-background/90 backdrop-blur rounded-lg p-3 shadow-md border border-border/50">
      <div className="text-sm font-medium mb-2">Quick Links</div>
      <div className="flex flex-col gap-2">
        {LINKS.map((l) => (
          <button
            key={l.href}
            onClick={() => window.open(l.href, "_blank")}
            className="text-left px-2 py-1 rounded hover:bg-white/5 text-sm"
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
