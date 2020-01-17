const webpack=require('webpack');
module.exports = {
    configureWebpack: {
        devServer: {
            port: 8089,
            open: true,
            disableHostCheck:true
        },
        plugins: []
    }
}