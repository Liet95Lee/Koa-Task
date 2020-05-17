const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const json = require('koa-json')

const app = new Koa()
const router = new Router()

router.prefix('/api')

router.get('/', ctx => {
    console.log(ctx);
    console.log(ctx.request);
    ctx.body = 'Hello World!!!'
})

router.get('/api', ctx => {
    // get params
    const params = ctx.request.query
    console.log(params);
    // name : 'imooc' age: '28'
    console.log(params.name, params.age)
    // console.log(ctx);
    // console.log(ctx.request);
    ctx.body = {
        name: params.name,
        age: params.age
    }
})

router.get('/async', async (ctx) => {
    let result = await new Promise((resolve) => {
        setTimeout(function () {
            resolve('Hello world 2s later!!')
        }, 2000)
    })
    ctx.body = result
})

router.post('/post', async (ctx) => {
    let {
        body
    } = ctx.request
    console.log(body);
    console.log(ctx.request);
    ctx.body = {
        ...body
    }
})

// [ Koa 1-6 作业 ]
router.post('/user', async (ctx) => {
    let params = ctx.request.query
    let result = {}

    // Header中无admin或者role不等于admin
    if (!ctx.request.header.role || ctx.request.header.role !== 'admin') {
        result = {
            code: 401,
            msg: 'unauthorized post'
        }
        ctx.response.status = 401
    }

    // 无name或者email
    else if (!params.name || !params.email) {
        result = {
            code: 404,
            msg: 'name或email不得为空'
        }
        ctx.response.status = 404
    } // 正常请求
    else {
        result = {
            code: 200,
            data: {
                name: params.name,
                email: params.email
            },
            msg: '上传成功'
        }
        ctx.response.status = 200
    }

    ctx.body = result
})

app.use(koaBody())
app.use(cors())
app.use(json({
    pretty: false,
    param: 'pretty'
}))

app.use(router.routes())
    .use(router.allowedMethods())

// app.use(async ctx => {
//     console.log(ctx);
//     // console.log(ctx.request);
//     ctx.body = 'Hello World'
// })

app.listen(3000)