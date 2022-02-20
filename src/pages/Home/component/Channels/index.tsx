import classnames from 'classnames'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/types/store'
import { changeActive, delChannel } from '@/store/actions/home'
import { useState } from 'react'
type Props = {
  hide: () => void
}
const Channels = ({ hide }: Props) => {
  const { userChannels, active } = useSelector((state: RootState) => state.home)
  const dispatch = useDispatch()
  const [isEdit, setEdit] = useState(false)

  return (
    <div className={styles.root}>
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={hide} />
      </div>
      <div className="channel-content">
        {/* 编辑时，添加类名 edit */}
        <div className={classnames('channel-item', isEdit ? 'edit' : '')}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">点击进入频道</span>
            <span
              className="channel-item-edit"
              onClick={() => setEdit(!isEdit)}
            >
              {isEdit ? '完成' : '编辑'}
            </span>
          </div>
          <div className="channel-list">
            {/* 选中时，添加类名 selected */}
            {userChannels.map((item) => (
              <span
                onClick={() => {
                  if (isEdit) return
                  dispatch(changeActive(item.id))
                  hide()
                }}
                className={classnames(
                  'channel-list-item',
                  item.id === active ? 'selected' : ''
                )}
                key={item.id}
              >
                {item.name}
                {item.id !== 0 && (
                  <Icon
                    type="iconbtn_tag_close"
                    onClick={() => dispatch(delChannel(item.id))}
                  />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            <span className="channel-list-item">+ HTML</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Channels
