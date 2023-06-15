/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
}
const withImage=require('next-images')
module.exports = withImage()

module.exports = nextConfig
