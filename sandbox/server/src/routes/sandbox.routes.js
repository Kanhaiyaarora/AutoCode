import { Router } from "express";
import { createPod } from "./kubernetes/pod.js";
import { createService } from "./kubernetes/service.js";
import { v7 as uuid } from "uuid";
import { createSandboxKey } from "./config/redis.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import Project from "../models/project.model.js";

const router = Router();

router.post("/start", authMiddleware, async (req, res) => {
  const projectId = req.body.projectId;

  const project = await Project.findOne({ _id: projectId, user: req.user.id });

  if (!project) {
    return res
      .status(404)
      .json({ message: "Project not found or access denied" });
  }

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

export default router;
