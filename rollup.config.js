import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default [
  {
    input: 'src/index.js',
    name: 'spjaeld',
    output: {
      file: 'dist/spjaeld.umd.js',
      format: 'umd',
    },
    plugins: [
      resolve(),
      babel({
        presets: [
          [
            'env',
            {
              targets: {
                browsers: ['> 1%'],
              },
              modules: false,
            },
          ],
        ],
      }),
    ],
  },
  {
    input: 'src/index.js',
    name: 'spjaeld',
    output: {
      file: 'dist/spjaeld.umd.min.js',
      format: 'umd',
    },
    plugins: [
      resolve(),
      babel({
        presets: [
          [
            'env',
            {
              targets: {
                browsers: ['> 1%'],
              },
              modules: false,
            },
          ],
        ],
      }),
      uglify(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/spjaeld.cjs.js',
      format: 'cjs',
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**', // only transpile our source code
        presets: [
          [
            'env',
            {
              targets: {
                node: 'current',
              },
              modules: false,
            },
          ],
        ],
      }),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/spjaeld.es.js',
      format: 'es',
    },
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**', // only transpile our source code
        presets: [
          [
            'env',
            {
              targets: {
                node: 'current',
              },
              modules: false,
            },
          ],
        ],
      }),
    ],
  },
];
