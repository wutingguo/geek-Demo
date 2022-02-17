import { getToken } from '@/utils/tokenSeting'
import { Redirect, Route, useLocation } from 'react-router-dom'

export default function PrivateRoute({
  children,
  component: Component,
  ...rest
}: any) {
  const location = useLocation()
  return (
    <Route
      {...rest}
      render={() => {
        const token = getToken()
        if (token.token) {
          return children ? children : <Component></Component>
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',

                state: {
                  from: location.pathname,
                },
              }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}
