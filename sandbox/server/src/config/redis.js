import Redis from "ioredis";
import { deleteService } from "../kubernetes/service.js";
import { deletePod } from "../kubernetes/pod.js";

const redis = new Redis(process.env.REDIS_URI);

redis.on("connect", () => {
  console.log(`Sandbox-Server Service connected to Redis Successfully`);
});

redis.on("error", (err) => {
  console.log(`Sandbox-Server Service Redis connection error --> `, err);
});

const subscriber = new Redis(process.env.REDIS_URI);

export async function createSandboxKey(sandboxId) {
  await redis.set(
    `sandbox: ${sandboxId}`,
    JSON.stringify({
      status: "active",
    }),
    "EX",
    120,
  );
}

subscriber.config("SET", "notify-keyspace-events", "Ex");

subscriber.subscribe("__keyevent@0__:expired");

subscriber.on("message", async (channel, key) => {
  console.log(`key expired: ${key}`);

  const sandboxId = key.split(":")[1];
  await deleteService(sandboxId);
  await deletePod(sandboxId);
});

export default { subscriber };
