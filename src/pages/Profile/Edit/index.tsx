import { getUserProfile, updateUserProfile } from '@/store/actions/profile'
import { useInitState } from '@/utils/hooks'
import {
  Button,
  List,
  DatePicker,
  NavBar,
  Popup,
  Toast,
  Dialog,
} from 'antd-mobile'
import classNames from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import EditInput from './EditInput'
import EditList from './EditList'
import dayjs from 'dayjs'

import styles from './index.module.scss'
import { logOut } from '@/store/actions/login'

const Item = List.Item

type InputState = {
  visible: boolean
  type: '' | 'name' | 'intro'
}
type ListState = {
  visible: boolean
  type: '' | 'photo' | 'gender'
}
const ProfileEdit = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { userProfile } = useInitState(getUserProfile, 'profile')
  const [showInput, setShowInput] = useState<InputState>({
    visible: false,
    type: '',
  })
  const [dateValue, setDateValue] = useState(false)
  const [showList, setShowList] = useState<ListState>({
    visible: false,
    type: '',
  })
  const closeInput = () => {
    setShowInput({
      visible: false,
      type: '',
    })
  }
  const updateProfile = async (key: string, value: string) => {
    await dispatch(updateUserProfile(key, value))
    Toast.show('修改成功')
    closeInput()
    setDateValue(false)
  }
  const closeList = () => {
    setShowList({
      visible: false,
      type: '',
    })
  }
  // 退出登录
  const outLogin = () => {
    Dialog.show({
      title: '温馨提示',
      content: '你确定要退出么!??',
      closeOnAction: true,
      actions: [
        [
          {
            key: 'yes',
            text: '确定',
            style: { color: 'red' },
            onClick: () => {
              // 清除token
              dispatch(logOut())
              // 提示
              Toast.show('退出成功')
              history.push('/login')
            },
          },
          { key: 'no', text: '取消', style: { color: 'blue' } },
        ],
      ],
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
              onClick={() =>
                setShowList({
                  type: 'photo',
                  visible: true,
                })
              }
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
            <Item
              arrow
              extra={userProfile.gender === 0 ? '男' : '女'}
              onClick={() =>
                setShowList({
                  type: 'gender',
                  visible: true,
                })
              }
            >
              性别
            </Item>
            <Item
              arrow
              extra={userProfile.birthday}
              onClick={() => setDateValue(true)}
            >
              生日
            </Item>
          </List>

          <DatePicker
            visible={dateValue}
            onCancel={() => setDateValue(false)}
            value={new Date(userProfile.birthday)}
            onConfirm={(value) =>
              updateProfile('birthday', dayjs(value).format('YYYY-MM-DD'))
            }
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn" onClick={outLogin}>
            退出登录
          </Button>
        </div>
      </div>
      {/* 编辑昵称和编辑昵称的弹窗 */}
      <Popup visible={showInput.visible} position="right" destroyOnClose>
        <EditInput
          closeInput={closeInput}
          type={showInput.type}
          updateProfile={updateProfile}
        ></EditInput>
      </Popup>
      <Popup
        visible={showList.visible}
        position="bottom"
        destroyOnClose
        onMaskClick={closeList}
      >
        <EditList closeList={closeList} type={showList.type}></EditList>
      </Popup>
    </div>
  )
}

export default ProfileEdit
