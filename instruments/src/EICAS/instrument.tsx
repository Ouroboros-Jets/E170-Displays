/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent, DisplayComponent, type VNode } from '@microsoft/msfs-sdk'

import './index.scss'

class EICASRoot extends DisplayComponent<any> {
  public render(): VNode {
    return (
      <div>
        <div>Primary Flight Display</div>
        <div>Attitude Indicator</div>
        <div>Heading Indicator</div>
        <div>Altimeter</div>
      </div>
    )
  }
}

class EICAS extends BaseInstrument {
  get templateID(): string {
    return 'EICAS'
  }

  get IsGlassCockpit(): boolean {
    return true
  }

  get IsInteractive(): boolean {
    return false
  }

  public connectedCallback(): void {
    super.connectedCallback()

    FSComponent.render(<EICASRoot />, document.getElementById('EICAS-Root'))
  }
}

registerInstrument('eicas-element', EICAS)
