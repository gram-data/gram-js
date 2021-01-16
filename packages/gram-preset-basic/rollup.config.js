import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  {
    input: "lib/gram-preset-basic.js",
    output: {
      file: "dist/gram-preset-basic.cjs.js",
      exports: "named",
      format: "cjs",
    },
    plugins: [commonjs(), nodeResolve()],
  },
  {
    input: "lib/gram-preset-basic.js",
    output: {
      file: "dist/gram-preset-basic.umd.js",
      format: "umd",
    },
  },
  {
    input: "lib/gram-preset-basic.js",
    output: {
      file: "dist/gram-preset-basic.esm.js",
      format: "es",
    },
  },
];
