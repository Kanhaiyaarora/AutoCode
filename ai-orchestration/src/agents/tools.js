import axios from "axios";
import { tool } from "langchain";
import * as z from "zod";

export const listFiles = tool(
  async ({}) => {
    console.log("............................");
    console.log("using list files tool");
    console.log("............................");
    const response = await axios.get(
      "http://019fd8e5-7fb2-7612-9b20-ddbbb378b46d.agent.localhost/list-files",
    );
    console.log("............................");
    console.log("response from list files tool", response.data);
    console.log("............................");
    return JSON.stringify(response.data.files);
  },
  {
    name: "list_files",
    description:
      "Step 1 of the file editing workflow. List all files in the project workspace. Use this first to understand the project structure and locate relevant files before calling read_files, update_files, or delete_files. Skip only if the required file paths are already known with certainty.",
    schema: z.object({}),
  },
);

export const readFiles = tool(
  async ({ files = [] }) => {
    console.log("............................");
    console.log("using read files tool");
    console.log("............................");
    console.log(files);
    const response = await axios.get(
      "http://019fd8e5-7fb2-7612-9b20-ddbbb378b46d.agent.localhost/read-files?files=" +
        files.join(","),
    );
    console.log("............................");
    console.log("response from read files tool", response.data);
    console.log("............................");
    return JSON.stringify(response.data);
  },
  {
    name: "read_files",
    description:
      "Step 2 of the file editing workflow. Read the contents of relevant files after listing them. Use this to understand the existing implementation before making modifications. Do not update or delete files without reading them first unless the user explicitly instructs otherwise. Do not call this tool again for the same files unless the user explicitly requests rereading them.",
    schema: z.object({
      files: z
        .array(z.string())
        .describe(
          "Required. Relative file paths returned by list_files. Example: ['src/App.jsx']",
        ),
    }),
  },
);

export const updateFiles = tool(
  async ({ files }) => {
    console.log("............................");
    console.log("using update files tool");
    console.log("............................");
    const response = await axios.patch(
      "http://019fd8e5-7fb2-7612-9b20-ddbbb378b46d.agent.localhost/update-files",
      { updates: files },
    );
    console.log("............................");
    console.log("response from update files tool", response.data);
    console.log("............................");
    return JSON.stringify(response.data.results);
  },
  {
    name: "update_files",
    description:
      "Step 3 of the file editing workflow. Modify existing files or create new files after understanding the current implementation. Use this after read_files. New files can be created by specifying a new file path and its content.",
    schema: z.object({
      files: z
        .array(
          z.object({
            file: z
              .string()
              .describe("the absolute path of the file to update"),
            content: z
              .string()
              .describe(
                "The new content for the file, the content should support json format",
              ),
          }),
        )
        .describe("The list of files to update and their new contents"),
    }),
  },
);

export const deleteFiles = tool(
  async ({ files }) => {
    console.log("............................");
    console.log("using delete files tool");
    console.log("............................");
    const response = await axios.delete(
      "http://019fd8e5-7fb2-7612-9b20-ddbbb378b46d.agent.localhost/delete-files",
      {
        data: {
          files,
        },
      },
    );
    console.log("............................");
    console.log("response from delete files tool", response.data);
    console.log("............................");
    return JSON.stringify(response.data.results);
  },
  {
    name: "delete_files",
    description:
      "Final step of the file editing workflow. Delete files that are no longer needed after the required changes have been completed. Use only after confirming they are safe to remove or when the user explicitly requests deletion.",
    schema: z.object({
      files: z
        .array(z.string())
        .describe("List of relative file paths to delete"),
    }),
  },
);
