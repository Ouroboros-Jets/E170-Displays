/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent } from '@microsoft/msfs-sdk'
import { ClockRoot } from './ClockRoot/ClockRoot'
import './index.scss'

const IsAce = Object.prototype.hasOwnProperty.call(window, 'ACE_ENGINE_HANDLE')
const clockId = 'Clock_CONTENT'

class E170_Clock extends BaseInstrument {
  get templateID(): string {
    return 'E170_Clock'
  }

  public connectedCallback(): void {
    super.connectedCallback()

    FSComponent.render(<ClockRoot />, document.getElementById(clockId))

    document.getElementById('PFD_CONTENT')?.querySelector(':scope > h1')?.remove()
  }

  public Update(): void {
    super.Update()
  }
}

if (IsAce) {
  const instrument = new E170_Clock()
  const msfsReactMountDiv = document.getElementById('MSFS_REACT_MOUNT')
  if (msfsReactMountDiv) {
    msfsReactMountDiv.id = clockId
  }

  instrument.connectedCallback()

  document.getElementById('ROOT_ELEMENT')?.addEventListener('update', () => {
    instrument.Update()
  })
} else {
  registerInstrument('clock-element', E170_Clock)
}
