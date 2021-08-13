const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, "bundled"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    'file-loader'
                ]
            }
        ]
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/icon',
                    to: 'icon'
                },
                {
                    from: 'src/img',
                    to: 'img'
                },
                {
                    from: 'src/pages',
                    to: 'src/pages'
                },
                // {
                //     from: 'src/sw.js',
                //     to: 'workbox-sw.js'
                // },
                {
                    from: 'src/manifest.json',
                    to: 'manifest.json'
                },
                {
                    from: 'push.js',
                    to: 'push.js'
                }
            ]
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: "index.html"
        }),

        new HtmlWebpackPlugin({
            template: 'src/competitions-detail.html',
            filename: "competitions-detail.html",
        }),

        new HtmlWebpackPlugin({
            template: 'src/team-list.html',
            filename: "team-list.html",
        }),
        
        new HtmlWebpackPlugin({
            template: 'src/standings.html',
            filename: "standings.html",
        }),

        new WorkboxPlugin.InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'workbox-sw.js'
        })
    ]
}