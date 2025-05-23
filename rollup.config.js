import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import babel from '@rollup/plugin-babel'
import dts from 'rollup-plugin-dts'
import { glob } from 'glob'
import { fileURLToPath, URL } from 'url'
import { extname, relative } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import postcss from 'rollup-plugin-postcss'
import css from 'rollup-plugin-css-only'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default [
  {
    input: Object.fromEntries(
      glob
        .sync('lib/**/!(*.stories).{js,jsx}')
        .map((file) => [
          relative('lib', file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
    ),
    output: [
      {
        format: 'es',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
        dir: 'dist/es',
        // sourcemap: true,
      },
      {
        format: 'cjs',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
        dir: 'dist/cjs',
        // sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve({
        browser: true,
      }),
      postcss({
        plugins: [autoprefixer(), tailwindcss()],
      }),
      commonjs(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-react'], // Enables JSX support
      }),
      visualizer(),
    ],
    external: ['react', 'react-dom', '@xyflow/react'],
  },
  // Separate configuration for generating type definitions
  {
    input: 'lib/index.js',
    output: [{ file: 'dist/types/index.d.js', format: 'es' }],
    plugins: [dts(), css()],
  },
]
