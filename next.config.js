/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['rb.gy', 'lh3.googleusercontent.com']
    },
    // webpack: (config, { isServer }) => {
    //     if (!isServer) {
    //         config.resolve.fallback.fs = false
    //         config.resolve.fallback.dns = false
    //         config.resolve.fallback.net = false
    //         config.resolve.fallback.tls = false
    //     }
    //
    //     return config;
    // }
}

module.exports = nextConfig
