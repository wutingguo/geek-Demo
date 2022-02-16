import { getUserProfile } from '@/store/actions/profile'
import { useInitState } from '@/utils/hooks'
import { Button, List, DatePicker, NavBar, Popup } from 'antd-mobile'
import classNames from 'classnames'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import EditInput from './EditInput'

import styles from './index.module.scss'

const Item = List.Item

type InputState = {
  visible: boolean
  type: '' | 'name' | 'intro'
}
const ProfileEdit = () => {
  const history = useHistory()
  const { userProfile } = useInitState(getUserProfile, 'profile')
  const [showInput, setShowInput] = useState<InputState>({
    visible: false,
    type: '',
  })
  const closeInput = () => {
    setShowInput({
      visible: false,
      type: '',
    })
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0',
          }}
          onBack={() => history.go(-1)}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img width={24} height={24} src={userProfile.photo} alt="" />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item
              arrow
              extra={userProfile.name}
              onClick={() =>
                setShowInput({
                  visible: true,
                  type: 'name',
                })
              }
            >
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {userProfile.intro ? userProfile.intro : '未填写'}
                </span>
              }
              onClick={() =>
                setShowInput({
                  visible: true,
                  type: 'intro',
                })
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={userProfile.gender === 0 ? '男' : '女'}>
              性别
            </Item>
            <Item arrow extra={userProfile.birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>
      <Popup visible={showInput.visible} position="right" destroyOnClose>
        <EditInput closeInput={closeInput} type={showInput.type}></EditInput>
      </Popup>
    </div>
  )
}

export default ProfileEdit
