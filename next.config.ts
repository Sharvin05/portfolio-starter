import path from "node:path";
import type { NextConfig } from "next";
import { loadEnvConfig } from "@next/env";

// Load .env / .env.local now: the config below reads SITE_CONTENT_DIR before Next.js would.
loadEnvConfig(__dirname);

/**
 * Where the site's content comes from (the `@content` import).
 * Default: ./src/content (the sample content shipped with this repo).
 * Set SITE_CONTENT_DIR to use a folder elsewhere, e.g. a private content package in a monorepo.
 */
const externalContent = process.env.SITE_CONTENT_DIR;
const contentDir = externalContent ? path.resolve(__dirname, externalContent) : path.join(__dirname, "src", "content");
const contentEntry = path.join(contentDir, "index.ts");

const nextConfig: NextConfig = {
  // Content outside this folder needs to be compiled too.
  experimental: externalContent ? { externalDir: true } : {},
  // Trace files from the folder that holds both the app and its content.
  outputFileTracingRoot: externalContent ? path.join(__dirname, "../..") : __dirname,
  // Lets a production build run next to the dev server without sharing its folder.
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  // Lets component SCSS modules write `@use "mixins" as *;`
  sassOptions: { loadPaths: [path.join(__dirname, "src", "styles")], includePaths: [path.join(__dirname, "src", "styles")] },
  // tsconfig maps "@content" to ./src/content for type checking; this swaps in the real folder at build time.
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/^@content$/, contentEntry));
    return config;
  },
  turbopack: { resolveAlias: { "@content": contentEntry } },
};

export default nextConfig;
