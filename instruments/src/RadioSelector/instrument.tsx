/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent, DisplayComponent, type VNode } from '@microsoft/msfs-sdk'
import './index.scss'

class RadioSelectorRoot extends DisplayComponent<any> {
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

class RadioSelector extends BaseInstrument {
  get templateID(): string {
    return 'RadioSelector'
  }

  get IsGlassCockpit(): boolean {
    return true
  }

  get IsInteractive(): boolean {
    return false
  }

  public connectedCallback(): void {
    super.connectedCallback()

    FSComponent.render(<RadioSelectorRoot />, document.getElementById('RadioSelector-Root'))
  }
}

registerInstrument('radioSelector-element', RadioSelector)
