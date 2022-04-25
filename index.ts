import Application  from './src/application'

const app = new Application()

console.info(app)

app.use((cxt) => {
  // cxt.body = 'hello world'

  console.log('req -->', cxt.req.url)
  console.log('request ---->', cxt.request.path)
  console.log('cxt body ---->', cxt.body)

  cxt.body = 'hello world'
  cxt.body = 'hello world2'
  cxt.body = 'hello world3'
  cxt.body = '<p style="color: red">hello world4</p>'

})

app.listen(2100, () => {
  console.log('开始执行了 2100')
})
