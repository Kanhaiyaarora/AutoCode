import express from "express";
import morgan from "morgan";
import agentRouter from "./routes/agent.routes.js";

const app = express();
// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "ai-orchestration api is healthy" });
});

app.get("/api/status/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/ai", agentRouter);

export default app;
