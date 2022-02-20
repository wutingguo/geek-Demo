import { Channels } from '@/types/data'
import { Token } from '@/types/store'

// 封装的token持久化等api模块
const TOKEN_KEY = 'geek_91_token'
const LOCAL_CHANNEL_KEY = 'geek_91_lacal_channels'
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

// 获取本地的channels数据
export function getLocalChannel(): Channels[] {
  return JSON.parse(localStorage.getItem(LOCAL_CHANNEL_KEY) || '[]')
}
// 储存本地channel
export function saveLocalChannel(channles: Channels[]) {
  localStorage.setItem(LOCAL_CHANNEL_KEY, JSON.stringify(channles))
}
