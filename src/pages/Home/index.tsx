import Icon from '@/components/Icon'
import {
  changeActive,
  getAllChannels,
  getUserChannels,
} from '@/store/actions/home'
import { useInitState } from '@/utils/hooks'
import { Tabs, Popup } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Channels from './component/Channels'
import ArticleList from './component/ArticleList'

import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const { userChannels, active } = useInitState(getUserChannels, 'home')
  useInitState(getAllChannels, 'home')
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const show = () => {
    setVisible(true)
  }
  const hide = () => {
    setVisible(false)
  }
  return (
    <div className={styles.root}>
      {/* ้ข้ Tabs ๅ่กจ */}
      {userChannels.length > 0 && (
        <Tabs
          className="tabs"
          activeKey={active + ''}
          onChange={(key) => dispatch(changeActive(+key))}
        >
          {userChannels.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              <ArticleList artID={item.id}></ArticleList>
            </Tabs.Tab>
          ))}
        </Tabs>
      )}

      <div className="tabs-opration">
        <Icon type="iconbtn_search" onClick={() => history.push('/search')} />
        <Icon type="iconbtn_channel" onClick={show} />
      </div>
      <Popup visible={visible} position="left">
        <Channels hide={hide}></Channels>
      </Popup>
    </div>
  )
}

export default Home
