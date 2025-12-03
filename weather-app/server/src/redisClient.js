import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (err) => console.log("Redis client failed to connect", err));

redisClient.on("connect", () => console.log("Redis client connected"));

await redisClient.connect();

export default redisClient;
