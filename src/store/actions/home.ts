import { RootThunkAction } from '@/types/store'
import request from '@/utils/requst'

export const getUserChannels = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get('/user/channels')
    console.log(res)
    dispatch({
      type: 'home/getUserChannels',
      payload: res.data.data.channels,
    })
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
