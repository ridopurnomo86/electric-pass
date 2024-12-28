import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import baseVitePlugin from "./config/vite";

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: baseVitePlugin(process.env.NODE_ENV),
});
