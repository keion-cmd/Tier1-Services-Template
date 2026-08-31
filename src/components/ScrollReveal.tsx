"use client";

/**
 * Shared scroll-triggered reveal wrapper. Fades a section in and nudges it up
 * slightly the first time it enters the viewport. Reused site-wide so every
 * page reveals with the same feel instead of bespoke per-page variants.
 */
import { type ComponentProps, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "@/hooks/useInViewOnce";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Root margin passed to IntersectionObserver; tune to reveal slightly before full entry. */
  rootMargin?: string;
}

export function ScrollReveal({ children, className, as: Tag = "div", rootMargin = "0px 0px -10% 0px", ...props }: ScrollRevealProps & Omit<ComponentProps<ElementType>, "children" | "className">) {
  const { ref, isVisible } = useInViewOnce<HTMLDivElement>({ threshold: 0.1, rootMargin });

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

/**
 * Media-focused reveal: clip-path wipe + scale-down + fade, for feature imagery
 * (EditorialImageGrid, ImageStory, service rows). Shares the same
 * IntersectionObserver + reduced-motion handling as ScrollReveal rather than a
 * bespoke observer, but animates clip-path/scale instead of a simple translate.
 */
export function ScrollClipReveal({
  children,
  className,
  as: Tag = "div",
  rootMargin = "0px 0px -10% 0px",
  delay = 0,
  ...props
}: ScrollRevealProps & { delay?: number } & Omit<ComponentProps<ElementType>, "children" | "className">) {
  const { ref, isVisible } = useInViewOnce<HTMLDivElement>({ threshold: 0.15, rootMargin });

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-[clip-path,transform,opacity] duration-[900ms] ease-out will-change-transform",
        isVisible
          ? "[clip-path:inset(0%_0_0_0)] scale-100 opacity-100"
          : "[clip-path:inset(0_0_100%_0)] scale-[1.06] opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
