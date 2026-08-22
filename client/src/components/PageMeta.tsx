/**
 * Companion Field Notes design reminder: metadata stays clear, warm, and accurate.
 */
import { useEffect } from "react";

export function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);

  return null;
}
