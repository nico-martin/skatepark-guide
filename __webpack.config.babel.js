import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';
import TerserJSPlugin from 'terser-webpack-plugin';
import { DefinePlugin } from 'webpack';
import app from './app.json';

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
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    entry: {
      app: `${dirSrc}/toastContext.tsx`,
    },
    devServer: {
      contentBase: dirDist,
      compress: true,
      port: process.env.PORT_DEV || 8080,
      https: serveHttps,
      hot: true,
      historyApiFallback: true,
    },
    output: {
      path: dirDist,
      filename: 'assets/[name]-[hash].js',
      publicPath: '/',
    },
    devtool: dev ? 'source-map' : false,
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new MiniCssExtractPlugin({
        filename: dev ? 'assets/[name].css' : 'assets/[name].[hash].css',
        chunkFilename: dev
          ? 'assets/[name].[id].css'
          : 'assets/[name].[id].[hash].css',
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/assets/static',
          to: 'assets/static',
        },
      ]),
      new HtmlWebpackPlugin({
        title: app.title,
        description: app.description,
        template: 'src/index.html',
        filename: './index.html',
        chunksSortMode: 'none',
        minify: dev
          ? false
          : {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
            },
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
    module: {
      rules: [
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          loader: ['babel-loader', 'raw-loader'],
        },
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('postcss-mixins')({
                      mixinsDir: path.join(__dirname, 'src/styles/mixins'),
                    }),
                    require('postcss-nested'),
                    require('autoprefixer'),
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
        '@comp': `${dirSrc}/components/`,
        '@common': `${dirSrc}/common/`,
        '@theme': `${dirSrc}/theme/`,
        '@types': `${dirSrc}/@types/`,
      },
    },
  };
};