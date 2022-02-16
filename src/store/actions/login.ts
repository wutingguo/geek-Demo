import { LoginType } from '@/types/data'
import { ApiResponse, RootThunkAction, Token } from '@/types/store'
import request from '@/utils/requst'
import { setToken } from '@/utils/tokenSeting'

export const login = (value: LoginType): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.post<ApiResponse<Token>>('/authorizations', value)
    // console.log(res)
    setToken(res.data.data)
    dispatch({
      type: 'login/getToken',
      payload: res.data.data,
    })
  }
}
export const getMobileCode = (value: string): RootThunkAction => {
  return async (dispath) => {
    await request.get(`sms/codes/${value}`)
    // console.log(res)
  }
}
