import express from "express";
import morgan from "morgan";
import { createPod } from "./kubernetes/pod.js";
import { createService } from "./kubernetes/service.js";
import { v7 as uuid } from "uuid";
import { createSandboxKey } from "./config/redis.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/sandbox/health", (req, res) => {
  res.status(200).json({ message: "Sandbox Api is running", status: "ok" });
});

app.post("/api/sandbox/start", async (req, res) => {
  const sandboxId = uuid();
  if (!sandboxId) {
    return res.status(400).json({ message: "sandboxId is required" });
  }
  try {
    await Promise.all([
      createPod(sandboxId),
      createService(sandboxId),
      createSandboxKey(sandboxId),
    ]);
    return res.status(201).json({
      message: "Sandbox environment created successfully",
      sandboxId,
      previewUrl: `http://${sandboxId}.preview.localhost`,
    });
  } catch (error) {
    console.error("Error creating sandbox:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
