import { getArticle, getRefreshArticle } from '@/store/actions/home'
import { RootState } from '@/types/store'
import { useDispatch, useSelector } from 'react-redux'
import ArticleItem from '../ArticleItem'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
type Props = {
  artID: number
}
const ArticleList = ({ artID }: Props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { channelArticles } = useSelector((state: RootState) => state.home)
  const { results = [], pre_timestamp } = channelArticles[artID] || {}
  const hasMore = pre_timestamp === null ? false : true
  const loadMore = async () => {
    await dispatch(getArticle(artID, pre_timestamp || +new Date() + ''))
  }
  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <PullToRefresh
        onRefresh={async () => {
          await dispatch(getRefreshArticle(artID, +new Date() + ''))
        }}
      >
        {results.map((item) => (
          <div
            className="article-item"
            key={item.art_id}
            onClick={() => history.push(`/article/${item.art_id}`)}
          >
            <ArticleItem article={item} />
          </div>
        ))}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  )
}

export default ArticleList
