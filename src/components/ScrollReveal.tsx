"use client";

/**
 * Shared scroll-triggered reveal wrapper. Fades a section in and nudges it up
 * slightly the first time it enters the viewport. Reused site-wide so every
 * page reveals with the same feel instead of bespoke per-page variants.
 */
import { useEffect, useRef, useState, type ComponentProps, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Root margin passed to IntersectionObserver; tune to reveal slightly before full entry. */
  rootMargin?: string;
}

export function ScrollReveal({ children, className, as: Tag = "div", rootMargin = "0px 0px -10% 0px", ...props }: ScrollRevealProps & Omit<ComponentProps<ElementType>, "children" | "className">) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
