import { ProfileAction, ProfileState } from '@/types/store'

const initValue: ProfileState = {
  user: {},
  userProfile: {},
} as ProfileState
export default function profile(prevState = initValue, action: ProfileAction) {
  switch (action.type) {
    case 'profile/getProfile':
      return {
        ...prevState,
        user: action.payload,
      }
    case 'profile/getUserProfile':
      return {
        ...prevState,
        userProfile: action.payload,
      }
    default:
      return prevState
  }
}
