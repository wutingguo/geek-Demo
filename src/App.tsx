import React from 'react'
import './App.scss'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Layout from './pages/Layout'
import Edit from '@/pages/Profile/Edit'
import PrivateRoute from './components/PrivateRoute'
import history from './utils/history'
function App() {
  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          <Redirect exact from="/" to="/login"></Redirect>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Layout}></Route>
          <PrivateRoute path="/profile/edit" component={Edit}></PrivateRoute>
        </Switch>
      </div>
    </Router>
  )
}

export default App
