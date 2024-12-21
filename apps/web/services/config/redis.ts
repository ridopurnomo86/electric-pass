import { RedisOptions } from "ioredis";

const config = {
  host: process.env.REDIS_HOST,
  port: (process.env.REDIS_PORT as RedisOptions["port"]) || 6379,
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  connectTimeout: 10000,
  db: 0, // Defaults to 0
};

export default config;
