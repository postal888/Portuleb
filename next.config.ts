import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/en/practice/reading",
        destination: "/en/reader",
        permanent: true,
      },
      {
        source: "/en/practice/reading/:path*",
        destination: "/en/reader",
        permanent: true,
      },
      {
        source: "/ru/praktika/reading",
        destination: "/ru/chitalka",
        permanent: true,
      },
      {
        source: "/ru/praktika/reading/:path*",
        destination: "/ru/chitalka",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [];
  },
};

export default nextConfig;
