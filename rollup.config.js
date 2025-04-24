import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

// 입력 파일 정의
const inputFiles = [
  { name: "common", path: "common.ts" },
  { name: "backend", path: "backend.ts" },
  { name: "react", path: "react.ts" },
  { name: "react-native", path: "react-native.ts" },
];

// 메인 번들 설정
const jsConfigs = inputFiles.map(({ name, path }) => ({
  input: path,
  output: [
    {
      dir: `dist/${name}`,
      format: "esm",
      entryFileNames: `${name}.esm.js`,
      chunkFileNames: `${name}-chunk.js`,
    },
    {
      dir: `dist/${name}`,
      format: "cjs",
      entryFileNames: `${name}.cjs`,
      chunkFileNames: `${name}-chunk.cjs`,
    }
  ],
  external: ['eslint', 'typescript-eslint', 'eslint-plugin-import'],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.js']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declarationDir: `dist/${name}`,
      declaration: true,
      include: [path],
      outDir: `dist/${name}`,
    }),
    json(),
  ],
}));

// 타입 선언 파일 생성 설정
const dtsConfigs = inputFiles.map(({ name, path }) => ({
  input: path,
  output: {
    file: `dist/types/${name}.d.ts`,
    format: 'es',
  },
  plugins: [dts()],
}));

export default defineConfig([...jsConfigs, ...dtsConfigs]);