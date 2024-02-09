/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent } from '@microsoft/msfs-sdk'
import { IESRoot } from './IESRoot/IESRoot'

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

    FSComponent.render(<IESRoot />, document.getElementById('IES_CONTENT'))
  }
}

registerInstrument('ies-element', E170_IES)
