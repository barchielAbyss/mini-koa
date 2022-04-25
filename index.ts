import Application  from './src/application'

const app = new Application()

console.info(app)

app.use(async (cxt) => {
  // cxt.body = 'hello world'

  console.log('req -->', cxt.req.url)
  console.log('request ---->', cxt.request.path)
  console.log('cxt body ---->', cxt.body)

  cxt.body = 'hello world'
  cxt.body = 'hello world2'
  cxt.body = 'hello world3'
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('<p style="color: red">hello world4</p>')
    }, 3000)
  })

  console.log(data)

  cxt.body = data

})

app.listen(2100, () => {
  console.log('开始执行了 2100')
})
