/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.thecocktaildb.com',
                port: '',
            },
        ],
        domains: ['www.thecocktaildb.com']
    }
};

export default nextConfig;
