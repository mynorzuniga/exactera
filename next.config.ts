import type { NextConfig } from "next";

/**
 * Local dev can hit **EMFILE** (too many open file watchers). Broken watching surfaces as **`GET / 404`**
 * while routes exist — webpack stops resolving `app/` reliably. **Polling** avoids exhausting watchers.
 */
const nextConfig: NextConfig = {
  /** Avoid dev HMR/CORS warnings when the browser hits `127.0.0.1` vs `localhost`. */
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
