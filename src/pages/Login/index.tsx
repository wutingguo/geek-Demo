import React from 'react'
import { Button } from 'antd-mobile'
import Icon from '@/components/Icon'
import styles from './index.module.scss'

export default function Login() {
  return (
    <div className={styles.root}>
      Login
      {/* <svg className="icon">
        <use xlinkHref="#iconicon_upload"></use>
      </svg>
      <svg className="icon">
        <use xlinkHref="#iconphoto"></use>
      </svg> */}
      <Icon type="iconphoto" className="icon1"></Icon>
      <Icon type="iconicon_upload"></Icon>
      <Button color="primary">登录按钮</Button>
    </div>
  )
}
