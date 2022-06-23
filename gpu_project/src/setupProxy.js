const proxy = require('http-proxy-middleware')

module.exports = function(app){
  app.use(
    proxy.createProxyMiddleware('/api1',{
      target:'http://10.0.76.190/gpufz',
      changeOrigin: true,
      pathRewrite: {
        '^/api1':''
      }
    })
  )
}