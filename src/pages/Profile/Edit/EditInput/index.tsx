import { RootState } from '@/types/store'
import { Input, NavBar, TextArea } from 'antd-mobile'
import { InputRef } from 'antd-mobile/es/components/input'
import { TextAreaRef } from 'antd-mobile/es/components/text-area'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './index.module.scss'
type Props = {
  closeInput: () => void
  type: '' | 'name' | 'intro'
  updateProfile: (key: string, value: string) => void
}
const EditInput = ({ closeInput, type, updateProfile }: Props) => {
  const inputRef = useRef<InputRef>(null)
  const textRef = useRef<TextAreaRef>(null)
  const userProfile = useSelector(
    (state: RootState) => state.profile.userProfile
  )
  const [value, setValue] = useState(
    (type === 'name' ? userProfile.name : userProfile.intro) || ''
  )
  useEffect(() => {
    if (type === 'name') {
      inputRef.current?.focus()
    } else {
      textRef.current?.focus()
      document.querySelector('textarea')?.setSelectionRange(-1, -1)
    }
  }, [type])
  return (
    <div className={styles.root}>
      <NavBar
        onBack={() => closeInput()}
        className="navbar"
        right={
          <span
            className="commit-btn"
            onClick={() => updateProfile(type, value)}
          >
            提交
          </span>
        }
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
              ref={inputRef}
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
            ref={textRef}
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
