import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      // @ts-ignore
      src: __dirname + "/src",
    },
  },
  server: {
    port: 2200,
  },
  esbuild: {
    jsxInject: "import React from 'react';",
  },
});
