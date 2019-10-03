import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.js",
    output: {
      name: "spjaeld",
      file: "dist/spjaeld.umd.js",
      format: "umd",
    },
    plugins: [
      resolve(),
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              targets: { browsers: ["> 1%"] },
              modules: false,
            },
          ],
        ],
      }),
    ],
  },
  {
    input: "src/index.js",
    output: {
      name: "spjaeld",
      file: "dist/spjaeld.umd.min.js",
      format: "umd",
    },
    plugins: [
      resolve(),
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              targets: { browsers: ["> 1%"] },
              modules: false,
            },
          ],
        ],
      }),
      terser(),
    ],
  },
  {
    input: "src/index.js",
    output: { file: "dist/spjaeld.cjs.js", format: "cjs" },
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**", // only transpile our source code
        presets: [
          [
            "@babel/preset-env",
            {
              targets: { node: "current" },
              modules: false,
            },
          ],
        ],
      }),
    ],
  },
  {
    input: "src/index.js",
    output: { file: "dist/spjaeld.es.js", format: "es" },
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**", // only transpile our source code
        presets: [
          [
            "@babel/preset-env",
            {
              targets: { node: "current" },
              modules: false,
            },
          ],
        ],
      }),
    ],
  },
];
