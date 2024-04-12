/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrickMode: true,
  webpack5: true,
  webpack: (config, options) => {
    config.cache = false;
    return config;
   },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hxavgjouatzlrjtjgrth.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
