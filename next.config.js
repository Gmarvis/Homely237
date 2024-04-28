/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
    images: {
        domains: ["files.edgestore.dev", "i.pinimg.com"],
        ...withPWA({
            dest: "public",
            register: true,
            skipWaiting: true,
            disable: process.env.NODE_ENV === "development",
        }),
    },
};

module.exports = nextConfig;
