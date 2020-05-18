const koa = require('koa')
const path = require('path')
const app = new koa()
const helmet = require('koa-helmet')
const statics = require('koa-static')

const router = require('./routes/routes')
app.use(helmet())
app.use(statics(path.join (__dirname, '../public'))) // statics 里面需要传递一个路径, 得去引用nodejs的path模块
app.use(router())

app.listen(3000)