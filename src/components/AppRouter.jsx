import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import LoginPage from '../pages/loginPage/entry/LoginPage'
import DashBoardPage from '../pages/dashBoardPage/entry/dashBoardPage'
import CSVCreatePage from '../pages/CSVCreatePage/entry/CSVCreatePage'
import CSVDetailPage from '../pages/CSVDetailPage/entry/CSVDetailPage'
import FormCreatePage from '../pages/formCreatePage/entry/FormCreatePage'
import FormDetailPage from '../pages/formDetailPage/entry/FormDetailPage'
import UserDetailPage from '../pages/userDetailPage/entry/UserDetailPage'
import UserResultPage from '../pages/userResultPage/entry/UserResultPage'
import NotFoundPage from '../pages/notFoundPage/entry/NotFoundPage'

export const AppRouter = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/search', element: <UserDetailPage /> },
  { path: '/result', element: <UserResultPage /> },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashBoardPage />,
      },
      {
        path: 'newcsv',
        element: <CSVCreatePage />,
      },
      {
        path: 'newform',
        element: <FormCreatePage />,
      },
      {
        path: 'editcsv',
        element: <CSVDetailPage />,
      },
      {
        path: 'editform',
        element: <FormDetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export default AppRouter
