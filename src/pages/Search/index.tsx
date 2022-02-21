import classnames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSuggestionList, saveSearchHistory } from '@/store/actions/search'
import { useDebounceFn } from 'ahooks'
import { RootState } from '@/types/store'

const SearchPage = () => {
  const history = useHistory()
  const [key, setKey] = useState('')
  const [isSearching, setSearching] = useState(false)
  // const timer = useRef(-1)
  const dispatch = useDispatch()
  const { suggestion, historyList } = useSelector(
    (state: RootState) => state.search
  )
  const { run: getSuggest } = useDebounceFn(
    (val) => {
      if (!val) return
      dispatch(getSuggestionList(key))
    },
    { wait: 350 }
  )
  const handleActive = (str: string) => {
    // reg代表正则表达式
    const reg = new RegExp(key, 'gi')
    return str.replace(reg, (match) => `<span>${match}</span>`)
  }
  const handleSearch = (val: string) => {
    console.log(val, '发送请求')
    dispatch(saveSearchHistory(val))
  }
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          <span className="search-text" onClick={() => handleSearch(key)}>
            搜索
          </span>
        }
      >
        <SearchBar
          placeholder="请输入关键字搜索"
          value={key}
          onChange={(val) => {
            if (val) {
              setSearching(true)
            } else {
              setSearching(false)
            }
            setKey(val)
            // 防抖---延迟执行
            getSuggest(val)
            // window.clearTimeout(timer.current)
            // timer.current = window.setTimeout(() => {
            //   if (!key) return
            //   dispatch(getSuggestionList(key))
            // }, 300)
          }}
        />
      </NavBar>

      {true && (
        <div
          className="history"
          style={{
            display: isSearching ? 'none' : 'block',
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            {historyList.map((item, index) => (
              <span
                className="history-item"
                onClick={() => handleSearch(item)}
                key={index}
              >
                <span className="text-overflow">{item}</span>
                <Icon type="iconbtn_essay_close" />
              </span>
            ))}
          </div>
        </div>
      )}

      <div className={classnames('search-result', isSearching ? 'show' : '')}>
        {suggestion.map((item, index) => (
          <div className="result-item" key={index}>
            <Icon className="icon-search" type="iconbtn_search" />
            <div
              className="result-value text-overflow"
              dangerouslySetInnerHTML={{
                __html: handleActive(item),
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
