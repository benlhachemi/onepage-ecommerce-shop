/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['i.imgur.com', 'onepage-ecommerce-strapi-production.up.railway.app'],
    }
}

module.exports = nextConfig
