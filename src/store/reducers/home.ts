import { HomeAction, HomeStateType } from '@/types/store'

const initValue: HomeStateType = {
  userChannels: [],
  allChannels: [],
  active: 0,
  channelArticles: {},
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
    case 'home/changeActive':
      return {
        ...prevState,
        active: action.payload,
      }
    case 'home/getArticle':
      return {
        ...prevState,
        channelArticles: {
          ...prevState.channelArticles,
          [action.payload.artID]: {
            pre_timestamp: action.payload.pre_timestamp,
            results: [
              ...(prevState.channelArticles[action.payload.artID]?.results ||
                []),
              ...action.payload.results,
            ],
          },
        },
      }
    case 'home/RefreshArticle':
      return {
        ...prevState,
        channelArticles: {
          ...prevState.channelArticles,
          [action.payload.artID]: {
            pre_timestamp: action.payload.pre_timestamp,
            results: [...action.payload.results],
          },
        },
      }
    default:
      return prevState
  }
}

export default home
