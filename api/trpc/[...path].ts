import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import { createTrpcApp } from "../../server/app";

const app = createTrpcApp();

export default function handler(req: Request, res: Response, next: NextFunction) {
  const path = req.query.path;
  if (typeof path === "string" && (req.path === "/" || req.path === "")) {
    const query = new URLSearchParams(req.query as Record<string, string>);
    query.delete("path");
    const queryString = query.toString();
    req.url = `/${path}${queryString ? `?${queryString}` : ""}`;
  }

  return app(req, res, next);
}
