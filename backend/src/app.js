import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorHandler } from "./middlewares/error.middlewares.js";

const app = express();

// middlewares;
app.use(express.json({
  limit: "16kb"
}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CORS_ORIGIN
}))

app.get("/", (req, res) => {
  res.send({ ok: true });
})

// routes import;
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

// routes declaration
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/product", productRouter);

// common errorhandler middleware;
app.use(errorHandler);

export { app };