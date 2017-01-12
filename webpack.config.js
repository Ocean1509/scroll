const path = require('path');
const webpack = require('webpack');

module.exports={
    entry:'./app.js',
    output:{
        path:path.join(__dirname,'/dist'),        
        filename:"bundle.js",
        publicPath:'/dist/'
    },
    module:{
        loaders:[
            {
                test:/\.vue$/,
                loader:'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {compact: false},
            },
            {
                test:   /\.css$/,
                exclude: /node_modules/,
                loader: 'css-loader',
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            }
        ]
    }
}