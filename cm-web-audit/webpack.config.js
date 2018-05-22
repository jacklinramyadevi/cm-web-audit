var path=require('path');
var webpack=require('webpack');
var ExtractTextPlugin=require('extract-text-webpack-plugin');

module.exports={
    //入口
    entry:{
        main:'./src/main',
        vendors:['vue','vue-router']
    },
    //输出
    output:{
        path:path.join(_dirname,'./dist'),
        filename:'[name].js',
        chunkFilename:'[name].chunk.js',
        publicPath:'/dist/'
    },
    externals:{
        'BMap':'BMap'
    },
    //加载器
    module:{
        loaders:[
            {test:/\.vue$/,loader:'vue'},
            {test:/\.js$/,loader:'babel',exclude:/node_modules/},
            {test:/\.css$/,loader:'style!css!autoprefixer'},
            {test:/\.scss$/,loader:'style!css!sass?sourceMap'},
            {test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=10000'},
            {test:/\.(html|tpl)$/,loader:'html-loader'}
        ]
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract(
                "style-loader",
                "css-loader?sourceMap",
                {
                    publicPath: '../dist/'
                }
            )
        }
    },
    //转es5
    babel:{
        presets:['es2015'],
        plugins:['transform-runtime']
    },
    resolve:{
        //require时省略的扩展名，如：require('module')不需要module.js
        extensions:['','.js','.vue'],
        //别名，可以直接使用别名来代表设定的路径以及其他
        alias:{
            filter:path.join(_dirname,'./src/filters'),
            components:path.join(_dirname,'./src/components')
        }
    },
    plugins:{
        new ExtractTextPlugin("[name].css",{allChunks:true,resolve:['modules']}),
        new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js')
    }

















}