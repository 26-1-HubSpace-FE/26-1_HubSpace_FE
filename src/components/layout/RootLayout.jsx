import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div>
      <div>Header</div>
      <Outlet />
    </div>
  )
}
