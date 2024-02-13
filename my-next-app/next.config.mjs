/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.ibb.co',
            port: '',
            pathname: '/**',
          },
        ],
      },
}

export const config = {
  api: {
    bodyParser: true
  }
}

export default nextConfig;
