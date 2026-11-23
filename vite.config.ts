import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { githubPagesSpa } from "@sctg/vite-plugin-github-pages-spa";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === "true" ? "/painting/" : "/",

  plugins: [
    react(),
    githubPagesSpa(),
  ],
});