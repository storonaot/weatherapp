const webpack = require('webpack')
const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: { modules: './javascripts/index.js' },
  output: {
    path: path.resolve(__dirname, 'public/bundles/'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$|\.js$/,
        exclude: [
          path.resolve(__dirname, 'public'),
          path.resolve(__dirname, 'node_modules')
        ],
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'node_modules/css-wipe'),
          path.resolve(__dirname, 'node_modules/react-quill')
        ],
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
        include: /flexboxgrid/
      },
      {
        test: /\.sss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: './postcss.config.js' }
            }
          }
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              name: '[path][name].[ext]?[hash:base64]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, './app/components')
    ],
    extensions: ['.js', '.css', '.jsx', '.sss']
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      _: 'lodash',
      PropTypes: 'prop-types',
      axios: 'axios'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new StyleLintPlugin({
      configFile: './.stylelintrc',
      syntax: 'sugarss'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en/)
  ],
  devServer: {
    host: 'localhost',
    contentBase: path.join(__dirname, 'public'),
    port: 8080,
    historyApiFallback: true,
    hot: true,
    index: 'index.html'
  }
}
