const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const PUBLIC = path.resolve(__dirname, "public");
const DIST = path.resolve(__dirname, "dist");
const SRC = path.resolve(__dirname, "src");

module.exports = {
    context: SRC,
    entry: {
        index: ["./index.tsx"],
    },
    mode: "development",
    target: "web",
    devServer: {
        compress: true,
        hot: true,
        open: "../",
        port: 3000,
        static: path.resolve(__dirname, "public"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".jsx", ".js", ".css", ".scss", ".json"],
        modules: [SRC, "node_modules"],
    },
    output: {
        filename: "[name].js",
        path: DIST,
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: { sourceMap: true },
                    },
                ],
            },
            {
                test: /\.(gif|png|jpe?g)$/,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.svg$/,
                loader: "@svgr/webpack",
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Todo Users with Posts",
            description: "Todo Users with Posts",
            filename: "index.html",
            template: `${PUBLIC}/index.html`,
            env: "development",
        }),
    ],
};
