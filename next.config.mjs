/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ecomm-project-bucket.s3.amazonaws.com',
            port: '',
          },
        ],
      },
};

export default nextConfig;
