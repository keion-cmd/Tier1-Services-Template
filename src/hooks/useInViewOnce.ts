"use client";

/**
 * Shared one-shot "has this entered the viewport" hook, backing ScrollReveal, ScrollClipReveal,
 * and AnimatedHeading so the whole site's scroll-triggered motion runs off a single
 * IntersectionObserver architecture instead of a bespoke observer per component.
 */
import { useEffect, useRef, useState } from "react";

export function useInViewOnce<T extends Element>({
  threshold = 0.1,
  rootMargin = "0px 0px -10% 0px",
  skip = false,
}: { threshold?: number; rootMargin?: string; skip?: boolean } = {}) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || skip) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
      { threshold, rootMargin }
    );

    observer.observe(node);

    // Safety net: IntersectionObserver sampling is tied to compositor frames and
    // is not guaranteed to fire for every scroll position. A fast flick/trackpad
    // scroll (or a page-down key spam) can carry an element through the entire
    // visible zone between two samples, so the observer never reports it as
    // intersecting and it stays permanently hidden. A lightweight scroll/resize
    // check backstops that by reading the element's actual position, which
    // always reflects the current layout regardless of how fast it got there.
    const checkPosition = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        setIsVisible(true);
        observer.disconnect();
        window.removeEventListener("scroll", checkPosition);
        window.removeEventListener("resize", checkPosition);
      }
    };
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [threshold, rootMargin, skip]);

  return { ref, isVisible };
}
