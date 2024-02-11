/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent } from '@microsoft/msfs-sdk'
import { PFDRoot } from './PFDRoot/PFDRoot'
import './index.scss'

const IsAce = Object.prototype.hasOwnProperty.call(window, 'ACE_ENGINE_HANDLE')
const PFD_ID = 'PFD_CONTENT'

class E170_PFD extends BaseInstrument {
  get templateID(): string {
    return 'E170_PFD'
  }

  public connectedCallback(): void {
    super.connectedCallback()

    FSComponent.render(<PFDRoot />, document.getElementById(PFD_ID))

    !IsAce && document.getElementById(PFD_ID)?.querySelector(':scope > h1')?.remove()
  }

  public Update(): void {
    super.Update()
  }
}

if (IsAce) {
  const instrument = new E170_PFD()

  const msfsReactMountDiv = document.getElementById('MSFS_REACT_MOUNT')
  if (msfsReactMountDiv) {
    msfsReactMountDiv.id = PFD_ID
  }
  instrument.connectedCallback()
  document.getElementById('ROOT_ELEMENT')?.addEventListener('update', () => {
    instrument.Update()
  })
} else {
  registerInstrument('pfd-element', E170_PFD)
}
