// 引入Node.js的path模块，用于处理和转换文件路径
const path = require('path')

module.exports = app => {
  // 启动项目就对校验进行加载
  const dire = path.join(app.config.baseDir, 'app/validate')
  // 使用 app.loader 对象的 loadToApp 方法将 'validate' 模块加载到应用程序中
  // 参数 dire，用于指定 'validate' 模块的来源
  app.loader.loadToApp(dire,'validate')
}