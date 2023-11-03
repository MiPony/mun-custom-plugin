const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
  host: 'localhost',
  port: 3000
};

module.exports = {
  entry: [
    path.join(__dirname, 'inc/js/app.js'),
    path.join(__dirname, 'inc/scss/main.scss'),
  ],
  output: {
    filename: 'inc/js/app.min.js',
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'inc/css/main.min.css'
    }),
    new BrowserSyncPlugin({
      host: config.host,
      port: config.port,
      server: {
        baseDir: ['./']
      }
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};