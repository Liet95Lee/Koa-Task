const path = require('path')
const nodeExternals = require('webpack-node-externals')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

// 书写webpack的配置
const webpackconfig = {
    target: 'node',
    mode: 'development', // "production" | "development" | "none"  
    // Chosen mode tells webpack to use its built-in optimizations accordingly.

    // 单个入口（简写）语法
    entry: {
        server: path.join(__dirname, 'src/index.js')
    },
    // string | object | array  // 默认为 './src'
    // 这里应用程序开始执行
    // webpack 开始打包

    // 指定一个输出配置
    output: { // webpack 如何输出结果的相关选项
        filename: '[name].bundle.js',// string
        // 「入口分块(entry chunk)」的文件名模板

        // 输出路径设置到 dist
        path: path.join(__dirname, './dist')// string
        // 所有输出文件的目标路径
        // 必须是绝对路径（使用 Node.js 的 path 模块）
    },
    devtool: 'eval-source-map',
    // 配置module
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            // 写一个正则来匹配 目录下面的js
            use: {
                loader: 'babel-loader'
            },
            // 使用到 loader (babel-loader)
            exclude: [path.join(__dirname, '/node_modules')]
            // 需要排除在外 node_modules
        }]
    },
    externals: [nodeExternals()],
    // 排除一些不会使用到的模块
    plugins: [
        new CleanWebpackPlugin()
    ],
    // 每次成功重建后这个 (CleanWebpackPlugin) 插件将删除 webpack 的 output.path 目录中的所有文件，以及所有未使用的 webpack assets
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true,
        path: true
    }
}

module.exports = webpackconfig

// 之后新建文件 .babelrc 为了加入babel-loader的配置 