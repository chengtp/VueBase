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

export const requestLogin = params => { return service.post('users/login', params).then(res => res.data) }

export const getUserList = params => { return service.get('Users/GetUserModel', { params: params }) }

export const GetMenuModels = params => { return service.get('menu/GetMenuModels', { params: params }) }
