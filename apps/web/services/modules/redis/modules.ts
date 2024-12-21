/* eslint-disable no-console */
import Redis from "ioredis";
import config from "services/config/redis";

const initConfig = process.env.REDIS_URL || config;

const redis = new Redis(initConfig as string);

redis.on("error", (err) => {
  console.log("REDIS ERR: ", err);
});

redis.on("connect", () => {
  console.log("CONNECTED TO REDIS SERVER");
});

export default redis;
