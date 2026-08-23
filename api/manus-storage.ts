import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import { createApiApp } from "../server/app";

const app = createApiApp();

export default function handler(req: Request, res: Response, next: NextFunction) {
  const path = req.query.path;
  if (typeof path === "string") {
    req.url = `/manus-storage/${path}`;
  }

  return app(req, res, next);
}
