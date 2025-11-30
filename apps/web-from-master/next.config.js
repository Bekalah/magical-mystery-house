/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    optimizeCss: true, // Optimize CSS for better performance
  },
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["your-image-domain.com"], // Add domains for image optimization
  },
  webpack: (config) => {
    // Custom Webpack configuration for art and design tools
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"], // Support for SVG imports
    });
    return config;
  },
};

module.exports = nextConfig;
