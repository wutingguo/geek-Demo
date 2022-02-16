import { RootState } from '@/types/store'
import { Input, NavBar, TextArea } from 'antd-mobile'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './index.module.scss'
type Props = {
  closeInput: () => void
  type: '' | 'name' | 'intro'
}
const EditInput = ({ closeInput, type }: Props) => {
  const userProfile = useSelector(
    (state: RootState) => state.profile.userProfile
  )
  const [value, setValue] = useState(
    type === 'name' ? userProfile.name : userProfile.intro
  )
  return (
    <div className={styles.root}>
      <NavBar
        onBack={() => closeInput()}
        className="navbar"
        right={<span className="commit-btn">提交</span>}
      >
        {type === 'name' ? '编辑昵称' : '编辑简介'}
      </NavBar>

      <div className="edit-input-content">
        <h3>昵称</h3>

        {type === 'name' ? (
          <div className="input-wrap">
            <Input
              placeholder="请输入"
              value={value}
              onChange={(value) => setValue(value)}
            />
          </div>
        ) : (
          <TextArea
            className="textarea"
            placeholder="请输入简介"
            showCount
            maxLength={99}
            value={value}
            onChange={(value) => setValue(value)}
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
