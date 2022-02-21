import { Channels, HistoryType } from '@/types/data'
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
// 搜索关键字的本地缓存键名
const SEARCH_HIS_KEY = 'geek-h5-sh88-channel'

/**
 * 从缓存获取搜索历史关键字
 */
export const getLocalHistories = (): HistoryType => {
  return JSON.parse(localStorage.getItem(SEARCH_HIS_KEY) || '[]')
}

/**
 * 将搜索历史关键字存入本地缓存
 * @param {Array} histories
 */
export const setLocalHistories = (histories: HistoryType): void => {
  localStorage.setItem(SEARCH_HIS_KEY, JSON.stringify(histories))
}

/**
 * 删除本地缓存中的搜索历史关键字
 */
export const removeLocalHistories = () => {
  localStorage.removeItem(SEARCH_HIS_KEY)
}
