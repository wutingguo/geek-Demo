import { LoginAction, LoginToken } from '@/types/store'
import { getToken } from '@/utils/tokenSeting'

const initialState: LoginToken = getToken() || {
  token: '',
  refresh_token: '',
}

const login = (prevState = initialState, action: LoginAction) => {
  switch (action.type) {
    case 'login/getToken':
      return action.payload

    case 'login/logOut':
      return {
        token: '',
        refresh_token: '',
      }
    default:
      return prevState
  }
}

export default login
