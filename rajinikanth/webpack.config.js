const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    historyApiFallback:{
      index: 'index.html'
    },    
    port: 3002,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    hot: true,
    //contentBase: path.join(__dirname, "public"),
    //publicPath: 'http://localhost:3002/scripts/',
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader',
              'css-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'list_user',
      filename: 'remoteEntry.js',
      exposes: {
        './ListUserReactComponent': './src/ListUserReactComponent',
      },
     shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
};
