/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lemonsqueezy.imgix.net',
                port: '',
                pathname: '/media/**',
            },
        ],
    },
};

export default nextConfig;
