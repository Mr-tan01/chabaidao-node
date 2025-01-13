module.exports = app => {
  const { validator } = app
  // 验证手机号
  validator.addRule('adminPhone', (rule,value) => {
    if(!/^1\d{10}$/.test(value.trim())){
      return rule.tips
    }
  })
}