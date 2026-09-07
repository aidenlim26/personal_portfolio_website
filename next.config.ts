import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root so a stray lockfile in a parent directory
    // (e.g. ~/package-lock.json) can't be inferred as the project root.
    root: path.join(import.meta.dirname, "."),
  },
  images: {
    // Next 16 defaults this allowlist to [75] and coerces anything else to the
    // nearest allowed value. Photographs and paintings are the whole point of
    // this page, so 85 has to be declared here or `quality={85}` is a no-op.
    qualities: [85],
  },
};

export default nextConfig;
