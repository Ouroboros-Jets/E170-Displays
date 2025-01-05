/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent } from '@microsoft/msfs-sdk'
import { IESRoot } from './IESRoot/IESRoot'
import './index.scss'

const IsAce = Object.prototype.hasOwnProperty.call(window, 'ACE_ENGINE_HANDLE')
const IES_ID = 'IES_CONTENT'

class E170_IES extends BaseInstrument {
  get templateID(): string {
    return 'E170_IES'
  }

  get IsGlassCockpit(): boolean {
    return true
  }

  get IsInteractive(): boolean {
    return false
  }

  public connectedCallback(): void {
    super.connectedCallback()

    FSComponent.render(<IESRoot />, document.getElementById(IES_ID))

    !IsAce && document.getElementById(IES_ID)?.querySelector(':scope > h1')?.remove()
  }

  public Update(): void {
    super.Update()
  }
}

if (IsAce) {
  const instrument = new E170_IES()

  const msfsReactMountDiv = document.getElementById('MSFS_REACT_MOUNT')
  if (msfsReactMountDiv) {
    msfsReactMountDiv.id = IES_ID
  }
  instrument.connectedCallback()
  document.getElementById('ROOT_ELEMENT')?.addEventListener('update', () => {
    instrument.Update()
  })
} else {
  registerInstrument('ies-element', E170_IES)
}
