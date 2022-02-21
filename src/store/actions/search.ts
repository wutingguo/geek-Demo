import { Suggestion } from '@/types/data'
import { ApiResponse, RootThunkAction } from '@/types/store'
import request from '@/utils/requst'
import { setLocalHistories } from '@/utils/tokenSeting'

export const getSuggestionList = (key: string): RootThunkAction => {
  return async (dispatch) => {
    const res = await request.get<ApiResponse<{ options: string[] }>>(
      '/suggestion',
      {
        params: {
          q: key,
        },
      }
    )
    // console.log(res.data.data.options)
    let list: Suggestion
    list = res.data.data.options[0] === null ? [] : res.data.data.options
    dispatch({
      type: 'search/getSuggestionList',
      payload: list,
    })
  }
}

export const saveSearchHistory = (key: string): RootThunkAction => {
  return (dispatch, useState) => {
    let histories = useState().search.historyList
    histories = histories.filter((item) => item !== key)
    if (histories.length >= 10) {
      histories.pop()
    }
    histories = [key, ...histories]
    setLocalHistories(histories)
    dispatch({
      type: 'search/saveSearchHistory',
      payload: histories,
    })
  }
}
