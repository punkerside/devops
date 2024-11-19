const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => ({
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: env.production ? './.env.production' : './.env',
        }),
    ],
    devServer: {
        static: './dist',
        port: 8080,
    },
    mode: env.production ? 'production' : 'development',
});
