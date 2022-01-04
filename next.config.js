/** @type {import('next').NextConfig} */

module.exports = {
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
};
