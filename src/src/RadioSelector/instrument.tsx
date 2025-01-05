/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent } from '@microsoft/msfs-sdk'
import { RadioSelectorRoot } from './RadioSelectorRoot/RadioSelectorRoot'
import './index.scss'

const IsAce = Object.prototype.hasOwnProperty.call(window, 'ACE_ENGINE_HANDLE')
const RADIO_SELECTOR_ID = 'RadioSelector-Root'

class RadioSelector extends BaseInstrument {
  get templateID(): string {
    return 'RadioSelector'
  }

  public connectedCallback(): void {
    super.connectedCallback()

    FSComponent.render(<RadioSelectorRoot />, document.getElementById(RADIO_SELECTOR_ID))

    !IsAce && document.getElementById(RADIO_SELECTOR_ID)?.querySelector(':scope > h1')?.remove()
  }

  public Update(): void {
    super.Update()
  }
}

if (IsAce) {
  const instrument = new RadioSelector()

  const msfsReactMountDiv = document.getElementById('MSFS_REACT_MOUNT')
  if (msfsReactMountDiv) {
    msfsReactMountDiv.id = RADIO_SELECTOR_ID
  }
  instrument.connectedCallback()
  document.getElementById('ROOT_ELEMENT')?.addEventListener('update', () => {
    instrument.Update()
  })
} else {
  registerInstrument('radioSelector-element', RadioSelector)
}
