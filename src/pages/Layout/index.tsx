import styles from './index.module.scss'
import { TabBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import { useHistory, useLocation, Switch, Route } from 'react-router-dom'
import Home from '../Home'
import Question from '../Question'
import Profile from '../Profile'
import Video from '../Video'
import PrivateRoute from '@/components/PrivateRoute'

const tabs = [
  {
    key: '/home',
    title: '首页',
    icon: 'iconbtn_home',
  },
  {
    key: '/home/question',
    title: '问答',
    icon: 'iconbtn_qa',
  },
  {
    key: '/home/video',
    title: '视频',
    icon: 'iconbtn_video',
  },
  {
    key: '/home/profile',
    title: '个人中心',
    icon: 'iconbtn_mine',
  },
]
const Layout = () => {
  const { pathname } = useLocation()
  const history = useHistory()
  const setRouteActive = (value: string) => {
    history.push(value)
  }
  return (
    <div className={styles.root}>
      {/* 使用 antd 的 TabBar 组件，并指定类名 tab-bar */}
      <Switch>
        <Route exact path="/home" component={Home}></Route>
        <PrivateRoute path="/home/profile" component={Profile}></PrivateRoute>
        <Route path="/home/question" component={Question}></Route>
        <Route path="/home/video" component={Video}></Route>
      </Switch>
      <TabBar
        className="tab-bar"
        activeKey={pathname}
        onChange={(value) => setRouteActive(value)}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.key}
            icon={(active) =>
              active ? (
                <Icon type={item.icon + '_sel'} />
              ) : (
                <Icon type={item.icon} />
              )
            }
            title={item.title}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
