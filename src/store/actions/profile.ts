import { User, UserProfile } from '@/types/data'
import { ApiResponse, RootThunkAction } from '@/types/store'
import request from '@/utils/requst'

export const getProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<User>>('/user')
    // console.log(res)
    dispatch({
      type: 'profile/getProfile',
      payload: res.data.data,
    })
  }
}
export const getUserProfile = (): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<UserProfile>>('/user/profile')
    dispatch({
      type: 'profile/getUserProfile',
      payload: res.data.data,
    })
  }
}

export const updateUserProfile = (
  key: string,
  value: string
): RootThunkAction => {
  return async (dispatch) => {
    await request.patch('/user/profile', {
      [key]: value,
    })
    await dispatch(getUserProfile())
  }
}
