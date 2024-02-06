import React from 'react'
import './index.scss'
import { render } from '../../common/Hooks'
import { EFBRouter } from './hooks/OsRouter'
import { DisplayProvider } from './components/OS/DisplayProvider/DisplayProvider'
import { HomeButton } from './components/OS/HomeButton/HomeButton'
import { AppRouter } from './components/apps/appRouter/appRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NavigraphAuthProvider } from './hooks/useNavigraphAuth'

// eslint-disable-next-line react-refresh/only-export-components
const ElectronicFlightBag = (): JSX.Element => {
  return (
    <NavigraphAuthProvider>
      <AppRouter>
        <EFBRouter>
          <div className="ipadContainer">
            <DisplayProvider />
            <ToastContainer
              position="top-left" // this can be top-center in the game, in the browser it will be top-left
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              draggable
              pauseOnHover
              theme="dark"
            />
            <HomeButton />
          </div>
        </EFBRouter>
      </AppRouter>
    </NavigraphAuthProvider>
  )
}
render(<ElectronicFlightBag />)
