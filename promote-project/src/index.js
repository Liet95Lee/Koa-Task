// const koa = require('koa')
// const path = require('path')
// const helmet = require('koa-helmet')
// const statics = require('koa-static')
// const router = require('./routes/routes')
// 上面皆是ES5语法


// ES6 语法, 使用import 
import koa from 'koa'
import path from 'path'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routes/routes'
import koaBody from 'koa-body'
import jsonutil from 'koa-json'
import cors from '@koa/cors'
import compose from 'koa-compose'

const app = new koa()

// app.use(helmet())
// app.use(statics(path.join (__dirname, '../public'))) // statics 里面需要传递一个路径, 得去引用nodejs的path模块
// app.use(router())

// 一次次引用app.use不是特别方便 (推荐一个依赖包 koa-compose 可以帮我们把所有的中间件做一个整合)
/*
*  使用koa-compose集成中间件
*/ 
const middleware = compose([
    koaBody(),
    statics(path.join (__dirname, '../public')),
    helmet(),
    cors(),
    jsonutil({pretty: false, param: 'pretty'})
])

app.use(middleware)
app.use(router())

app.listen(3000)