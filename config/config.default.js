/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1736480124874_8195';

  // add your middleware config here
  config.middleware = [];

  // 连接数据库
  config.mongoose = {
    url: 'mongodb://127.0.0.1/chabaidao'
  }
  // 安全威胁csrf的防范
  config.security = {
    csrf: {
      enable: false,
    },
  }
  // 配置校验
  config.validate = {
      // 设置convert属性为true，表示在验证过程中将输入数据转换为相应的类型
      convert: true,
      // 如果启用，将验证整个数据结构，而不仅仅是单个字段
      // validateRoot: false,
  }
  // 异常处理
  config.onerror = {
    accepts() {
      // 所有非500的错误，都返回json格式
      return 'json'
    },
    json(err, ctx) {
      // 如果是自定义的异常，则返回自定义的异常信息
      // console.log(err)
      // errors: [ { message: 'required', field: 'phone', code: 'missing_field' } ]
      if (err.status === 422) {
        // 判断参数名是否缺少
        if (err.errors[0].message == 'required') {
          ctx.body = {
            msg:'缺少必要参数',
            field: err.errors[0].field
          }
          // 把状态码改为400
          ctx.status = 400
        }else {
          // 判断参数值是否缺少
          ctx.body = {
            msg: err.errors[0].message,
            field: err.errors[0].field
          }
          ctx.status = 422
        }
      }else {
        ctx.body = {
          msg: err.message,
          // 使用展开运算符(...)来有条件地包含errors属性
          // 如果err对象中存在errors属性，则将其包含在新的对象中
          // 如果err对象中不存在errors属性，则不会包含errors属性
          ...(err.errors && { errors: err.errors })
        }
        ctx.status = 500
      }
    }
  }
  // 配置jwt
  config.jwt = {
    // 密钥
    secret: 'chabaidao',
    // 过期时间3天 (单位：秒)
    expiresIn: 60 * 60 * 24 * 3
  }
  // 跨域
  config.cors = {
    // 允许的源
    origin: '*',
    // 允许的请求方法
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  //文件上传
  config.multipart = {
    // 模式为文件形式
    mode: 'file',
    // 设置文件大小限制为1MB
    fileSize: '1mb',
  }
  // 阿里云对象存储oss
  config.oss = {
    accessKeyId:'LTAI5t6eYAYyaKjxjsCS6izw',
    accessKeySecret:'hEjmzGpMr4ATHWeIWrga93oFzD3HTY',
    // 存储桶名称
    bucket:'personal-project',
    // 存储桶区域
    region:'oss-cn-shenzhen',
    // 文件夹名称
    folder:'chabaidao/'
  }
  // 腾讯地图key
  config.wxkey = {
    key: 'U3RBZ-XKFK3-OSU3P-O4KEI-PQP62-BUBBZ'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
