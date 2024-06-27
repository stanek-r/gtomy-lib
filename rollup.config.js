import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-import-css';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import { dts } from 'rollup-plugin-dts';
import path from 'path';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true,
        inlineDynamicImports: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      css(),
      resolve(),
      commonjs(),
      json(),
      typescript({ tsconfig: './tsconfig.json' }),
      copy({
        targets: [
          { src: './package.json', dest: 'dist' },
          { src: './README.md', dest: 'dist' },
        ],
      }),
    ],
    external: [
      '@cloudflare/stream-react',
      '@radix-ui/react-dialog',
      '@tanstack/react-query',
      '@tanstack/query-sync-storage-persister',
      '@tanstack/react-query-persist-client',
      'axios',
      'i18next',
      'i18next-browser-languagedetector',
      'js-file-download',
      'jwt-decode',
      'react-hot-toast',
      'dayjs',
      'react-i18next',
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [
      alias({
        entries: [
          {
            find: '@',
            replacement: path.resolve('./dist/types'),
          },
        ],
      }),
      dts(),
      del({
        targets: 'dist/types',
        hook: 'buildEnd',
      }),
    ],
  },
];
