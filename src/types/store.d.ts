import store from '@/store'
import { ThunkAction } from 'redux-thunk'

// -----------------------login模块-----------------
export type Token = {
  token: string
  refresh_token: string
}
export type LoginToken = Token
export type LoginAction = {
  type: 'login/getToken'
  payload: Token
}
// ----------------------根类型----------------------
export type RootState = ReturnType<typeof store.getState>
export type ApiResponse<T> = {
  message: string
  data: T
}
export type RootAction = LoginAction
export type RootThunkAction = ThunkAction<void, RootState, any, RootAction>
