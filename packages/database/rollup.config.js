const glob = require("glob");
const path = require("node:path");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const resolve = require("@rollup/plugin-node-resolve").default;
const typescript = require("@rollup/plugin-typescript").default;

module.exports = [
  {
    input: Object.fromEntries(
      glob
        .sync("src/**/!(*.d).{js,ts}", { nodir: true })
        .filter((file) => !file.includes(".test"))
        .map((file) => {
          return [
            path.relative("src", file.slice(0, file.length - path.extname(file).length)),
            file,
          ];
        })
    ),
    output: {
      format: "es",
      dir: "dist",
    },
    plugins: [peerDepsExternal(), resolve(), typescript({ tsconfig: "./tsconfig.json" })],
    cache: false,
  },
];
