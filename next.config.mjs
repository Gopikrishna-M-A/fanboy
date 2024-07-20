/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'fanboy-jerseys-images.s3.amazonaws.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'fanboy-jerseys.s3.amazonaws.com',
            port: '',
          },
        ],
      },
};

export default nextConfig;
