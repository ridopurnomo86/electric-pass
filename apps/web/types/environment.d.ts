declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DATABASE_URL: string;
      SESSION_SECRET: string;
      BOOKING_SESSION_SECRET: string;
      REDIS_URL: string;
    }
  }
}

export {};
