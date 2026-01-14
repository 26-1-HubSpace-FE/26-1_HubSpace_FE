import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import './AdminLayout.css'

export default function AdminLayout() {
  return (
    <div className='adminLayout'>
      <Header />
      <Outlet />
    </div>
  )
}
