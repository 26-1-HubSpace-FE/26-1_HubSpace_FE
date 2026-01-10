import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div>
      <div>Header</div>
      <Outlet />
    </div>
  )
}
