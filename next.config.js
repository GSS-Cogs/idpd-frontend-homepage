/** @type {import('next').NextConfig} */

const origin = process.env.NEXT_PUBLIC_BACKEND_URL.replace("https://", "");

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [origin],
    },
  },
  async headers() {
    return [
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
