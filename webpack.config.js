const path = require("path");

module.exports = {
  entry: "./src/index.js", // Adjust the entry point as needed
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // Match image files
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/", // Output directory for images
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // Injects styles into DOM
          {
            loader: "css-loader",
            options: {
              modules: true, // Enable CSS modules
            },
          },
          "sass-loader", // Compiles Sass to CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve both .js and .jsx extensions
  },
  mode: "development", // Change to 'production' for production builds
};
