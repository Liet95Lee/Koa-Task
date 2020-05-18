// const koa = require('koa')
// const path = require('path')
// const helmet = require('koa-helmet')
// const statics = require('koa-static')
// const router = require('./routes/routes')


// ES6 语法, 使用import 
import koa from 'koa'
import path from 'path'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routes/routes'

const app = new koa()

app.use(helmet())
app.use(statics(path.join (__dirname, '../public'))) // statics 里面需要传递一个路径, 得去引用nodejs的path模块
app.use(router())

app.listen(3000)