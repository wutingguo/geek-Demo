import React from 'react'
import './App.scss'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Edit from '@/pages/Profile/Edit'
function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Redirect exact from="/" to="/login"></Redirect>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Layout}></Route>
          <Route path="/profile/edit" component={Edit}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
