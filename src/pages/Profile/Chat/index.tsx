import Icon from '@/components/Icon'
import { getProfile } from '@/store/actions/profile'
import { useInitState } from '@/utils/hooks'
import { getToken } from '@/utils/tokenSeting'
import { NavBar, Input } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import io, { Socket } from 'socket.io-client'
import styles from './index.module.scss'

const Chat = () => {
  const history = useHistory()
  const [messageList, setMessageList] = useState<
    {
      type: 'robot' | 'user'
      text: string
    }[]
  >([
    { type: 'robot', text: '亲爱的用户您好，小智同学为您服务。' },
    { type: 'user', text: '你好' },
  ])
  const { user } = useInitState(getProfile, 'profile')
  const [message, setMessage] = useState('')
  const clientRef = useRef<Socket | null>(null)
  const listRef = useRef(null)
  useEffect(() => {
    // 建立链接
    const client = io('http://geek.itheima.net', {
      query: {
        token: getToken().token,
      },
      transports: ['websocket'],
    })
    clientRef.current = client
    client.on('connect', () => {
      // 链接成功执行的回调
      setMessageList((messageList) => {
        return [...messageList, { type: 'robot', text: '你好,链接成功!' }]
      })
    })
    client.on('message', (data) => {
      console.log(data)
      setMessageList((messageList) => [
        ...messageList,
        { type: 'robot', text: data.msg },
      ])
    })
    return () => {
      client.close()
    }
  }, [])
  const handleSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      clientRef.current!.emit('message', {
        msg: message,
        timestamp: +new Date(),
      })
      setMessageList((messageList) => [
        ...messageList,
        { type: 'user', text: message },
      ])
    }
  }

  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list">
        {/* 机器人的消息 */}
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            )
          } else {
            return (
              <div className="chat-item user" key={index}>
                <img src={user.photo} alt="" />
                <div className="message">{item.text}</div>
              </div>
            )
          }
        })}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input
          className="no-border"
          value={message}
          onChange={(value) => setMessage(value)}
          onKeyDown={(e) => handleSend(e)}
          placeholder="请描述您的问题"
        />
        <Icon type="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
