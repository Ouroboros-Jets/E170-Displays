/// <reference types="@microsoft/msfs-types/Pages/VCockpit/Core/VCockpit" />
import { FSComponent, EventBus } from '@microsoft/msfs-sdk'
import { PFDRoot } from './PFDRoot/PFDRoot'
import { PFDSimvarPublisher } from './Components/PFDSimVarPublisher'
import './index.css'

const IsAce = Object.prototype.hasOwnProperty.call(window, 'ACE_ENGINE_HANDLE')
const PFD_ID = 'PFD_CONTENT'

class E170_PFD extends BaseInstrument {
  private readonly bus: EventBus

  private readonly simVarPublisher: PFDSimvarPublisher

  /**
   * "mainmenu" = 0
   * "loading" = 1
   * "briefing" = 2
   * "ingame" = 3
   */
  private gameState = 0

  constructor() {
    super()
    this.bus = new EventBus()
    this.simVarPublisher = new PFDSimvarPublisher(this.bus)
  }

  get templateID(): string {
    return 'E170_PFD'
  }

  public connectedCallback(): void {
    super.connectedCallback()

    this.simVarPublisher.startPublish()

    FSComponent.render(<PFDRoot bus={this.bus} />, document.getElementById(PFD_ID))

    !IsAce && document.getElementById(PFD_ID)?.querySelector(':scope > h1')?.remove()
  }

  public Update(): void {
    super.Update()
    this.simVarPublisher.onUpdate()
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
