import { SearchAction, SearchInitState } from '@/types/store'
import { getLocalHistories } from '@/utils/tokenSeting'

const initValue: SearchInitState = {
  suggestion: [],
  historyList: getLocalHistories(),
}
export default function search(
  prevState = initValue,
  action: SearchAction
): SearchInitState {
  switch (action.type) {
    case 'search/getSuggestionList':
      return {
        ...prevState,
        suggestion: action.payload,
      }
    case 'search/saveSearchHistory':
      return {
        ...prevState,
        historyList: action.payload,
      }
    default:
      return prevState
  }
}
