const app = require('./app.json');

const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');

require('dotenv').config();

module.exports = (env, argv) => {
  const dirDist = path.resolve(__dirname, 'dist');
  const dirSrc = path.resolve(__dirname, 'src');
  const dev = argv.mode !== 'production';

  let serveHttps = false;
  if (process.env.SSL_KEY && process.env.SSL_CRT && process.env.SSL_PEM) {
    serveHttps = {
      key: fs.readFileSync(process.env.SSL_KEY),
      cert: fs.readFileSync(process.env.SSL_CRT),
      ca: fs.readFileSync(process.env.SSL_PEM),
    };
  }

  return {
    entry: {
      app: `${dirSrc}/index.ts`,
    },
    output: {
      path: dirDist,
      filename: 'assets/[name]-[hash].js',
      publicPath: '/',
    },
    devtool: dev ? 'source-map' : false,
    mode: dev ? 'development' : 'production',
    devServer: {
      contentBase: dirDist,
      compress: true,
      port: process.env.PORT_DEV || 8080,
      https: serveHttps,
      historyApiFallback: true,
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          loader: 'raw-loader',
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/static',
            to: `${dirDist}/assets/static`,
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: dev ? 'assets/[name].css' : 'assets/[name].[hash].css',
        chunkFilename: dev
          ? 'assets/[name].[id].css'
          : 'assets/[name].[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        title: app.title,
        description: app.description,
        template: 'src/index.html',
        filename: './index.html',
        chunksSortMode: 'none',
      }),
      new DefinePlugin({
        IS_DEV: JSON.stringify(dev),
        APP_TITLE: JSON.stringify(app.title) || '',
        APP_DESCRIPTION: JSON.stringify(app.description) || '',
        GMAPS_KEY: JSON.stringify(process.env.GMAPS_KEY || ''),
        API_BASE: JSON.stringify(
          process.env.API_BASE || 'http://localhost:8080/'
        ),
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
        '@comp': `${dirSrc}/components/`,
        '@common': `${dirSrc}/common/`,
        '@theme': `${dirSrc}/theme/`,
        '@types': `${dirSrc}/types/`,
      },
    },
  };
};
