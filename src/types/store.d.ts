import store from '@/store'
import { ThunkAction } from 'redux-thunk'
import { User, UserProfile } from './data'
// ----------------------根类型----------------------
export type RootState = ReturnType<typeof store.getState>
export type ApiResponse<T> = {
  message: string
  data: T
}
export type RootAction = LoginAction | ProfileAction
export type RootThunkAction = ThunkAction<void, RootState, any, RootAction>

// -----------------------login模块-----------------
export type Token = {
  token: string
  refresh_token: string
}
export type LoginToken = Token
export type LoginAction =
  | {
      type: 'login/getToken'
      payload: Token
    }
  | {
      type: 'login/logOut'
    }
// --------------------profile模块------------------
export type ProfileState = {
  user: User
  userProfile: UserProfile
}
export type ProfileAction =
  | {
      type: 'profile/getProfile'
      payload: User
    }
  | {
      type: 'profile/getUserProfile'
      payload: UserProfile
    }
