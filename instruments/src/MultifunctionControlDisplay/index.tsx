import './index.scss'
import { render } from '../../common/Hooks'
import { ScratchpadProvider } from './src/hooks/useScratchpad'

const MultifunctionControlDisplay = () => {
  return <ScratchpadProvider>hellos</ScratchpadProvider>
}

render(<MultifunctionControlDisplay />)
