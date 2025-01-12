/** @type Egg.EggPlugin */
module.exports = {
  // 定义一个名为mongoose的配置对象
  mongoose : {
    // 启用mongoose插件，值为true表示启用
    enable: true,
    // 指定使用的mongoose插件包名为'egg-mongoose'
    package: 'egg-mongoose'
  }
};
