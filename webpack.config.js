const path = require('path')

const webpack = require('webpack')

const CamundaModelerWebpackPlugin = require('camunda-modeler-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './client/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.js'
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.svg$/,
        use: 'react-svg-loader'
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    fallback: {
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer/'),
      fs: false
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }),
    new CamundaModelerWebpackPlugin()
  ]
}
