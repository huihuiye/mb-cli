import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "./lib/index.ts",
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true
    },
    {
      file: "dist/index.mjs",
      format: "es",
      sourcemap: true
    }
  ],
  external: ["fs", "path", "child_process", "util", "execa", "ora"],
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json"
    })
  ]
});
