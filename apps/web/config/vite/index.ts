import legacy from "@vitejs/plugin-legacy";
import { vitePlugin as remix } from "@remix-run/dev";
import { flatRoutes } from "remix-flat-routes";
import tsconfigPaths from "vite-tsconfig-paths";
import viteCompression from "vite-plugin-compression";

const legacyPlugin = () =>
  legacy({
    targets: [">0.5%", "not dead", "not op_mini all"],
  });

const gzipCompressionPlugin = () =>
  viteCompression({
    threshold: 0,
    algorithm: "gzip",
    ext: ".gz",
  });

const brotliCompressionPlugin = () =>
  viteCompression({
    threshold: 0,
    algorithm: "brotliCompress",
    ext: ".br",
  });

const remixPlugin = remix({
  basename: "/",
  buildDirectory: "build",
  future: {
    /* any enabled future flags */
  },
  ignoredRouteFiles: ["**/*.css"],
  routes: async (defineRoutes) => flatRoutes("routes", defineRoutes),
  serverBuildFile: "index.js",
}) as unknown as Plugin;

const baseVitePlugins = [remixPlugin, tsconfigPaths()];

const getVitePlugin = (mode: string) => {
  if (mode === "development") return baseVitePlugins;

  const productionPlugins = [...baseVitePlugins];

  productionPlugins.push(
    legacyPlugin() as unknown as Plugin,
    gzipCompressionPlugin(),
    brotliCompressionPlugin()
  );

  return productionPlugins;
};

export default getVitePlugin;
