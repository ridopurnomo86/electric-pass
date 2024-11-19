import redisClient from "./modules";

const DEFAULT_TTL = 30 * 60 * 1000;

const Redis = {
  getItem: (key: string) => redisClient.get(key),
  setItem: (key: string, value: string, ttl?: number) =>
    redisClient.set(key, value, "EX", ttl || DEFAULT_TTL),
};

export default Redis;
