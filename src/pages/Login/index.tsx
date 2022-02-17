import styles from './index.module.scss'
import { NavBar, Form, Input, List, Button, Toast } from 'antd-mobile'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { LoginType } from '@/types/data'
import { useLocation } from 'react-router-dom'
import { getMobileCode, login } from '@/store/actions/login'
import { useEffect, useRef, useState } from 'react'
import { InputRef } from 'antd-mobile/es/components/input'

export default function Login() {
  const history = useHistory()
  const location = useLocation<{ from: string }>()
  const dispatch = useDispatch()
  const onFinish = async (value: LoginType) => {
    // console.log(value)
    try {
      await dispatch(login(value))
      Toast.show({
        icon: 'success',
        content: '登陆成功',
        duration: 300,
        afterClose() {
          const pathname = location?.state?.from || '/home'
          history.replace(pathname)
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
  const [form] = Form.useForm()
  const timerId = useRef<number>(-1)
  const [count, setCount] = useState(0)
  const mobileRef = useRef<InputRef>(null)
  const getCode = async () => {
    if (count > 0) return
    const mobile = form.getFieldValue('mobile')
    const error = form.getFieldError('mobile')
    console.log(mobile, error)

    if (!mobile || error.length > 0) {
      Toast.show('请输入正确的手机号')
      mobileRef.current?.focus()
      return
    }
    await dispatch(getMobileCode(mobile))
    setCount(10)
    timerId.current = window.setInterval(() => {
      setCount((count) => {
        return count - 1
      })
    }, 1000)
  }
  useEffect(() => {
    return () => {
      clearInterval(timerId.current)
    }
  }, [])
  useEffect(() => {
    if (count === 0) {
      clearInterval(timerId.current)
    }
  }, [count])
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      {/* 表单 */}
      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{ mobile: '18586644536', code: '246810' }}
        >
          <Form.Item
            className="login-item"
            name="mobile"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误',
              },
            ]}
          >
            <Input placeholder="请输入用户名" ref={mobileRef}></Input>
          </Form.Item>
          <List.Item
            className="login-code-extra"
            extra={
              <span className="code-extra" onClick={getCode}>
                {count === 0 ? '发送验证码' : count + '秒后重试'}
              </span>
            }
          >
            <Form.Item
              className="login-item"
              name="code"
              rules={[
                {
                  required: true,
                  message: '验证码不能为空',
                },
                {
                  pattern: /^\d{6}$/,
                  message: '验证码格式错误',
                },
              ]}
            >
              <Input placeholder="请输入验证码"></Input>
            </Form.Item>
          </List.Item>
          <Form.Item>
            <Button
              type="submit"
              color="primary"
              block
              className="login-submit"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
