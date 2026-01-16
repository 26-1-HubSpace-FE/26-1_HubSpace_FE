import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './components/AppRouter'
import styles from './App.module.css'
import { ToastContainer, Slide } from 'react-toastify'

function App() {
  return (
    <div className={styles.app}>
      <RouterProvider router={AppRouter} />
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme='light'
        transition={Slide}
      />
    </div>
  )
}

export default App
