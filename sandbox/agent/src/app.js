import express from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import cors from "cors";

const WORKING_DIR = "/workspace";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ methods: ["GET", "POST", "PATCH", "DELETE"], origin: "*" }));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello from the Sandbox Agent!", status: "success" });
});

/**
 * @route GET /list-files
 * @description Lists all files in the working directory and its subdirectories. Returns a JSON object with the file paths relative to the working directory. exclude directories like node_modules, .git,dist, etc.
 * - eg. {
 *     "files": [
 *         "file1.txt",
 *         "src/file2.txt",
 *         "src/subdir/file3.txt"
 *     ]
 * }
 */
app.get("/list-files", async (req, res) => {
  const listFiles = async (dir, baseDir) => {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);

      // Exclude certain directories
      if (
        entry.isDirectory() &&
        ["node_modules", ".git", "dist"].includes(entry.name)
      ) {
        continue;
      }

      if (entry.isDirectory()) {
        files.push(...(await listFiles(fullPath, baseDir)));
      } else {
        files.push(relativePath);
      }
    }

    return files;
  };

  try {
    const files = await listFiles(WORKING_DIR, WORKING_DIR);
    res.status(200).json({
      message: "Files listed successfully",
      files,
    });
  } catch (err) {
    res.status(500).json({
      message: `Error listing files: ${err.message}`,
      status: "error",
    });
  }
});

/**
 * @route GET /read-files
 * @description Reads the content of all files requested in the query parameter 'files' and returns their content as a JSON object.
 * - eg. /read-files?files=file1.txt,/src/file2.txt
 */
app.get("/read-files", async (req, res) => {
  const files = req.query.files;
  if (!files) {
    return res.status(400).json({
      message:
        "No files specified. Please provide a comma-separated list of files in the 'files' query parameter.",
      status: "error",
    });
  }

  const fileList = files.split(",");

  const results = await Promise.all(
    fileList.map(async (file) => {
      const filePath = path.join(WORKING_DIR, file);
      try {
        const content = await fs.promises.readFile(filePath, "utf-8");
        return {
          [filePath.replace(WORKING_DIR, "")]: content,
        };
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
        return {
          [filePath.replace(WORKING_DIR, "")]:
            `Error reading file: ${error.message}`,
        };
      }
    }),
  );

  res.status(200).json({
    message: "Files read successfully",
    files: results,
  });
});

/**
 * @route PATCH /update-files
 * @description Updates the content of files specified in the request body. The request body should container a property 'updates' with a JSON Array of object, each object should have a 'file' property specifying the file path (relative to the working directory) and a 'content' property specifying the new content for the file.
 */
app.patch("/update-files", async (req, res) => {
  const updates = req.body.updates;
  if (!updates || !Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({
      message:
        'Invalid request body. Expected a JSON object with an "updates" property containing an array of file updates.',
      status: "error",
    });
  }

  const results = await Promise.all(
    updates.map(async (update) => {
      const { file, content } = update;
      const filePath = path.join(WORKING_DIR, file);
      try {
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.writeFile(filePath, content, "utf-8");
        return { [filePath]: "File updated successfully" };
      } catch (error) {
        console.error(`Error updating file ${file}:`, error);
        return { [filePath]: `Error updating file: ${error.message}` };
      }
    }),
  );

  res.status(200).json({
    message: "Files updated successfully",
    results,
  });
});

/**
 * @route POST /create-files
 * @description Creates new files with the content specified in the request body. The request body should contain a property 'files' with a JSON Array of objects, each object should have a 'file' property specifying the file path (relative to the working directory) and a 'content' property specifying the content for the new file.
 */
app.post("/create-files", async (req, res) => {
  const files = req.body.files;
  if (!files || !Array.isArray(files) || files.length === 0) {
    return res.status(400).json({
      message:
        'Invalid request body. Expected a JSON object with a "files" property containing an array of file objects.',
      status: "error",
    });
  }

  const results = await Promise.all(
    files.map(async (fileObj) => {
      const { file, content } = fileObj;
      const filePath = path.join(WORKING_DIR, file);
      try {
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
        await fs.promises.writeFile(filePath, content, "utf-8");
        return { [filePath]: "File created successfully" };
      } catch (error) {
        console.error(`Error creating file ${filePath}:`, error);
        return { [filePath]: `Error creating file: ${error.message}` };
      }
    }),
  );

  res.status(201).json({
    message: "Files created successfully",
    results,
  });
});

app.delete("/delete-files", async (req, res) => {
  const files = req.body.files;

  if (!files || !Array.isArray(files) || files.length === 0) {
    return res.status(400).json({
      message:
        'Invalid request body. Expected a JSON object with a "files" property containing an array of file paths.',
      status: "error",
    });
  }

  const results = await Promise.all(
    files.map(async (file) => {
      const filePath = path.resolve(WORKING_DIR, file);

      if (!filePath.startsWith(path.resolve(WORKING_DIR))) {
        return { [file]: "Invalid file path" };
      }

      try {
        await fs.promises.unlink(filePath);
        return { [file]: "File deleted successfully" };
      } catch (error) {
        if (error.code === "ENOENT") {
          return { [file]: "File not found" };
        }

        return { [file]: `Error deleting file: ${error.message}` };
      }
    }),
  );

  res.status(200).json({
    message: "Delete operation completed",
    results,
  });
});

export default app;
