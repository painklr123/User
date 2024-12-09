/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER_API: process.env.SERVER_API,
        APP_URL: process.env.APP_URL,
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '5mb', // Adjust the limit based on your needs (e.g., '2mb', '10mb')
        },
    },
};

export default nextConfig;
