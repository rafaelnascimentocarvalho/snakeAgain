/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: false,
  },
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_REST: "https://api.oitop.studio/v1/graph/",
    TOKEN: "db2e10c6-85c0-4633-ad11-891fe6e3d1f0",
    VUE_APP_API_URL: "https://api.oitop.studio",
    VUE_APP_APP_URL: "https://app.8pdev.studio",
    VUE_APP_BOARD_URL: "https://board.8pdev.studio",
    VUE_APP_SITE_URL: "https://hub.8pdev.studio",
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/products/results",
        destination: "/results/1",
      },
      {
        source: "/products/results/:path*",
        destination: "/results/:path*",
      },
      {
        source: "/products/",
        destination: "/products/page/1",
      },
    ];
  },
  trailingSlash: true,
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oitop.studio",
        pathname: "/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
        pathname: "/video/**",
      },
      {
        protocol: "https",
        hostname: "cloud8p.s3.sa-east-1.amazonaws.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "d1wd21ey9b0wqd.cloudfront.net",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
