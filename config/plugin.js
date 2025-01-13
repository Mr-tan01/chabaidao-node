/** @type Egg.EggPlugin */
module.exports = {
  // 定义一个名为mongoose的配置对象
  mongoose : {
    // 值为true表示启用
    enable: true,
    // 指定使用的mongoose插件包名为'egg-mongoose'
    package: 'egg-mongoose'
  },
  // 定义一个名为validate的配置对象
  validate : {
    enable: true,
    package: 'egg-validate'
  },
  // 定义一个名为onerror的配置对象
  onerror : {
    enable: true,
    package: 'egg-onerror'
  }
};
