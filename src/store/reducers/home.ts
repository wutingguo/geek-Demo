import { HomeAction, HomeStateType } from '@/types/store'

const initValue: HomeStateType = {
  userChannels: [],
  allChannels: [],
}
function home(prevState = initValue, action: HomeAction): HomeStateType {
  switch (action.type) {
    case 'home/getUserChannels':
      return {
        ...prevState,
        userChannels: action.payload,
      }
    case 'home/getAllChannels':
      return {
        ...prevState,
        allChannels: action.payload,
      }
    default:
      return prevState
  }
}

export default home
