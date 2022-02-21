import { HomeAction, RootThunkAction } from '@/types/store'
import request from '@/utils/requst'
import {
  getLocalChannel,
  getToken,
  hasToken,
  saveLocalChannel,
} from '@/utils/tokenSeting'
const token = getToken().token
export const getUserChannels = (): RootThunkAction => {
  return async (dispatch) => {
    if (token) {
      const res = await request.get('/user/channels')
      dispatch({
        type: 'home/getUserChannels',
        payload: res.data.data.channels,
      })
    } else {
      const channels = getLocalChannel()
      if (channels.length > 0) {
        dispatch({
          type: 'home/getUserChannels',
          payload: channels,
        })
      } else {
        const res = await request.get('/user/channels')
        dispatch({
          type: 'home/getUserChannels',
          payload: res.data.data.channels,
        })
        saveLocalChannel(res.data.data.channels)
      }
    }
  }
}
export const getAllChannels = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get('/channels')
    dispatch({
      type: 'home/getAllChannels',
      payload: res.data.data.channels,
    })
  }
}
// 更改高亮的action
export const changeActive = (active: number): HomeAction => {
  return {
    type: 'home/changeActive',
    payload: active,
  }
}
// 删除channels
export const delChannel = (id: number): RootThunkAction => {
  return async (dispatch, getState) => {
    const { userChannels } = getState().home
    if (hasToken()) {
      await request.delete('/user/channels', {
        data: {
          channels: [id],
        },
      })
    } else {
      saveLocalChannel(userChannels.filter((item) => item.id !== id))
    }
    dispatch(getUserChannels())
  }
}
// 获取文章列表/累加储存
export const getArticle = (
  channel_id: number,
  timestamp: string
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get('/articles', {
      params: {
        channel_id,
        timestamp,
      },
    })
    dispatch({
      type: 'home/getArticle',
      payload: {
        artID: channel_id,
        pre_timestamp: res.data.data.pre_timestamp,
        results: res.data.data.results,
      },
    })
  }
}
//获取文章列表/下拉刷新
export const getRefreshArticle = (
  channel_id: number,
  timestamp: string
): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get('/articles', {
      params: {
        channel_id,
        timestamp,
      },
    })
    dispatch({
      type: 'home/RefreshArticle',
      payload: {
        artID: channel_id,
        pre_timestamp: res.data.data.pre_timestamp,
        results: res.data.data.results,
      },
    })
  }
}
