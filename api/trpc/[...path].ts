import "dotenv/config";
import { createTrpcApp } from "../../server/app";

const app = createTrpcApp();

export default app;
