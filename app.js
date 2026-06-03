import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

import {
  errorHandler,
  notFoundHandler
} from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "*"
  })
);

app.use(express.json());

app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.get("/", (req, res) => {
  res.json({
    application: "ScanPass",
    status: "Running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/scan", scanRoutes);
app.use("/api/reports", reportRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;