import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import babel from '@rollup/plugin-babel';

// 입력 파일 정의
const inputFiles = [
  { name: "common", path: "common.js" },
  { name: "backend", path: "backend.js" },
  { name: "react", path: "react.js" },
  { name: "react-native", path: "react-native.js" },
];

// 공통 설정 생성
const configs = inputFiles.map(({ name, path }) => ({
  input: path,
  output: [
    {
      dir: `dist/${name}`,
      format: "esm",
      entryFileNames: `${name}.esm.js`, // ESM 파일 이름
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
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env'], // 최신 JS 변환
      exclude: 'node_modules/**',    // node_modules 제외
    }),
    // terser(), // only for prod
    json(),
  ],
}));

export default defineConfig([...configs]);