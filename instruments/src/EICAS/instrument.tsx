/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />

import { FSComponent } from '@microsoft/msfs-sdk'
import { EICASRoot } from './EICASRoot/EICASRoot'
import './index.scss'

const IsAce = Object.prototype.hasOwnProperty.call(window, 'ACE_ENGINE_HANDLE')
const EICAS_ID = 'EICAS_CONTENT'

class E170_EICAS extends BaseInstrument {
  get templateID(): string {
    return 'E170_EICAS'
  }

  public connectedCallback(): void {
    super.connectedCallback()

    FSComponent.render(<EICASRoot />, document.getElementById(EICAS_ID))

    !IsAce && document.getElementById(EICAS_ID)?.querySelector(':scope > h1')?.remove()
  }

  public Update(): void {
    super.Update()
  }
}

if (IsAce) {
  const instrument = new E170_EICAS()

  const msfsReactMountDiv = document.getElementById('MSFS_REACT_MOUNT')
  if (msfsReactMountDiv) {
    msfsReactMountDiv.innerHTML = ''
    msfsReactMountDiv.id = EICAS_ID
  }
  instrument.connectedCallback()
  document.getElementById('ROOT_ELEMENT')?.addEventListener('update', () => {
    instrument.Update()
  })
} else {
  registerInstrument('eicas-element', E170_EICAS)
}
