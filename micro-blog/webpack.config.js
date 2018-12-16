const path = require('path');

module.exports = {
    entry: {
        app: ['@babel/polyfill','./src/js/app.js'],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "app.compiled.js",
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules|bower_components/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env'],
                },
            },
        ],
    },
}