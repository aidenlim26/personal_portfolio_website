import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root so a stray lockfile in a parent directory
    // (e.g. ~/package-lock.json) can't be inferred as the project root.
    root: path.join(import.meta.dirname, "."),
  },
};

export default nextConfig;
