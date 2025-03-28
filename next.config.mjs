/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  transpilePackages: ["mui-tel-input"],
  images: {
    domains: ["https://ralli.logodesignagency.co/"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "ralli.logodesignagency.co",
        port: "8000",
        pathname: "/assets/images/profiles/**",
      },
      {
        protocol: "http",
        hostname: "ralli.logodesignagency.co",
        port: "8000",
        pathname: "/assets/posts/media/**",
      },
      {
        protocol: "http",
        hostname: "ralli.logodesignagency.co",
        port: "8000",
        pathname: "/storage/assets/posts/media/**",
      },
      {
        protocol: "http",
        hostname: "ralli.logodesignagency.co",
        port: "8000",
        pathname: "/storage/assets/posts/media/**",
      },
      {
        protocol: "https",
        hostname: "ralli.logodesignagency.co",
        port: "8000",
        pathname: "/storage/assets/posts/media/**",
      },
    ],
  },
  // images: {
  //   domains: ["10.10.1.2"],
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "10.10.1.2",
  //       port: "8000",
  //       pathname: "/assets/images/profiles/**",
  //     },
  //     {
  //       protocol: "http",
  //       hostname: "10.10.1.2",
  //       port: "8000",
  //       pathname: "/assets/posts/media/**",
  //     },
  //     {
  //       protocol: "http",
  //       hostname: "10.10.1.2",
  //       port: "8000",
  //       pathname: "/storage/assets/posts/media/**",
  //     },
  //     {
  //       protocol: "http",
  //       hostname: "10.10.1.2",
  //       port: "8000",
  //       pathname: "/storage/assets/posts/media/**",
  //     },
  //   ],
  // },
};

export default nextConfig;
