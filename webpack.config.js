const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = () => {
    return {
        mode: 'none',
        entry: {
            app: path.join(__dirname, 'src', 'index.tsx'),
        },
        target: 'web',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/',
                },
                {
                    test: /\.scss$/i,
                    use: [
                        // dev
                        // 'style-loader',
                        // prod
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({}),
                                ],
                                sourceMap: true,
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(jpg|png|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'images/[sha512:hash:base64:7].[ext]',
                    },
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html'),
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                },
            }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].css',
                chunkFilename: '[id].css',
            })
        ],
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
    };
};
