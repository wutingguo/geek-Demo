// 封装axios
import store from '@/store'
import { logOut, seveToken } from '@/store/actions/login'
import { Toast } from 'antd-mobile'
import axios, { AxiosError } from 'axios'
import history from './history'
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
  async function (error: AxiosError<{ message: string }>) {
    // 对响应错误做点什么
    if (!error.response) {
      Toast.show('服务器响应错误')
      return Promise.reject(error)
    }
    if (error.response.status === 401) {
      const token = getToken()
      if (token.token) {
        try {
          const res = await axios({
            method: 'PUT',
            url: 'http://geek.itheima.net/v1_0/authorizations',
            headers: {
              Authorization: 'Bearer ' + token.refresh_token,
            },
          })
          console.log(res)
          store.dispatch(
            seveToken({
              token: res.data.data.token,
              refresh_token: token.refresh_token,
            })
          )
          return request(error.config)
        } catch {
          // 这里是备用token也过期了,上面尝试获取新token没有获取到,所以现在需要强制跳转到登录页
          store.dispatch(logOut())
          history.replace({
            pathname: '/login',
            state: {
              // 跳转时, 携带上当前页的地址
              from: history.location.pathname,
            },
          })
          Toast.show('登录信息失效')
          return Promise.reject(error)
        }
      } else {
        // 没有token直接让其强制跳转到登录页
        history.replace({
          pathname: '/login',
          state: {
            // 跳转时, 携带上当前页的地址
            from: history.location.pathname,
          },
        })
        Toast.show('当前状态未登录, 请重新登录')
        return Promise.reject(error)
      }
    }
    Toast.show(error.response.data.message)
    return Promise.reject(error)
  }
)

export default request
