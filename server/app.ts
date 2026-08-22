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

export function createTrpcApp(): Express {
  const app = express();
  configureBodyParsing(app);
  app.use(
    "/",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
  return app;
}

export function createApiApp(): Express {
  const app = express();
  configureBodyParsing(app);
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
  return app;
}
