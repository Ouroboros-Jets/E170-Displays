/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent } from '@microsoft/msfs-sdk'
import { ClockRoot } from './ClockRoot/ClockRoot'
import './index.scss'

class E170_Clock extends BaseInstrument {
  get templateID(): string {
    return 'E170_Clock'
  }

  get IsGlassCockpit(): boolean {
    return true
  }

  get IsInteractive(): boolean {
    return false
  }

  public connectedCallback(): void {
    super.connectedCallback()

    FSComponent.render(<ClockRoot />, document.getElementById('Clock_CONTENT'))
  }
}

registerInstrument('clock-element', E170_Clock)
