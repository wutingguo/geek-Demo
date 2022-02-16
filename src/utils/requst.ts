// 封装axios
import { Toast } from 'antd-mobile'
import axios, { AxiosError } from 'axios'
import { getToken } from './tokenSeting'
// import { createBrowserHistory } from 'history'

const request = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log(config, 879797)

    const token = getToken().token
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    } else {
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么

    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response
  },
  function (error: AxiosError<{ message: string }>) {
    // 对响应错误做点什么
    if (!error.response) {
      Toast.show('服务器响应错误')
      return Promise.reject(error)
    }
    Toast.show(error.response.data.message)
    return Promise.reject(error)
  }
)

export default request
