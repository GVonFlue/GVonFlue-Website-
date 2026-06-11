/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "duckwichita.com" }],
        destination: "/duckwichita",
      },
      {
        source: "/",
        has: [{ type: "host", value: "www.duckwichita.com" }],
        destination: "/duckwichita",
      },
    ];
  },
};

module.exports = nextConfig;
