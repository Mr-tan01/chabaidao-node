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
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
