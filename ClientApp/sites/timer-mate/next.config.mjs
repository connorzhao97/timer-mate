/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
  experimental: {
    ...(process.env.NODE_ENV === "development"
      ? { outputFileTracingRoot: path.join(__dirname, "../../../") }
      : null),
  },
};

export default nextConfig;
