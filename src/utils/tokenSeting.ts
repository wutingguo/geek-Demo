import { Token } from '@/types/store'

// 封装的token持久化等api模块
const TOKEN_KEY = 'geek_91_token'
// 获取token
export const getToken = (): Token => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
}
// 存储token
export const setToken = (token: Token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}
/**
 * 删除token
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 判断是否有token
 * @returns
 */
export function hasToken(): boolean {
  return !!getToken().token
}
