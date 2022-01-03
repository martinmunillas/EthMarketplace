import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}
const config: Configuration = {
  entry: "./src/frontend",
  output: {
    path: path.resolve(__dirname, "./build/frontend"),
    filename: "bundle.js",
    publicPath: "/",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  devServer: {
    historyApiFallback: true,
    open: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        NODE_ENV: "development",
      }),
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new NodePolyfillPlugin(),
  ],
  devtool: "source-map",
};

export default config;
