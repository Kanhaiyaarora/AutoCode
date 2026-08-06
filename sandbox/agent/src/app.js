import express from "express";
import morgan from "morgan";
import fs from "fs";

const WORKING_DIR = "/workspace";

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from the Sandbox Agent!", status: "success" });
});

app.get("/list-files", async (req, res) => {
  const elements = await fs.promises.readdir(WORKING_DIR);

  res.status(200).json({
    message: "List of files and directories in the working directory",
    elements,
  });
});

app.get("/read-files", async (req, res) => {
  const files = req.query.files;
  if (!files) {
    return res.status(400).json({
      message: "Files query parameter is required",
      status: "error",
    });
  }

  const fileList = files.split(",");

  const results = await Promise.all(
    fileList.map(async (file) => {
      const filePath = `${WORKING_DIR}/${file}`;
      try {
        const content = await fs.promises.readFile(filePath, "utf-8");
        return {
          [filePath]: content,
        };
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
        return { [filePath]: `Error reading file: ${error.message}` };
      }
    }),
  );

  res.status(200).json({
    message: "Files read successfully",
    files: results,
  });
});




export default app;
