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
      {
        source: "/pt-br/home-mock",
        destination: "/pt-br",
        permanent: true,
      },
      {
        source: "/pt-br/home-mock/escrita",
        destination: "/pt-br/escrever",
        permanent: true,
      },
      {
        source: "/pt-br/escrita",
        destination: "/pt-br/escrever",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [];
  },
  async headers() {
    return [
      {
        // Tokenised report links are personal: never cached, never indexed.
        source: "/:locale(pt-br|en|ru)/writing/report/:token",
        headers: [
          { key: "Cache-Control", value: "private, no-store, max-age=0, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

export default nextConfig;
