import express, { type Express } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./_core/oauth";
import { registerStorageProxy } from "./_core/storageProxy";
import { createContext } from "./_core/context";
import { appRouter } from "./routers";

function configureBodyParsing(app: Express) {
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
}

function createTrpcMiddleware() {
  return createExpressMiddleware({
    router: appRouter,
    createContext,
  });
}

export function createTrpcApp(): Express {
  const app = express();
  configureBodyParsing(app);
  const trpcMiddleware = createTrpcMiddleware();

  // Vercel may invoke a nested function with either the original URL or the
  // path stripped to the function root. Supporting both keeps the API stable.
  app.use("/", trpcMiddleware);
  app.use("/api/trpc", trpcMiddleware);

  return app;
}

export function createApiApp(): Express {
  const app = express();
  configureBodyParsing(app);
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.use("/api/trpc", createTrpcMiddleware());
  return app;
}
