"use client";
import React from "react";

export default function NotesWidget() {
  const [note, setNote] = React.useState(() => {
    try {
      return localStorage.getItem("desktopNote") || "";
    } catch {
      return "";
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem("desktopNote", note);
    } catch {}
  }, [note]);

  return (
    <div className="w-56 bg-background/90 backdrop-blur rounded-lg p-3 shadow-md border border-border/50">
      <div className="text-sm font-medium mb-2">Notes</div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full h-24 bg-transparent resize-none text-sm p-2 border border-border/20 rounded focus:outline-none"
        placeholder="Quick note..."
      />
    </div>
  );
}
