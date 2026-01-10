import { Outlet } from 'react-router-dom'
import Header from '../header/Header'

export default function AdminLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
