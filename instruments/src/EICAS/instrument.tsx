/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent } from '@microsoft/msfs-sdk'
import { EICASRoot } from './EICASRoot/EICASRoot'
import './index.scss'

class E170_EICAS extends BaseInstrument {
  get templateID(): string {
    return 'E170_EICAS'
  }

  get IsGlassCockpit(): boolean {
    return true
  }

  get IsInteractive(): boolean {
    return false
  }

  public connectedCallback(): void {
    super.connectedCallback()

    FSComponent.render(<EICASRoot />, document.getElementById('EICAS_CONTENT'))

    document.getElementById('EICAS_CONTENT')?.querySelector(':scope > h1')?.remove()
  }
}

registerInstrument('eicas-element', E170_EICAS)
