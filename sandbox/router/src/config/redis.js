import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log(`Sandbox-Router Service connected to Redis Successfully`);
});

redis.on("error", (err) => {
  console.log(`Sandbox-Router Service Redis connection error --> `, err);
});

export async function refreshTTL(sandboxId) {
  await redis.expire(`sandbox:${sandboxId}`, 120);
}
