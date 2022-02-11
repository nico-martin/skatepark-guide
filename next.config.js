/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const withClassNamesMap = require('@nico-martin/class-names-map/nextjs.js');

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  experimental: {
    modern: true,
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
  },
  reactStrictMode: true,
  images: {},
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
