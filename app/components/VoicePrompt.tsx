"use client";

import { useEffect, useState } from "react";

export function VoicePrompt({ prompts }: { prompts: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = prompts[index];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          if (text.length < full.length) {
            setText(full.slice(0, text.length + 1));
          } else {
            setTimeout(() => setDeleting(true), 2200);
          }
        } else if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setDeleting(false);
          setIndex((i) => (i + 1) % prompts.length);
        }
      },
      deleting ? 28 : 42,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, prompts]);

  return (
    <div className="font-mono text-sm text-quantum/90 md:text-base">
      <span className="text-gold/60">&gt; </span>
      {text}
      <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-quantum align-middle" />
    </div>
  );
}
