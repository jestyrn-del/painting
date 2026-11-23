import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { githubPagesSpa } from "@sctg/vite-plugin-github-pages-spa";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  base: isGitHubActions ? "/painting/" : "/",

  plugins: [
    react(),
    ...(isGitHubActions ? [githubPagesSpa()] : []),
  ],
});