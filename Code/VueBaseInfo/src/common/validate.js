
// 手机号验证
export function isvalidPhone (str) {
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
  return reg.test(str)
}
// 邮箱验证
export function isvalidEmail (str) {
  const reg = /^\w+((-\w+)|(\.\w+))*\\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  return reg.test(str)
}
