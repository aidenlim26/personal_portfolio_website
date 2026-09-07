import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root so a stray lockfile in a parent directory
    // (e.g. ~/package-lock.json) can't be inferred as the project root.
    root: path.join(import.meta.dirname, "."),
  },
  images: {
    // Next 16 coerces any `quality` not listed here to the nearest listed
    // value. The two logo tiles are the only images and both use 75.
    qualities: [75],
  },
};

export default nextConfig;
