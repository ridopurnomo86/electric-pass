declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      SESSION_SECRET: string;
      BOOKING_SESSION_SECRET: string;
      REDIS_URL: string;
      STRIPE_PUBLISH_API_KEY: string;
    }
  }
}

export {};
