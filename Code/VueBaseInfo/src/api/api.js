import axios from 'axios'

// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {
  if (sessionStorage.getItem('token')) {
    config.headers['Authorization'] = sessionStorage.getItem('token')
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// 用户登录接口
export const requestLogin = params => { return service.post('users/login', params).then(res => res.data) }
// 获取用户集合列表
export const getUserModels = params => { return service.get('Users/GetUserModels', { params: params }) }
// 获取 左边树形结构菜单集合数据
export const GetMenuModels = params => { return service.get('menu/GetMenuModels', { params: params }) }
// 获取 部门集合数据
export const GetDeptModels = params => { return service.get('Dept/GetDeptModels', { params: params }) }
// 获取 角色集合数据
export const GetRoleModels = params => { return service.get('Role/GetRoleModels', { params: params }) }
