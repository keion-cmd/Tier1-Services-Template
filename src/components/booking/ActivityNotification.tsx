"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle } from "lucide-react";
import { sampleActivity, formatMinutesAgo, shuffled, type BookingActivity } from "@/data/sampleActivity";

const VISIBLE_MS = 8_000;
const ANIM_MS = 250;

export function ActivityNotification() {
  const [current, setCurrent] = useState<BookingActivity | null>(null);
  const [visible, setVisible] = useState(false);
  const queueRef = useRef<BookingActivity[]>([]);
  const lastIdRef = useRef<number | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const addTimer = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const nextItem = useCallback((): BookingActivity => {
    if (queueRef.current.length === 0) {
      let pool = shuffled(sampleActivity);
      if (pool[0].id === lastIdRef.current && pool.length > 1) {
        pool = [...pool.slice(1), pool[0]];
      }
      queueRef.current = pool;
    }
    return queueRef.current.shift()!;
  }, []);

  const showNext = useCallback(() => {
    const item = nextItem();
    lastIdRef.current = item.id;
    setCurrent(item);
    setVisible(true);

    addTimer(() => {
      setVisible(false);
      addTimer(showNext, ANIM_MS);
    }, VISIBLE_MS);
  }, [nextItem]);

  useEffect(() => {
    const init = setTimeout(showNext, 2_000);
    return () => {
      clearTimeout(init);
      clearTimers();
    };
  }, [showNext]);

  if (!current) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-[90] w-[240px] transition-all sm:bottom-6 sm:left-6"
      style={{
        pointerEvents: visible ? "auto" : "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transitionDuration: `${ANIM_MS}ms`,
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary px-4 py-3 shadow-xl">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15 text-primary-foreground">
          <CheckCircle size={16} strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold leading-tight text-primary-foreground">{current.name}</p>
          <p className="text-xs font-semibold leading-tight text-primary-foreground/90">Booked {current.service}</p>
          <p className="text-[11px] leading-tight text-primary-foreground/70">
            {current.location} · {formatMinutesAgo(current.minutesAgo)}
          </p>
        </div>
      </div>
    </div>
  );
}
