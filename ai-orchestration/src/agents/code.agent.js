import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent } from "langchain";
import { listFiles, readFiles, updateFiles, deleteFiles } from "./tools.js";
import "dotenv/config";

const model = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const agent = createAgent({
  model,
  tools: [listFiles, updateFiles, deleteFiles, readFiles],
});

export default agent;
