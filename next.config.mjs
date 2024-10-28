/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],
    dangerouslyAllowSVG: true,
    domains: ['localhost'],
  },
};

export default nextConfig;
