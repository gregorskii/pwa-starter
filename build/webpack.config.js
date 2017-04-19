const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const OptimizeJsPlugin = require("optimize-js-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const aliases = require('./aliases');
const paths = require('./paths');
const utils = require('./utils');

module.exports = {
  entry: {
    app: 'src/index.jsx'
  },
  output: {
    path: paths.dist,
    filename: 'scripts/[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    alias: aliases.resolveAlias
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.global\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { modules: false }
            },
            { loader: 'sass-loader' }
          ]
        })
      },
      {
        test: /^((?!(.global)).)*\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]--[hash:base64:5]'
              }
            },
            { loader: 'sass-loader' }
          ]
        })
      },
      {
        test: /manifest.json$/,
        loader: 'file-loader?name=manifest.json!web-app-manifest-loader'
      },
      {
        test: /noscript.html$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new CleanWebpackPlugin(
      [paths.dist],
      {
        root: paths.projectRoot,
        verbose: true,
        dry: false,
        exclude: [],
        watch: false
      }
    ),
    new CopyWebpackPlugin([
      { from: 'src/noscript.html' }
    ]),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      context: __dirname
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return utils.isVendor(module);
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new HtmlWebpackPlugin({
      filename: path.join(paths.dist, 'index.html'),
      template: path.join(paths.src, 'index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new ServiceWorkerWebpackPlugin({
      entry: 'src/sw.js',
      excludes: [
        '**/.*',
        '**/*.map',
        '*.html',
      ]
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].[contenthash].css',
      allChunks: true
    }),
    // new FaviconsWebpackPlugin({
    //   logo: path.join(paths.src, 'static', 'favicon.png'),
    //   emitStats: false,
    //   icons: {
    //     favicons: true,
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: true,
    //     coast: false,
    //     firefox: false,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: false
    //   }
    // }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      },
      output: {
        comments: false,
      }
    }),
    new OptimizeJsPlugin({
      sourceMap: false
    })
  ]
};
