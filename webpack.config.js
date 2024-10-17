const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development", // Change to 'production' for production build
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/", // Ensure correct routing
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 8081,
    historyApiFallback: true, // Ensure correct routing for SPA
  },
  watchOptions: {
    poll: 1000, // Check for changes every second
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // Injects styles into DOM
          "css-loader", // Turns CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          globOptions: {
            ignore: ["**/index.html"], // Ignore index.html to avoid conflict
          },
        },
      ],
    }),
  ],
};
