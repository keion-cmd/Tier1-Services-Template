"use client";

/**
 * Reusable line-by-line heading reveal. Splits plain-string heading text into its actual
 * rendered visual lines at runtime (via Range.getClientRects on a hidden measuring clone) and
 * animates each line in with a short stagger — instead of requiring a client to hand-place
 * `<br>` tags, and instead of animating the whole heading as one block regardless of length.
 *
 * Falls back to a plain, unanimated render whenever it can't safely split: non-string content
 * (e.g. a heading wrapping a `<span id>` for an aria landmark), before the client-side
 * measurement pass has run, or under prefers-reduced-motion. This keeps it resilient to
 * arbitrary per-client heading length/content instead of ever breaking or shifting layout.
 */
import { useLayoutEffect, useRef, useState, type ComponentProps, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "@/hooks/useInViewOnce";

interface AnimatedHeadingProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "load": animate immediately on mount (hero headline, above the fold).
   *  "reveal": animate when scrolled into view (reuses the shared IntersectionObserver hook). */
  trigger?: "load" | "reveal";
  /** Extra ms before the first line starts, letting a headline sync with sibling copy. */
  delay?: number;
}

function splitIntoLines(container: HTMLElement, text: string): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const textNode = container.firstChild;
  if (!textNode || textNode.nodeType !== Node.TEXT_NODE) return [text];

  const range = document.createRange();
  const lines: string[] = [];
  let lineStart = 0;
  let lastTop: number | null = null;
  let cursor = 0;

  for (let i = 0; i < words.length; i++) {
    const wordStart = text.indexOf(words[i], cursor);
    const wordEnd = wordStart + words[i].length;
    cursor = wordEnd;

    range.setStart(textNode, wordStart);
    range.setEnd(textNode, wordEnd);
    const top = Math.round(range.getBoundingClientRect().top);

    if (lastTop !== null && top !== lastTop) {
      lines.push(text.slice(lineStart, wordStart).trim());
      lineStart = wordStart;
    }
    lastTop = top;
  }
  lines.push(text.slice(lineStart).trim());

  return lines.filter(Boolean);
}

export function AnimatedHeading({
  children,
  as: Tag = "h2",
  className,
  trigger = "reveal",
  delay = 0,
  ...props
}: AnimatedHeadingProps & Omit<ComponentProps<ElementType>, "children" | "className">) {
  const measureRef = useRef<HTMLElement | null>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const isPlainText = typeof children === "string";

  const { ref: viewRef, isVisible: scrolledIntoView } = useInViewOnce<HTMLElement>({
    threshold: 0.2,
    skip: trigger === "load",
  });

  useLayoutEffect(() => {
    if (!isPlainText) return;
    const node = measureRef.current;
    if (!node) return;

    const measure = () => setLines(splitIntoLines(node, children as string));
    measure();

    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, [children, isPlainText]);

  const isVisible = trigger === "load" ? true : scrolledIntoView;
  const setRefs = (node: HTMLElement | null) => {
    measureRef.current = node;
    viewRef.current = node;
  };

  if (!isPlainText) {
    // Non-string content (e.g. an id-bearing <span>) is rendered as-is, unanimated — never
    // risk breaking an accessibility landmark to force a visual effect.
    return (
      <Tag ref={setRefs} className={cn("w-full min-w-0", className)} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag ref={setRefs} className={cn("line-motion-heading w-full min-w-0", className)} {...props}>
      {lines === null
        ? children
        : lines.map((line, index) => (
            <span key={index} className="line-motion-mask">
              <span
                className={cn("line-motion-inner", isVisible && "is-visible")}
                style={{ transitionDelay: isVisible ? `${delay + index * 70}ms` : "0ms" }}
              >
                {line}
                {index < lines.length - 1 ? " " : ""}
              </span>
            </span>
          ))}
    </Tag>
  );
}
