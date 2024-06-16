/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/endpoint',
                destination: 'http://localhost:5000/endpoint',
            },
        ];
    },
};

export default nextConfig;