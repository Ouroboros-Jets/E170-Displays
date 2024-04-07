import { useInteractionSimVar } from 'instruments/common/Hooks/simVars'
import { IndexLayout, IndexLayoutTitle } from './layouts/index/index.layout'
import { Arrow } from './components/symbol'

export function App() {
  return (
    <div id="root">
      <IndexLayout>
        <IndexLayoutTitle>PERF&ensp;INDEX</IndexLayoutTitle>
        <div className="font-symbols">
          <Arrow left variant="bold" />
        </div>
      </IndexLayout>
    </div>
  )
}
