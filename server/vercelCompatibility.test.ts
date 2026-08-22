import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import apiHandler from "../api/[...path]";
import trpcHandler from "../api/trpc/[...path]";
import explicitTrpcHandler from "../api/trpc";
import storageHandler from "../api/manus-storage";
import nestedStorageHandler from "../api/manus-storage/[...path]";
import { assets } from "../client/src/lib/clinic-content";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Vercel compatibility", () => {
  it("rewrites each client route to the SPA entrypoint", () => {
    const config = JSON.parse(readFileSync(resolve(projectRoot, "vercel.json"), "utf8")) as {
      outputDirectory: string;
      routes: Array<{ src?: string; dest?: string; handle?: string }>;
    };

    expect(config.outputDirectory).toBe("dist/public");
    expect(config.routes).toEqual([
      { src: "^/api/trpc/(.*)$", dest: "/api/trpc?path=$1" },
      { src: "^/manus-storage/(.*)$", dest: "/api/manus-storage/$1" },
      { handle: "filesystem" },
      { src: "^/services$", dest: "/index.html" },
      { src: "^/location$", dest: "/index.html" },
      { src: "^/request$", dest: "/index.html" },
      { src: "^(?!/api|/manus-storage).*$", dest: "/index.html" },
    ]);
  });

  it("uses uploaded hashed asset keys for all image references", () => {
    expect(Object.values(assets)).toHaveLength(9);
    expect(Object.values(assets).every((src) => src.startsWith("/manus-storage/") && src.split("/").pop()?.includes("_"))).toBe(true);
  });

  it("exports Express-compatible API handlers for catch-all and tRPC paths", () => {
    expect(typeof apiHandler).toBe("function");
    expect(apiHandler).toHaveProperty("use");
    expect(typeof trpcHandler).toBe("function");
    expect(typeof explicitTrpcHandler).toBe("function");
    expect(typeof storageHandler).toBe("function");
    expect(typeof nestedStorageHandler).toBe("function");
  });
});
