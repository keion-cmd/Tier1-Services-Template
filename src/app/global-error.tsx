"use client";

/**
 * Top-level fallback — only used when the ROOT layout itself throws (rare; error.tsx
 * handles everything else since it's nested under the layout). Per Next.js convention,
 * this must render its own <html>/<body> since the root layout is what failed.
 */
import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: "2rem", background: "#fff", color: "#111" }}>
          <div style={{ display: "flex", width: "100%", maxWidth: "42rem", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
            <AlertTriangle size={48} style={{ marginBottom: "1.5rem", flexShrink: 0, color: "#dc2626" }} />
            <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem" }}>An unexpected error occurred.</h2>
            <div style={{ marginBottom: "1.5rem", width: "100%", overflow: "auto", borderRadius: "0.25rem", background: "#f4f4f5", padding: "1rem" }}>
              <pre style={{ fontSize: "0.875rem", whiteSpace: "pre-wrap", color: "#52525b" }}>{error?.stack ?? error?.message}</pre>
            </div>
            <button
              onClick={() => reset()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                borderRadius: "0.5rem",
                padding: "0.5rem 1rem",
                background: "#0f766e",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              <RotateCcw size={16} />
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
