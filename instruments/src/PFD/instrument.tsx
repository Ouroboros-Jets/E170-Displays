/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent } from '@microsoft/msfs-sdk'
import { PFDRoot } from './PFDRoot/PFDRoot'
import './index.scss'

class E170_PFD extends BaseInstrument {
  get templateID(): string {
    return 'E170_PFD'
  }

  public connectedCallback(): void {
    super.connectedCallback()

    FSComponent.render(<PFDRoot />, document.getElementById('PFD_CONTENT'))

    document.getElementById('PFD_CONTENT')?.querySelector(':scope > h1')?.remove()
  }
}

registerInstrument('pfd-element', E170_PFD)
