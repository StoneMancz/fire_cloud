const webpack=require('webpack');
module.exports = {
    publicPath: './',
    configureWebpack: {
        devServer: {
            port: 8089,
            open: true,
            disableHostCheck:true
        },
        plugins: []
    }
}