import { LoginType } from '@/types/data'
import { ApiResponse, LoginAction, RootThunkAction, Token } from '@/types/store'
import request from '@/utils/requst'
import { removeToken, setToken } from '@/utils/tokenSeting'

// 退出登录,清除token

export const logOut = (): LoginAction => {
  removeToken()

  return {
    type: 'login/logOut',
  }
}

export const seveToken = (token: Token): LoginAction => {
  setToken(token)
  return {
    type: 'login/seveToken',
    payload: token,
  }
}

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
