import store from '@/store'
import { ThunkAction } from 'redux-thunk'
import {
  Channels,
  User,
  UserProfile,
  Article,
  Suggestion,
  HistoryType,
} from './data'
// ----------------------根类型----------------------
export type RootState = ReturnType<typeof store.getState>
export type ApiResponse<T> = {
  message: string
  data: T
}
export type RootAction = LoginAction | ProfileAction | HomeAction | SearchAction
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
  | {
      type: 'login/seveToken'
      payload: Token
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
// -------------------home模块-----------------
export type HomeAction =
  | {
      type: 'home/getUserChannels'
      payload: Channels[]
    }
  | {
      type: 'home/getAllChannels'
      payload: Channels[]
    }
  | {
      type: 'home/changeActive'
      payload: number
    }
  | {
      type: 'home/getArticle'
      payload: {
        artID: number
        pre_timestamp: string
        results: Article[]
      }
    }
  | {
      type: 'home/RefreshArticle'
      payload: {
        artID: number
        pre_timestamp: string
        results: Article[]
      }
    }
export type HomeStateType = {
  userChannels: Channels[]
  allChannels: Channels[]
  active: number
  channelArticles: {
    [key: number]: {
      pre_timestamp: string
      results: Article[]
    }
  }
}

// -----------------search模块
export type SearchInitState = {
  suggestion: Suggestion
  historyList: HistoryType
}
export type SearchAction =
  | {
      type: 'search/getSuggestionList'
      payload: Suggestion
    }
  | {
      type: 'search/saveSearchHistory'
      payload: HistoryType
    }
