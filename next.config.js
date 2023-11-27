/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["http://localhost", "https://staging.idpd.uk"],
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
