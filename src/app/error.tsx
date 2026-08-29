"use client";

/**
 * Route-segment error boundary — ported from the old ErrorBoundary.tsx's class-component
 * behavior into Next's App Router error.tsx convention. Renders in place of a route
 * segment (and everything nested below it) when a render/render-lifecycle error is thrown;
 * layout.tsx (Header/Footer) stays mounted around it since it's outside this boundary.
 */
import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-2xl flex-col items-center p-8">
        <AlertTriangle size={48} className="mb-6 flex-shrink-0 text-destructive" />

        <h2 className="mb-4 text-xl">An unexpected error occurred.</h2>

        <div className="mb-6 w-full overflow-auto rounded bg-muted p-4">
          <pre className="text-sm whitespace-break-spaces text-muted-foreground">{error?.stack ?? error?.message}</pre>
        </div>

        <button
          onClick={() => reset()}
          className={cn(
            "flex items-center gap-2 rounded-lg px-4 py-2",
            "bg-primary text-primary-foreground",
            "cursor-pointer hover:opacity-90"
          )}
        >
          <RotateCcw size={16} />
          Try again
        </button>
      </div>
    </div>
  );
}
