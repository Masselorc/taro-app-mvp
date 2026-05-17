import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/taro-app-mvp/",
  plugins: [react()]
});
