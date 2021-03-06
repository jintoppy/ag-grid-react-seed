const path = require('path');

const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: helpers.root('dist'),
        publicPath: '/dist',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=[path]/[name].[ext]'
            }
        ]
    },

    resolve: {
        alias: {
            "ag-grid-root" : "../node_modules/ag-grid"
        },
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'config/index.html'
        })

    ],

    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
    }
};