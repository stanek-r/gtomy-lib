import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import css from 'rollup-plugin-import-css';

const packageJson = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [css(), peerDepsExternal(), resolve(), commonjs(), json(), typescript({ tsconfig: './tsconfig.json' })],
    external: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-hook-form',
      'axios',
      'zustand',
      'tailwind-merge',
      '@heroicons/react',
      '@sentry/react',
      '@tanstack/react-query',
      'react-lazy-load-image-component',
      'react-ga4',
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
  },
];
