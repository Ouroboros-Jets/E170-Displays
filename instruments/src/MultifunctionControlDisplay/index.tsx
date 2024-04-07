import './index.scss'
import { render } from '../../common/Hooks'
import { ScratchpadProvider } from './src/hooks/useScratchpad'
import { App } from './src/app'

const MultifunctionControlDisplay = () => {
  return (
    <ScratchpadProvider>
      <App />
    </ScratchpadProvider>
  )
}

render(<MultifunctionControlDisplay />)
