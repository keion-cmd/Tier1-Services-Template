"use client";

/**
 * Global, restrained cursor accent: a small ring that trails the real pointer and grows
 * slightly over interactive elements. Desktop-only (fine pointer + hover capability),
 * disabled under prefers-reduced-motion, and deliberately never hides or replaces the native
 * cursor — it's a decorative accent layered on top, so precision targeting, text-cursor
 * affordances, and accessibility semantics are all untouched.
 *
 * Single document-level mousemove listener, rAF-coalesced, mutating a ref's transform directly
 * (no React state on every frame) so it stays cheap even on long scroll-heavy pages. Hover
 * state (its one piece of React state) only changes when the pointer crosses into/out of an
 * interactive element, not on every pixel of movement.
 */
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor="pointer"]';

export function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);
  const nextPos = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(isFinePointer && !prefersReducedMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const applyPosition = () => {
      rafId.current = null;
      const node = wrapperRef.current;
      if (!node) return;
      node.style.transform = `translate3d(${nextPos.current.x}px, ${nextPos.current.y}px, 0) translate(-50%, -50%)`;
    };

    const handleMove = (event: MouseEvent) => {
      nextPos.current = { x: event.clientX, y: event.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(applyPosition);
      }
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setIsPointer(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    const handleLeaveWindow = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeaveWindow);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
    >
      <div
        className={cn(
          "h-7 w-7 rounded-full border border-white mix-blend-difference transition-[transform,opacity] duration-200 ease-out",
          isPointer ? "scale-[1.7]" : "scale-100",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
