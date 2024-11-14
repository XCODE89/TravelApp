
import { Navigate } from 'react-router-dom'
import { AppPath } from './enums/app_path'
import { Booking, Home, SignIn, SignUp, Trip } from './pages/pages'
import { RouterProvider } from './router/routerProvider'
import PrivateRoute from './components/Private/PrivateRoute'


const App = (): JSX.Element => {
  return (
    <RouterProvider routes={[
      {
        path: AppPath.HOME,
        children: [
          {
            path: AppPath.HOME,
            element: <PrivateRoute/>,
            children: [
              {
                path: AppPath.HOME,
                element: <Home/>
              },
              {
                path: AppPath.TRIP,
                element: <Trip/>
              },
              {
                path: AppPath.BOOKING,
                element: <Booking/>
              },
              {
                path: AppPath.ANY,
                element: <Navigate to={AppPath.HOME} />
              },
            ]
          },
          {
            path: AppPath.SIGNIN,
            element: <SignIn/>
          },
          {
            path: AppPath.SIGNUP,
            element: <SignUp/>
          },
          {
            path: AppPath.ANY,
            element: <Navigate to={AppPath.SIGNIN} />,
          },
          
        ]
      }
      
    ]}/>
  )
}

export default App
