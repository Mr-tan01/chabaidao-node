module.exports = app => {
  const { validator } = app
  // 验证手机号
  validator.addRule('adminPhone', (rule,value) => {
    if(!/^1\d{10}$/.test(value.trim())){
      return rule.tips
    }
  })
  // 验证密码
  validator.addRule('adminPassword', (rule,value) => {
    // 确保字符串以数字开头，并且只包含字母和数字，长度在6到10个字符之间
    if(!/^(?=.*\d)(?=.*[a-zA-Z0-9]).{6,10}$/.test(value.trim())){
      return rule.tips
    }
  })
  // 验证不能为空
  validator.addRule('nullValue', (rule,value) => {
    if(value.trim() === ''){
      return rule.tips
    }
  })
  // 验证数组
  validator.addRule('nullArray', (rule,value) => {
    if(!Array.isArray(value)){
      return '该字段必须是数组类型'
    }
    if(value.length <= 0){
      return rule.tips
    }
    if(value[0] === '' || value[1] === ''){
      return rule.tips
    }
  })
}