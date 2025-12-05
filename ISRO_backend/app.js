import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import cookieParser from "cookie-parser";
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import { interactive_router } from "./rotues/interactive_mode.router.js";
import { evaluation_router } from "./rotues/evaluation_mode.router.js";
app.use("/api", interactive_router);
app.use("/api", evaluation_router);
console.log("aaya hu app.js ");
app.get("/", (req, res) => {
  res.send("Hello World");
});
export default app;
