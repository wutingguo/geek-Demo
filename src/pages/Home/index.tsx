import Icon from '@/components/Icon'
import { getAllChannels, getUserChannels } from '@/store/actions/home'
import { useInitState } from '@/utils/hooks'
import { Tabs, Popup } from 'antd-mobile'
import { useState } from 'react'
import Channels from './component/Channels'

import styles from './index.module.scss'

const Home = () => {
  const { userChannels } = useInitState(getUserChannels, 'home')
  useInitState(getAllChannels, 'home')
  const [visible, setVisible] = useState(false)
  const show = () => {
    setVisible(true)
  }
  const hide = () => {
    setVisible(false)
  }
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {userChannels.length > 0 && (
        <Tabs className="tabs">
          {userChannels.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              内容{item.id}---{item.name}
            </Tabs.Tab>
          ))}
        </Tabs>
      )}

      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" onClick={show} />
      </div>
      <Popup visible={visible} position="left">
        <Channels hide={hide}></Channels>
      </Popup>
    </div>
  )
}

export default Home
