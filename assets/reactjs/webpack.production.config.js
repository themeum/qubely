'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        'blocks.build.min': path.join( __dirname, 'src/index.js')
    },
    output: {
        path: path.join( __dirname, '../js'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: { loader: 'babel-loader' }
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ],
            }
        ]
    }
};