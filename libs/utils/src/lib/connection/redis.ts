// import { RedisClientType }from "@redis/client";
import * as redis from "redis";

export const redisConnections = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || "localhost"}:6379`,
});
redisConnections.connect();

redisConnections.on("connect", function() {
  console.log('redis connected');
});
