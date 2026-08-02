import express from "express";
import morgan from "morgan";

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

export default app;
