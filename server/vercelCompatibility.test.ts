import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import apiHandler from "../api/[...path]";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Vercel compatibility", () => {
  it("rewrites each client route to the SPA entrypoint", () => {
    const config = JSON.parse(readFileSync(resolve(projectRoot, "vercel.json"), "utf8")) as {
      rewrites: Array<{ source: string; destination: string }>;
    };

    expect(config.rewrites).toEqual([
      { source: "/services", destination: "/index.html" },
      { source: "/location", destination: "/index.html" },
      { source: "/request", destination: "/index.html" },
    ]);
  });

  it("exports an Express-compatible API handler", () => {
    expect(typeof apiHandler).toBe("function");
    expect(apiHandler).toHaveProperty("use");
  });
});
